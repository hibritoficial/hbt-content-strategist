-- Migração para Sistema Cockpit: Modo Cliente vs Modo Hibrit
-- Execute no Supabase SQL Editor

-- 1. Adicionar campos de role e org na tabela auth.users (via raw_user_meta_data)
-- Não podemos alterar auth.users diretamente, usaremos raw_user_meta_data

-- 2. Migrar dados de brands para workspaces (se necessário)
-- Verificar se há brands sem workspace correspondente
INSERT INTO workspaces (name, slug, brand_settings)
SELECT 
    b.name,
    b.slug,
    '{}'::jsonb
FROM brands b
WHERE NOT EXISTS (
    SELECT 1 FROM workspaces w WHERE w.slug = b.slug
);

-- 3. Migrar brand_members para workspace_members
INSERT INTO workspace_members (workspace_id, user_id, role)
SELECT 
    w.id as workspace_id,
    bm.user_id,
    CASE 
        WHEN bm.role = 'owner' THEN 'owner'
        WHEN bm.role = 'admin' THEN 'manager'
        ELSE 'editor'
    END as role
FROM brand_members bm
JOIN brands b ON bm.brand_id = b.id
JOIN workspaces w ON w.slug = b.slug
WHERE NOT EXISTS (
    SELECT 1 FROM workspace_members wm 
    WHERE wm.workspace_id = w.id AND wm.user_id = bm.user_id
);

-- 4. Atualizar content_items para usar workspace_id
UPDATE content_items 
SET workspace_id = w.id
FROM brands b
JOIN workspaces w ON w.slug = b.slug
WHERE content_items.brand_id = b.id 
AND content_items.workspace_id IS NULL;

-- 5. Atualizar funnels para usar workspace_id
UPDATE funnels 
SET workspace_id = w.id
FROM brands b
JOIN workspaces w ON w.slug = b.slug
WHERE funnels.brand_id = b.id 
AND funnels.workspace_id IS NULL;

-- 6. Criar views para Portfolio (Modo Hibrit)
CREATE OR REPLACE VIEW portfolio_cockpit AS
SELECT 
    w.id as workspace_id,
    w.name as client_name,
    w.slug as client_slug,
    
    -- Saúde do Funil
    COUNT(DISTINCT f.id) as total_funnels,
    COUNT(DISTINCT CASE WHEN f.is_active THEN f.id END) as active_funnels,
    
    -- Produção de Conteúdo
    COUNT(DISTINCT ci.id) as total_content_items,
    COUNT(DISTINCT CASE WHEN ci.status = 'backlog' THEN ci.id END) as backlog_count,
    COUNT(DISTINCT CASE WHEN ci.status = 'brief' THEN ci.id END) as brief_count,
    COUNT(DISTINCT CASE WHEN ci.status = 'copy' THEN ci.id END) as copy_count,
    COUNT(DISTINCT CASE WHEN ci.status = 'design' THEN ci.id END) as design_count,
    COUNT(DISTINCT CASE WHEN ci.status = 'ready' THEN ci.id END) as ready_count,
    COUNT(DISTINCT CASE WHEN ci.status = 'scheduled' THEN ci.id END) as scheduled_count,
    COUNT(DISTINCT CASE WHEN ci.status = 'published' THEN ci.id END) as published_count,
    
    -- Próximos 7 dias
    COUNT(DISTINCT CASE 
        WHEN ci.scheduled_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days' 
        THEN ci.id 
    END) as next_7_days_count,
    
    -- CTAs & Conversas
    COUNT(DISTINCT ck.id) as total_ctas,
    
    -- Última atualização
    MAX(GREATEST(
        COALESCE(ci.updated_at, '1970-01-01'::timestamptz),
        COALESCE(f.updated_at, '1970-01-01'::timestamptz)
    )) as last_activity
    
FROM workspaces w
LEFT JOIN content_items ci ON ci.workspace_id = w.id
LEFT JOIN funnels f ON f.workspace_id = w.id
LEFT JOIN cta_keywords ck ON ck.id = ci.cta_keyword_id
GROUP BY w.id, w.name, w.slug
ORDER BY last_activity DESC;

