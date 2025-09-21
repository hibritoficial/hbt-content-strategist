-- Associar conteúdos existentes aos workspaces corretos
-- Execute no Supabase SQL Editor

-- Primeiro, verificar se os conteúdos têm brand_id válido
SELECT 
  ci.id,
  ci.title,
  ci.brand_id,
  w.name as workspace_name
FROM content_items ci
LEFT JOIN workspaces w ON w.id = ci.brand_id
LIMIT 10;

-- Verificar brands disponíveis
SELECT id, name FROM brands LIMIT 5;

-- Associar todos os conteúdos ao primeiro brand disponível
UPDATE content_items 
SET brand_id = (SELECT id FROM brands LIMIT 1)
WHERE brand_id IS NULL OR brand_id NOT IN (SELECT id FROM brands);

-- Verificar resultado
SELECT 
  ci.id,
  ci.title,
  ci.brand_id,
  w.name as workspace_name
FROM content_items ci
LEFT JOIN workspaces w ON w.id = ci.brand_id;