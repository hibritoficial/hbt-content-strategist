-- Sistema de Tarefas Internas Hibrit
-- Execute no Supabase SQL Editor

-- 1. Tabela de categorias de serviço
CREATE TABLE IF NOT EXISTS service_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#1976D2',
    icon TEXT DEFAULT 'mdi-folder',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    service_category_id UUID REFERENCES service_categories(id),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done', 'blocked')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assigned_to UUID REFERENCES auth.users(id),
    created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
    start_date DATE,
    due_date DATE,
    estimated_hours INTEGER,
    actual_hours INTEGER,
    tags TEXT[],
    dependencies UUID[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Inserir categorias padrão
INSERT INTO service_categories (name, description, color, icon) VALUES
('Estratégia', 'Planejamento estratégico e consultoria', '#9C27B0', 'mdi-strategy'),
('Conteúdo', 'Criação e produção de conteúdo', '#2196F3', 'mdi-file-document'),
('Design', 'Design gráfico e identidade visual', '#FF9800', 'mdi-palette'),
('Desenvolvimento', 'Desenvolvimento web e sistemas', '#4CAF50', 'mdi-code-tags'),
('Marketing', 'Campanhas e marketing digital', '#F44336', 'mdi-bullhorn'),
('Análise', 'Análise de dados e relatórios', '#607D8B', 'mdi-chart-line'),
('Suporte', 'Suporte técnico e manutenção', '#795548', 'mdi-help-circle')
ON CONFLICT DO NOTHING;

-- 4. Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. RLS Policies
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Apenas Hibrit Staff pode ver categorias
CREATE POLICY "Only Hibrit staff can manage service categories" ON service_categories
    FOR ALL USING (get_user_role(auth.uid()) = 'hibrit_staff');

-- Apenas Hibrit Staff pode ver tarefas
CREATE POLICY "Only Hibrit staff can manage tasks" ON tasks
    FOR ALL USING (get_user_role(auth.uid()) = 'hibrit_staff');

-- 6. View para tarefas com informações relacionadas
CREATE OR REPLACE VIEW tasks_overview AS
SELECT 
    t.id,
    t.title,
    t.description,
    t.status,
    t.priority,
    t.start_date,
    t.due_date,
    t.estimated_hours,
    t.actual_hours,
    t.tags,
    t.created_at,
    t.updated_at,
    
    -- Workspace
    w.name as workspace_name,
    w.slug as workspace_slug,
    
    -- Categoria
    sc.name as category_name,
    sc.color as category_color,
    sc.icon as category_icon,
    
    -- Usuários
    assigned_user.email as assigned_to_email,
    creator.email as created_by_email,
    
    -- Cálculos
    CASE 
        WHEN t.due_date < CURRENT_DATE AND t.status NOT IN ('done') THEN 'overdue'
        WHEN t.due_date = CURRENT_DATE AND t.status NOT IN ('done') THEN 'due_today'
        WHEN t.due_date BETWEEN CURRENT_DATE + 1 AND CURRENT_DATE + 3 AND t.status NOT IN ('done') THEN 'due_soon'
        ELSE 'on_track'
    END as urgency_status,
    
    CASE 
        WHEN t.start_date IS NOT NULL AND t.due_date IS NOT NULL 
        THEN t.due_date - t.start_date + 1
        ELSE NULL
    END as duration_days

FROM tasks t
LEFT JOIN workspaces w ON w.id = t.workspace_id
LEFT JOIN service_categories sc ON sc.id = t.service_category_id
LEFT JOIN auth.users assigned_user ON assigned_user.id = t.assigned_to
LEFT JOIN auth.users creator ON creator.id = t.created_by
ORDER BY 
    CASE t.priority 
        WHEN 'urgent' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
    END,
    t.due_date ASC NULLS LAST,
    t.created_at DESC;

-- A view herda as políticas RLS das tabelas base (tasks, workspaces, service_categories)