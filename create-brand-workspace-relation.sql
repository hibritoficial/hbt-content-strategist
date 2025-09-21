-- Criar relação entre brands e workspaces
-- Execute no Supabase SQL Editor

-- 1. Adicionar coluna workspace_id na tabela brands (se não existir)
ALTER TABLE brands 
ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(id);

-- 2. Criar workspaces para brands que não têm (baseado no slug)
INSERT INTO workspaces (name, slug, brand_settings)
SELECT 
    b.name,
    b.slug,
    '{}'::jsonb
FROM brands b
WHERE NOT EXISTS (
    SELECT 1 FROM workspaces w WHERE w.slug = b.slug
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Associar brands aos workspaces correspondentes (por slug)
UPDATE brands 
SET workspace_id = w.id
FROM workspaces w
WHERE brands.slug = w.slug 
AND brands.workspace_id IS NULL;

-- 4. Para brands sem workspace correspondente, criar workspace
INSERT INTO workspaces (name, slug, brand_settings)
SELECT 
    b.name || ' Workspace',
    b.slug || '-ws',
    '{}'::jsonb
FROM brands b
WHERE b.workspace_id IS NULL
ON CONFLICT (slug) DO NOTHING;

-- 5. Associar brands restantes aos novos workspaces
UPDATE brands 
SET workspace_id = w.id
FROM workspaces w
WHERE brands.slug || '-ws' = w.slug 
AND brands.workspace_id IS NULL;

-- 6. Verificar resultado da associação
SELECT 
  b.id as brand_id,
  b.name as brand_name,
  b.slug as brand_slug,
  b.workspace_id,
  w.name as workspace_name,
  w.slug as workspace_slug
FROM brands b
LEFT JOIN workspaces w ON b.workspace_id = w.id
ORDER BY b.name;