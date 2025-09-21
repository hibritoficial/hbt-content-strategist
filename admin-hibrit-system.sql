-- Sistema de Administração Hibrit
-- Execute no Supabase SQL Editor

-- 1. View para gerenciar usuários e workspaces
CREATE OR REPLACE VIEW admin_users_overview AS
SELECT 
    u.id as user_id,
    u.email,
    u.created_at as user_created_at,
    u.last_sign_in_at,
    u.raw_user_meta_data->>'org' as org,
    u.raw_user_meta_data->>'role' as user_role,
    
    -- Workspaces do usuário
    array_agg(DISTINCT w.name) FILTER (WHERE w.id IS NOT NULL) as workspaces,
    array_agg(DISTINCT wm.role) FILTER (WHERE wm.role IS NOT NULL) as workspace_roles,
    
    -- Estatísticas
    COUNT(DISTINCT wm.workspace_id) as total_workspaces,
    COUNT(DISTINCT CASE WHEN wm.role = 'owner' THEN wm.workspace_id END) as owned_workspaces,
    
    -- Status
    CASE 
        WHEN u.raw_user_meta_data->>'org' = 'hibrit' THEN 'hibrit_staff'
        WHEN COUNT(DISTINCT wm.workspace_id) > 0 THEN 'client_user'
        ELSE 'no_access'
    END as access_level
    
FROM auth.users u
LEFT JOIN workspace_members wm ON wm.user_id = u.id
LEFT JOIN workspaces w ON w.id = wm.workspace_id
GROUP BY u.id, u.email, u.created_at, u.last_sign_in_at, u.raw_user_meta_data
ORDER BY u.created_at DESC;

-- 2. View para gerenciar workspaces
CREATE OR REPLACE VIEW admin_workspaces_overview AS
SELECT 
    w.id as workspace_id,
    w.name as workspace_name,
    w.slug as workspace_slug,
    w.created_at as workspace_created_at,
    w.updated_at as workspace_updated_at,
    
    -- Membros
    COUNT(DISTINCT wm.user_id) as total_members,
    COUNT(DISTINCT CASE WHEN wm.role = 'owner' THEN wm.user_id END) as owners_count,
    COUNT(DISTINCT CASE WHEN wm.role = 'manager' THEN wm.user_id END) as managers_count,
    COUNT(DISTINCT CASE WHEN wm.role = 'editor' THEN wm.user_id END) as editors_count,
    
    -- Atividade
    COUNT(DISTINCT ci.id) as total_content_items,
    COUNT(DISTINCT f.id) as total_funnels,
    MAX(GREATEST(
        COALESCE(ci.updated_at, '1970-01-01'::timestamptz),
        COALESCE(f.updated_at, '1970-01-01'::timestamptz)
    )) as last_activity,
    
    -- Status
    CASE 
        WHEN COUNT(DISTINCT wm.user_id) = 0 THEN 'no_members'
        WHEN MAX(GREATEST(
            COALESCE(ci.updated_at, '1970-01-01'::timestamptz),
            COALESCE(f.updated_at, '1970-01-01'::timestamptz)
        )) < CURRENT_DATE - INTERVAL '30 days' THEN 'inactive'
        ELSE 'active'
    END as status
    
FROM workspaces w
LEFT JOIN workspace_members wm ON wm.workspace_id = w.id
LEFT JOIN content_items ci ON ci.workspace_id = w.id
LEFT JOIN funnels f ON f.workspace_id = w.id
GROUP BY w.id, w.name, w.slug, w.created_at, w.updated_at
ORDER BY w.created_at DESC;

