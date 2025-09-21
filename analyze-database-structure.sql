-- Análise completa da estrutura do banco
-- Execute no Supabase SQL Editor

-- 1. Verificar todas as tabelas existentes
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. Estrutura da tabela brands
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'brands' 
ORDER BY ordinal_position;

-- 3. Dados da tabela brands
SELECT * FROM brands;

-- 4. Estrutura da tabela workspaces
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'workspaces' 
ORDER BY ordinal_position;

-- 5. Dados da tabela workspaces
SELECT * FROM workspaces;

-- 6. Estrutura da tabela content_items
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'content_items' 
ORDER BY ordinal_position;

-- 7. Resumo dos content_items por brand_id
SELECT 
  brand_id,
  COUNT(*) as total_items,
  string_agg(DISTINCT status, ', ') as statuses_found
FROM content_items 
GROUP BY brand_id;

-- 8. Verificar se existe relação entre brands e workspaces
SELECT 
  b.id as brand_id,
  b.name as brand_name,
  b.slug as brand_slug,
  w.id as workspace_id,
  w.name as workspace_name,
  w.slug as workspace_slug
FROM brands b
FULL OUTER JOIN workspaces w ON b.slug = w.slug
ORDER BY b.name, w.name;