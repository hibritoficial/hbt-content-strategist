-- Inserir dados de exemplo na tabela content_items existente
-- Primeiro, obter um brand_id válido da tabela brands
INSERT INTO content_items (title, offer, proof_anchor, cta_text, hashtags_cluster, utm_campaign, utm_content, brand_id, status) 
SELECT 
  title, offer, proof_anchor, cta_text, hashtags_cluster, utm_campaign, utm_content, 
  (SELECT id FROM brands LIMIT 1) as brand_id, 
  status
FROM (
  VALUES 
    ('5 Dicas Para Aumentar Vendas', 'Você sabia que 90% dos empreendedores cometem este erro?', 'Mais de 1.000 alunos já aplicaram', 'Comente QUERO', '#marketing #vendas', 'instagram_post_vendas', 'carrossel_5_dicas', 'backlog'),
    ('Como Criar Conteúdo Viral', 'O segredo dos posts que viralizam', 'Nossos clientes tiveram 500% mais engajamento', 'Salve este post', '#viral #conteudo', 'instagram_viral_content', 'post_viral_dicas', 'draft_copy'),
    ('Estratégias de Instagram 2024', 'As tendências que vão dominar 2024', 'Baseado em análise de 10.000 posts', 'Compartilhe nos stories', '#instagram2024 #estrategia', 'instagram_trends_2024', 'carrossel_tendencias', 'ready')
) AS data(title, offer, proof_anchor, cta_text, hashtags_cluster, utm_campaign, utm_content, status);