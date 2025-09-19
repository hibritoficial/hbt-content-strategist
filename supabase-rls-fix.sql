-- Desabilitar RLS temporariamente para popular dados
ALTER TABLE pillars DISABLE ROW LEVEL SECURITY;
ALTER TABLE angles DISABLE ROW LEVEL SECURITY;
ALTER TABLE formats DISABLE ROW LEVEL SECURITY;
ALTER TABLE molds DISABLE ROW LEVEL SECURITY;
ALTER TABLE content_items DISABLE ROW LEVEL SECURITY;

-- Ou criar políticas que permitam inserção
-- DROP POLICY IF EXISTS "Allow all operations" ON pillars;
-- CREATE POLICY "Allow all operations" ON pillars FOR ALL TO anon USING (true) WITH CHECK (true);