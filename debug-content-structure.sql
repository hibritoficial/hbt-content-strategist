-- Debug: Verificar estrutura dos dados de content_items
SELECT 
  id,
  title,
  brand_id,
  workspace_id,
  status,
  created_at
FROM content_items 
LIMIT 5;

-- Verificar se existe coluna workspace_id
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'content_items' 
AND column_name IN ('brand_id', 'workspace_id');

-- Verificar workspaces disponíveis
SELECT id, name, slug FROM workspaces LIMIT 5;

-- Verificar brands disponíveis  
SELECT id, name, slug FROM brands LIMIT 5;