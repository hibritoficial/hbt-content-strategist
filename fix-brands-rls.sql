-- Verificar e corrigir RLS na tabela brands
-- Execute no Supabase SQL Editor

-- 1. Verificar se RLS está habilitado na tabela brands
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'brands';

-- 2. Desabilitar RLS temporariamente para desenvolvimento
ALTER TABLE brands DISABLE ROW LEVEL SECURITY;

-- 3. Verificar todos os brands disponíveis
SELECT id, name, slug, workspace_id FROM brands ORDER BY name;

-- 4. Se necessário, criar política RLS mais permissiva
-- (Execute apenas se quiser reabilitar RLS depois)
/*
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for authenticated users" ON brands
FOR ALL USING (auth.role() = 'authenticated');
*/