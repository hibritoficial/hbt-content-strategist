import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jfxvfekzoaixdmckrlch.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeHZmZWt6b2FpeGRtY2tybGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNDU3MTUsImV4cCI6MjA3MzgyMTcxNX0.f4Oed_H6X7zYc5n7dhQtrmOsv-DNBBWK_1eDKV9Xdg8'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createFunnelTables() {
  try {
    console.log('🔄 Criando tabelas do Funnel...')
    
    // Tentar inserir dados na tabela funnels (assumindo que existe)
    const { data, error } = await supabase
      .from('funnels')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Aquisição • LP • WhatsApp • Compra',
          description: 'Funil completo de aquisição via Meta Ads',
          is_active: true
        }
      ], { onConflict: 'id' })
    
    if (error) {
      console.log('❌ Erro - tabelas não existem ainda:', error.message)
      console.log('📋 Execute este SQL no Supabase Dashboard:')
      console.log(`
-- Copie e cole no SQL Editor do Supabase:

-- Funnels principais
CREATE TABLE funnels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid DEFAULT auth.uid(),
  name text NOT NULL,
  description text,
  thumbnail_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Nós do funil (modulares)
CREATE TABLE funnel_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  funnel_id uuid REFERENCES funnels(id) ON DELETE CASCADE,
  type text NOT NULL,
  label text NOT NULL,
  icon text NOT NULL,
  config jsonb DEFAULT '{}',
  position_x integer DEFAULT 0,
  position_y integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Conexões entre nós
CREATE TABLE funnel_edges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  funnel_id uuid REFERENCES funnels(id) ON DELETE CASCADE,
  source_node_id uuid REFERENCES funnel_nodes(id) ON DELETE CASCADE,
  target_node_id uuid REFERENCES funnel_nodes(id) ON DELETE CASCADE,
  label text,
  filter jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Eventos brutos (ingestão)
CREATE TABLE events_raw (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ts timestamptz DEFAULT now(),
  session_id text NOT NULL,
  user_id text,
  source text,
  channel text,
  event text NOT NULL,
  url text,
  utm jsonb DEFAULT '{}',
  meta jsonb DEFAULT '{}'
);

-- Eventos processados (agregados por minuto)
CREATE TABLE events_enriched (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ts_minute timestamptz NOT NULL,
  session_id text NOT NULL,
  identity_id uuid,
  funnel_id uuid REFERENCES funnels(id),
  node_id uuid REFERENCES funnel_nodes(id),
  edge_id uuid REFERENCES funnel_edges(id),
  event text NOT NULL,
  count integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Identidades unificadas
CREATE TABLE identities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  phone text,
  whatsapp text,
  external_ids jsonb DEFAULT '{}',
  first_seen timestamptz DEFAULT now(),
  last_seen timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_events_raw_ts ON events_raw(ts);
CREATE INDEX idx_events_raw_session ON events_raw(session_id);
CREATE INDEX idx_events_enriched_funnel_minute ON events_enriched(funnel_id, ts_minute);
CREATE INDEX idx_events_enriched_edge ON events_enriched(edge_id);
CREATE INDEX idx_funnel_nodes_funnel ON funnel_nodes(funnel_id);

-- RLS
ALTER TABLE funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE funnel_edges ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can manage their own funnels" ON funnels
  FOR ALL USING (auth.uid() = brand_id);

CREATE POLICY "Users can manage nodes of their funnels" ON funnel_nodes
  FOR ALL USING (
    funnel_id IN (SELECT id FROM funnels WHERE brand_id = auth.uid())
  );

CREATE POLICY "Users can manage edges of their funnels" ON funnel_edges
  FOR ALL USING (
    funnel_id IN (SELECT id FROM funnels WHERE brand_id = auth.uid())
  );

-- Seed data: Funil exemplo
INSERT INTO funnels (id, name, description) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Aquisição • LP • WhatsApp • Compra', 'Funil completo de aquisição via Meta Ads');

INSERT INTO funnel_nodes (funnel_id, type, label, icon, config, position_x, position_y) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'traffic', 'Meta Ads', 'mdi-facebook', '{"source":"meta","utmCampaign":"agrolito_manejo"}', 0, 0),
('550e8400-e29b-41d4-a716-446655440000', 'landing', 'LP Manejo', 'mdi-web', '{"urlPattern":"/lp-manejo"}', 300, 0),
('550e8400-e29b-41d4-a716-446655440000', 'form', 'Lead', 'mdi-form-textbox', '{"eventName":"form_submit","formId":"lead-manejo"}', 600, 0),
('550e8400-e29b-41d4-a716-446655440000', 'whatsapp', 'Conversa', 'mdi-whatsapp', '{"eventName":"whatsapp_click"}', 900, 0),
('550e8400-e29b-41d4-a716-446655440000', 'checkout', 'Compra', 'mdi-cart', '{"eventName":"purchase"}', 1200, 0),
('550e8400-e29b-41d4-a716-446655440000', 'thankyou', 'Obrigado', 'mdi-check-circle', '{"urlPattern":"/obrigado"}', 1500, 0);

-- Edges do funil exemplo
INSERT INTO funnel_edges (funnel_id, source_node_id, target_node_id, label) 
SELECT 
  '550e8400-e29b-41d4-a716-446655440000',
  s.id,
  t.id,
  CASE 
    WHEN s.type = 'traffic' AND t.type = 'landing' THEN 'ads → lp'
    WHEN s.type = 'landing' AND t.type = 'form' THEN 'lp → form'
    WHEN s.type = 'form' AND t.type = 'whatsapp' THEN 'lead → wa'
    WHEN s.type = 'whatsapp' AND t.type = 'checkout' THEN 'wa → compra'
    WHEN s.type = 'checkout' AND t.type = 'thankyou' THEN 'compra → obrigado'
  END
FROM funnel_nodes s, funnel_nodes t
WHERE s.funnel_id = '550e8400-e29b-41d4-a716-446655440000'
  AND t.funnel_id = '550e8400-e29b-41d4-a716-446655440000'
  AND (
    (s.type = 'traffic' AND t.type = 'landing') OR
    (s.type = 'landing' AND t.type = 'form') OR
    (s.type = 'form' AND t.type = 'whatsapp') OR
    (s.type = 'whatsapp' AND t.type = 'checkout') OR
    (s.type = 'checkout' AND t.type = 'thankyou')
  );
      `)
    } else {
      console.log('✅ Dados inseridos com sucesso:', data)
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message)
  }
}

createFunnelTables()