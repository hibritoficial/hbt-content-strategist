-- Adicionar coluna settings na tabela brands
-- Execute no Supabase SQL Editor

-- 1. Adicionar coluna settings como JSONB
ALTER TABLE brands 
ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{}';

-- 2. Atualizar brands existentes com configurações padrão
UPDATE brands 
SET settings = jsonb_build_object(
  'segment', 'Outro',
  'primaryColor', '#1976D2',
  'description', ''
)
WHERE settings IS NULL OR settings = '{}';

-- 3. Verificar resultado
SELECT 
  id,
  name,
  slug,
  workspace_id,
  settings
FROM brands;