-- 7. Criar view para alertas do Portfolio
CREATE OR REPLACE VIEW portfolio_alerts AS
SELECT 
    w.id as workspace_id,
    w.name as client_name,
    'funnel' as alert_type,
    CASE 
        WHEN COUNT(DISTINCT CASE WHEN f.is_active THEN f.id END) = 0 THEN 'red'
        WHEN COUNT(DISTINCT f.id) > 5 THEN 'yellow'
        ELSE 'green'
    END as severity,
    CASE 
        WHEN COUNT(DISTINCT CASE WHEN f.is_active THEN f.id END) = 0 THEN 'Nenhum funil ativo'
        WHEN COUNT(DISTINCT f.id) > 5 THEN 'Muitos funis criados'
        ELSE 'Funis OK'
    END as message,
    '/funnels' as action_url
FROM workspaces w
LEFT JOIN funnels f ON f.workspace_id = w.id
GROUP BY w.id, w.name

UNION ALL

SELECT 
    w.id as workspace_id,
    w.name as client_name,
    'content' as alert_type,
    CASE 
        WHEN COUNT(DISTINCT CASE WHEN ci.status = 'copy' THEN ci.id END) > 3 THEN 'red'
        WHEN COUNT(DISTINCT CASE WHEN ci.status = 'copy' THEN ci.id END) > 1 THEN 'yellow'
        ELSE 'green'
    END as severity,
    CASE 
        WHEN COUNT(DISTINCT CASE WHEN ci.status = 'copy' THEN ci.id END) > 3 THEN 'Gargalo na produção de copy'
        WHEN COUNT(DISTINCT CASE WHEN ci.status = 'copy' THEN ci.id END) > 1 THEN 'Atenção na produção'
        ELSE 'Produção OK'
    END as message,
    '/pipeline' as action_url
FROM workspaces w
LEFT JOIN content_items ci ON ci.workspace_id = w.id
GROUP BY w.id, w.name

UNION ALL

SELECT 
    w.id as workspace_id,
    w.name as client_name,
    'cta' as alert_type,
    CASE 
        WHEN COUNT(DISTINCT CASE WHEN ci.cta_text IS NOT NULL AND ci.cta_keyword_id IS NULL THEN ci.id END) > 0 THEN 'red'
        ELSE 'green'
    END as severity,
    CASE 
        WHEN COUNT(DISTINCT CASE WHEN ci.cta_text IS NOT NULL AND ci.cta_keyword_id IS NULL THEN ci.id END) > 0 THEN 'CTAs sem automação'
        ELSE 'CTAs OK'
    END as message,
    '/library' as action_url
FROM workspaces w
LEFT JOIN content_items ci ON ci.workspace_id = w.id
GROUP BY w.id, w.name;

-- 8. Criar view para métricas do Portfolio
CREATE OR REPLACE VIEW portfolio_metrics AS
SELECT 
    w.id as workspace_id,
    w.name as client_name,
    
    -- KPIs de Produção (últimos 30 dias)
    COUNT(DISTINCT CASE 
        WHEN ci.updated_at >= CURRENT_DATE - INTERVAL '30 days' 
        AND ci.status = 'published' 
        THEN ci.id 
    END) as published_last_30d,
    
    COUNT(DISTINCT CASE 
        WHEN ci.updated_at >= CURRENT_DATE - INTERVAL '7 days' 
        AND ci.status = 'published' 
        THEN ci.id 
    END) as published_last_7d,
    
    -- Taxa de conversão do pipeline (%)
    CASE 
        WHEN COUNT(DISTINCT ci.id) > 0 THEN
            ROUND(
                ((COUNT(DISTINCT CASE WHEN ci.status = 'published' THEN ci.id END)::float / 
                 COUNT(DISTINCT ci.id)::float) * 100)::numeric, 
                1
            )
        ELSE 0
    END as pipeline_conversion_rate,
    
    -- Tempo médio no pipeline (estimativa em dias)
    CASE 
        WHEN COUNT(DISTINCT CASE WHEN ci.status = 'published' THEN ci.id END) > 0 THEN
            ROUND(
                (EXTRACT(EPOCH FROM (
                    AVG(CASE WHEN ci.status = 'published' THEN ci.updated_at - ci.created_at END)
                )) / 86400)::numeric, -- converter para dias
                1
            )
        ELSE NULL
    END as avg_pipeline_days,
    
    -- Distribuição por canal
    COUNT(DISTINCT CASE WHEN ci.channel = 'instagram' THEN ci.id END) as instagram_count,
    COUNT(DISTINCT CASE WHEN ci.channel = 'youtube' THEN ci.id END) as youtube_count,
    COUNT(DISTINCT CASE WHEN ci.channel = 'blog' THEN ci.id END) as blog_count,
    
    -- Score de saúde (0-100)
    CASE 
        WHEN COUNT(DISTINCT ci.id) = 0 THEN 0
        ELSE LEAST(100, GREATEST(0,
            -- Base: 40 pontos por ter conteúdo
            40 +
            -- 30 pontos por taxa de conversão
            (CASE 
                WHEN COUNT(DISTINCT ci.id) > 0 THEN
                    (COUNT(DISTINCT CASE WHEN ci.status = 'published' THEN ci.id END)::float / 
                     COUNT(DISTINCT ci.id)::float) * 30
                ELSE 0
            END) +
            -- 20 pontos por atividade recente
            (CASE 
                WHEN COUNT(DISTINCT CASE 
                    WHEN ci.updated_at >= CURRENT_DATE - INTERVAL '7 days' 
                    THEN ci.id 
                END) > 0 THEN 20
                ELSE 0
            END) +
            -- 10 pontos por diversidade de canais
            (CASE 
                WHEN COUNT(DISTINCT ci.channel) >= 2 THEN 10
                WHEN COUNT(DISTINCT ci.channel) = 1 THEN 5
                ELSE 0
            END)
        ))
    END as health_score
    