-- 3. Função para criar workspace e adicionar usuário
CREATE OR REPLACE FUNCTION admin_create_workspace_for_user(
    user_email TEXT,
    workspace_name TEXT,
    workspace_slug TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    target_user_id UUID;
    new_workspace_id UUID;
    generated_slug TEXT;
BEGIN
    -- Buscar usuário por email
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Usuário não encontrado');
    END IF;
    
    -- Gerar slug se não fornecido
    IF workspace_slug IS NULL THEN
        generated_slug := lower(replace(workspace_name, ' ', '-')) || '-' || substr(gen_random_uuid()::text, 1, 8);
    ELSE
        generated_slug := workspace_slug;
    END IF;
    
    -- Verificar se slug já existe
    IF EXISTS (SELECT 1 FROM workspaces WHERE slug = generated_slug) THEN
        RETURN json_build_object('success', false, 'error', 'Slug já existe');
    END IF;
    
    -- Criar workspace
    INSERT INTO workspaces (name, slug, brand_settings)
    VALUES (workspace_name, generated_slug, '{}')
    RETURNING id INTO new_workspace_id;
    
    -- Adicionar usuário como owner
    INSERT INTO workspace_members (workspace_id, user_id, role)
    VALUES (new_workspace_id, target_user_id, 'owner');
    
    RETURN json_build_object(
        'success', true, 
        'workspace_id', new_workspace_id,
        'workspace_slug', generated_slug,
        'user_id', target_user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Função para adicionar usuário a workspace existente
CREATE OR REPLACE FUNCTION admin_add_user_to_workspace(
    user_email TEXT,
    workspace_slug TEXT,
    user_role TEXT DEFAULT 'editor'
)
RETURNS JSON AS $$
DECLARE
    target_user_id UUID;
    target_workspace_id UUID;
BEGIN
    -- Buscar usuário
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Usuário não encontrado');
    END IF;
    
    -- Buscar workspace
    SELECT id INTO target_workspace_id 
    FROM workspaces 
    WHERE slug = workspace_slug;
    
    IF target_workspace_id IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Workspace não encontrado');
    END IF;
    
    -- Verificar se já é membro
    IF EXISTS (
        SELECT 1 FROM workspace_members 
        WHERE workspace_id = target_workspace_id AND user_id = target_user_id
    ) THEN
        RETURN json_build_object('success', false, 'error', 'Usuário já é membro deste workspace');
    END IF;
    
    -- Adicionar como membro
    INSERT INTO workspace_members (workspace_id, user_id, role)
    VALUES (target_workspace_id, target_user_id, user_role);
    
    RETURN json_build_object(
        'success', true,
        'workspace_id', target_workspace_id,
        'user_id', target_user_id,
        'role', user_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Função para promover usuário a Hibrit Staff
CREATE OR REPLACE FUNCTION admin_set_hibrit_staff(user_email TEXT)
RETURNS JSON AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Buscar usuário
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Usuário não encontrado');
    END IF;
    
    -- Atualizar metadata
    UPDATE auth.users 
    SET raw_user_meta_data = jsonb_set(
        COALESCE(raw_user_meta_data, '{}'), 
        '{org}', 
        '"hibrit"'
    )
    WHERE id = target_user_id;
    
    RETURN json_build_object('success', true, 'user_id', target_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Função para remover usuário de workspace
CREATE OR REPLACE FUNCTION admin_remove_user_from_workspace(
    user_email TEXT,
    workspace_slug TEXT
)
RETURNS JSON AS $$
DECLARE
    target_user_id UUID;
    target_workspace_id UUID;
BEGIN
    -- Buscar usuário
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    -- Buscar workspace
    SELECT id INTO target_workspace_id 
    FROM workspaces 
    WHERE slug = workspace_slug;
    
    IF target_user_id IS NULL OR target_workspace_id IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Usuário ou workspace não encontrado');
    END IF;
    
    -- Remover membro
    DELETE FROM workspace_members 
    WHERE workspace_id = target_workspace_id AND user_id = target_user_id;
    
    RETURN json_build_object('success', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. RLS para views administrativas (apenas Hibrit Staff)
ALTER TABLE admin_users_overview ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_workspaces_overview ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only Hibrit staff can view admin users" ON admin_users_overview
    FOR SELECT USING (get_user_role(auth.uid()) = 'hibrit_staff');

CREATE POLICY "Only Hibrit staff can view admin workspaces" ON admin_workspaces_overview
    FOR SELECT USING (get_user_role(auth.uid()) = 'hibrit_staff');