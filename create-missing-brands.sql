-- Criar brands para workspaces que não têm brand correspondente
-- Execute no Supabase SQL Editor

-- 1. Criar brand para Asa Mentoria
INSERT INTO brands (name, slug, workspace_id)
SELECT 
    w.name,
    w.slug,
    w.id
FROM workspaces w
WHERE NOT EXISTS (
    SELECT 1 FROM brands b WHERE b.workspace_id = w.id
)
ON CONFLICT (slug) DO NOTHING;

-- 2. Verificar resultado final
SELECT 
  b.id as brand_id,
  b.name as brand_name,
  b.slug as brand_slug,
  b.workspace_id,
  w.name as workspace_name,
  w.slug as workspace_slug
FROM brands b
RIGHT JOIN workspaces w ON b.workspace_id = w.id
ORDER BY w.name;

-- 3. Verificar content_items e seus brands
SELECT 
  ci.id,
  ci.title,
  ci.brand_id,
  b.name as brand_name,
  b.workspace_id
FROM content_items ci
LEFT JOIN brands b ON ci.brand_id = b.id
LIMIT 10;