FROM workspaces w
LEFT JOIN content_items ci ON ci.workspace_id = w.id
LEFT JOIN funnels f ON f.workspace_id = w.id
GROUP BY w.id, w.name
ORDER BY health_score DESC;

-- 9. Função para determinar role do usuário
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
BEGIN
    -- Verificar se é staff da Hibrit via raw_user_meta_data
    IF EXISTS (
        SELECT 1 FROM auth.users 
        WHERE id = user_uuid 
        AND (raw_user_meta_data->>'org' = 'hibrit' OR raw_user_meta_data->>'role' = 'hibrit_staff')
    ) THEN
        RETURN 'hibrit_staff';
    ELSE
        RETURN 'client_user';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Função para obter workspaces do usuário baseado no role
CREATE OR REPLACE FUNCTION get_user_workspaces(user_uuid UUID)
RETURNS TABLE(
    workspace_id UUID,
    workspace_name TEXT,
    workspace_slug TEXT,
    user_role TEXT,
    is_hibrit_staff BOOLEAN
) AS $$
DECLARE
    user_role_type TEXT;
BEGIN
    user_role_type := get_user_role(user_uuid);
    
    IF user_role_type = 'hibrit_staff' THEN
        -- Staff da Hibrit vê todos os workspaces
        RETURN QUERY
        SELECT 
            w.id,
            w.name::TEXT,
            w.slug::TEXT,
            'hibrit_staff'::TEXT,
            TRUE
        FROM workspaces w
        ORDER BY w.name;
    ELSE
        -- Cliente vê apenas seus workspaces
        RETURN QUERY
        SELECT 
            w.id,
            w.name::TEXT,
            w.slug::TEXT,
            wm.role::TEXT,
            FALSE
        FROM workspaces w
        JOIN workspace_members wm ON wm.workspace_id = w.id
        WHERE wm.user_id = user_uuid
        ORDER BY w.name;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Atualizar RLS policies
DROP POLICY IF EXISTS "Users can view workspaces" ON workspaces;
DROP POLICY IF EXISTS "Users can update workspaces" ON workspaces;

CREATE POLICY "Hibrit staff can view all workspaces" ON workspaces
    FOR SELECT USING (
        get_user_role(auth.uid()) = 'hibrit_staff'
    );

CREATE POLICY "Clients can view their workspaces" ON workspaces
    FOR SELECT USING (
        get_user_role(auth.uid()) = 'client_user' AND
        EXISTS (
            SELECT 1 FROM workspace_members wm 
            WHERE wm.workspace_id = id AND wm.user_id = auth.uid()
        )
    );

-- 12. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_content_items_workspace_status ON content_items(workspace_id, status);
CREATE INDEX IF NOT EXISTS idx_content_items_scheduled_date ON content_items(scheduled_date) WHERE scheduled_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_funnels_workspace_active ON funnels(workspace_id, is_active);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_workspace ON workspace_members(user_id, workspace_id);EN
        -- Staff da Hibrit vê todos os workspaces
        RETURN QUERY
        SELECT 
            w.id,
            w.name::TEXT,
            w.slug::TEXT,
            'hibrit_staff'::TEXT,
            TRUE
        FROM workspaces w
        ORDER BY w.name;
    ELSE
        -- Cliente vê apenas seus workspaces
        RETURN QUERY
        SELECT 
            w.id,
            w.name::TEXT,
            w.slug::TEXT,
            wm.role::TEXT,
            FALSE
        FROM workspaces w
        JOIN workspace_members wm ON wm.workspace_id = w.id
        WHERE wm.user_id = user_uuid
        ORDER BY w.name;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Atualizar RLS policies para suportar o novo sistema
