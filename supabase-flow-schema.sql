-- Tabelas para persistir dados do Flow Canvas

-- Layout personalizado dos nós por usuário
CREATE TABLE flow_layouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid(),
  node_id text NOT NULL,
  position_x integer NOT NULL DEFAULT 0,
  position_y integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, node_id)
);

-- Status e métricas dos nós do flow
CREATE TABLE flow_node_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- 'pending', 'active', 'completed', 'blocked'
  metrics jsonb DEFAULT '{}',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(node_id)
);

-- Configurações globais do flow por usuário
CREATE TABLE flow_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid(),
  zoom_level numeric DEFAULT 1.0,
  viewport_x numeric DEFAULT 0,
  viewport_y numeric DEFAULT 0,
  focus_mode boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- RLS (Row Level Security)
ALTER TABLE flow_layouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE flow_node_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE flow_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can manage their own flow layouts" ON flow_layouts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Everyone can read flow node status" ON flow_node_status
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update flow node status" ON flow_node_status
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage their own flow settings" ON flow_settings
  FOR ALL USING (auth.uid() = user_id);

-- Inserir status inicial dos nós
INSERT INTO flow_node_status (node_id, status, metrics) VALUES
('pa', 'pending', '{"completion": 0, "last_used": null}'),
('pb', 'pending', '{"completion": 0, "variations_generated": 0}'),
('pc', 'pending', '{"completion": 0, "scorecard_avg": 0}'),
('pd', 'pending', '{"completion": 0, "assets_created": 0}'),
('pe', 'pending', '{"completion": 0, "cxa_score": 0}'),
('pf', 'pending', '{"completion": 0, "posts_published": 0}'),
('pg', 'pending', '{"completion": 0, "metrics_collected": 0}');