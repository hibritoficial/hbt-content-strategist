-- Verificar se os dados foram salvos na tabela content_items
SELECT 
  id,
  title,
  status,
  offer,
  cta_text,
  created_at
FROM content_items 
ORDER BY created_at DESC;

-- Contar total de registros
SELECT COUNT(*) as total_items FROM content_items;