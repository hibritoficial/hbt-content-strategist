-- Tabelas principais do sistema

-- Pilares
CREATE TABLE pillars (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Ângulos
CREATE TABLE angles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Formatos
CREATE TABLE formats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Moldes
CREATE TABLE molds (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slides INTEGER DEFAULT 1,
  layout_schema JSONB,
  default_components JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Itens de conteúdo
CREATE TABLE content_items (
  id SERIAL PRIMARY KEY,
  brand_id INTEGER DEFAULT 1,
  channel VARCHAR(50) DEFAULT 'instagram',
  title VARCHAR(255) NOT NULL,
  pillar_id INTEGER REFERENCES pillars(id),
  angle_id INTEGER REFERENCES angles(id),
  format_id INTEGER REFERENCES formats(id),
  mold_id INTEGER REFERENCES molds(id),
  offer TEXT,
  proof_anchor TEXT,
  cta_text VARCHAR(255),
  cta_keyword_id INTEGER,
  hashtags_cluster VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  status VARCHAR(50) DEFAULT 'backlog',
  scheduled_date DATE,
  post_url VARCHAR(500),
  created_by INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Dados iniciais
INSERT INTO pillars (name, description) VALUES
('Educação', 'Conteúdos educativos e informativos'),
('Inspiração', 'Conteúdos motivacionais e inspiradores'),
('Entretenimento', 'Conteúdos divertidos e engajadores');

INSERT INTO angles (name, description) VALUES
('Tutorial', 'Passo a passo detalhado'),
('Dica Rápida', 'Dicas práticas e objetivas'),
('Bastidores', 'Conteúdo dos bastidores');

INSERT INTO formats (name, description) VALUES
('Post', 'Post simples do Instagram'),
('Carrossel', 'Carrossel de múltiplas imagens'),
('Reels', 'Vídeo curto vertical'),
('Story', 'Story temporário');

INSERT INTO molds (slug, name, slides, layout_schema) VALUES
('carousel-6x', 'Carrossel 6x', 6, '{"type": "carousel", "slides": 6}'),
('reels-tutorial', 'Reels Tutorial', 1, '{"type": "reels", "duration": "15-30s"}'),
('post-simple', 'Post Simples', 1, '{"type": "post", "format": "square"}');

-- RLS (Row Level Security) - básico
ALTER TABLE pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE angles ENABLE ROW LEVEL SECURITY;
ALTER TABLE formats ENABLE ROW LEVEL SECURITY;
ALTER TABLE molds ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (permitir tudo por enquanto)
CREATE POLICY "Allow all operations" ON pillars FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON angles FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON formats FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON molds FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON content_items FOR ALL USING (true);