-- Remover policies antigas problemáticas
DROP POLICY IF EXISTS "Users can view workspaces" ON workspaces;
DROP POLICY IF EXISTS "Users can update workspaces" ON workspaces;

-- Criar policies baseadas no novo sistema de roles
CREATE POLICY "Hibrit staff can view all workspaces" ON workspaces
    FOR SELECT USING (
        get_user_role(auth.uid()) = 'hibrit_staff'
    );

CREATE POLICY "Clients can view their workspaces" ON workspaces
    FOR SELECT USING (
        get_user_role(auth.uid()) = 'client_user' AND
        EXISTS (
            SELECT 1 FROM workspace_members wm 
            WHERE wm.workspace_id = id AND wm.user_id = auth.uid()
        )
    );

-- 12. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_content_items_workspace_status ON content_items(workspace_id, status);
CREATE INDEX IF NOT EXISTS idx_content_items_scheduled_date ON content_items(scheduled_date) WHERE scheduled_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_funnels_workspace_active ON funnels(workspace_id, is_active);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_workspace ON workspace_members(user_id, workspace_id);

-- 13. Comentários para documentação
COMMENT ON VIEW portfolio_cockpit IS 'Visão executiva agregada para o modo Portfólio da Hibrit';
COMMENT ON VIEW portfolio_alerts IS 'Alertas por cliente com severidade e links para ação';
COMMENT ON VIEW portfolio_metrics IS 'KPIs normalizados para comparação entre clientes';
COMMENT ON FUNCTION get_user_role(UUID) IS 'Determina se usuário é hibrit_staff ou client_user';
COMMENT ON FUNCTION get_user_workspaces(UUID) IS 'Retorna workspaces baseado no role do usuário'; Hibrit vê todos os workspaces
        RETURN QUERY
        SELECT 
            w.id,
            w.name::TEXT,
            w.slug::TEXT,
            'hibrit_staff'::TEXT,
            TRUE
        FROM workspaces w
        ORDER BY w.name;
    ELSE
        -- Cliente vê apenas seus workspaces
        RETURN QUERY
        SELECT 
            w.id,
            w.name::TEXT,
            w.slug::TEXT,
            wm.role::TEXT,
            FALSE
        FROM workspaces w
        JOIN workspace_members wm ON wm.workspace_id = w.id
        WHERE wm.user_id = user_uuid
        ORDER BY w.name;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Atualizar RLS policies para suportar o novo sistema
-- Remover policies antigas problemáticas
DROP POLICY IF EXISTS "Users can view workspaces" ON workspaces;
DROP POLICY IF EXISTS "Users can update workspaces" ON workspaces;

-- Criar policies baseadas no novo sistema de roles
CREATE POLICY "Hibrit staff can view all workspaces" ON workspaces
    FOR SELECT USING (
        get_user_role(auth.uid()) = 'hibrit_staff'
    );

CREATE POLICY "Clients can view their workspaces" ON workspaces
    FOR SELECT USING (
        get_user_role(auth.uid()) = 'client_user' AND
        EXISTS (
            SELECT 1 FROM workspace_members wm 
            WHERE wm.workspace_id = id AND wm.user_id = auth.uid()
        )
    );

-- 12. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_content_items_workspace_status ON content_items(workspace_id, status);
CREATE INDEX IF NOT EXISTS idx_content_items_scheduled_date ON content_items(scheduled_date) WHERE scheduled_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_funnels_workspace_active ON funnels(workspace_id, is_active);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_workspace ON workspace_members(user_id, workspace_id);

-- 13. Comentários para documentação
COMMENT ON VIEW portfolio_cockpit IS 'Visão executiva agregada para o modo Portfólio da Hibrit';
COMMENT ON VIEW portfolio_alerts IS 'Alertas por cliente com severidade e links para ação';
COMMENT ON VIEW portfolio_metrics IS 'KPIs normalizados para comparação entre clientes';
COMMENT ON FUNCTION get_user_role(UUID) IS 'Determina se usuário é hibrit_staff ou client_user';
COMMENT ON FUNCTION get_user_workspaces(UUID) IS 'Retorna workspaces baseado no role do usuário';