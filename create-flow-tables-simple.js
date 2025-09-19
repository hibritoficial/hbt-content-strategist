import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jfxvfekzoaixdmckrlch.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeHZmZWt6b2FpeGRtY2tybGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNDU3MTUsImV4cCI6MjA3MzgyMTcxNX0.f4Oed_H6X7zYc5n7dhQtrmOsv-DNBBWK_1eDKV9Xdg8'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createFlowTables() {
  try {
    console.log('🔄 Inserindo dados iniciais do Flow...')
    
    // Tentar inserir dados na tabela flow_node_status (assumindo que existe)
    const { data, error } = await supabase
      .from('flow_node_status')
      .upsert([
        { node_id: 'pa', status: 'pending', metrics: { completion: 0 } },
        { node_id: 'pb', status: 'pending', metrics: { completion: 0, variations_generated: 0 } },
        { node_id: 'pc', status: 'pending', metrics: { completion: 0, scorecard_avg: 0 } },
        { node_id: 'pd', status: 'pending', metrics: { completion: 0, assets_created: 0 } },
        { node_id: 'pe', status: 'pending', metrics: { completion: 0, cxa_score: 0 } },
        { node_id: 'pf', status: 'pending', metrics: { completion: 0, posts_published: 0 } },
        { node_id: 'pg', status: 'pending', metrics: { completion: 0, metrics_collected: 0 } }
      ], { onConflict: 'node_id' })
    
    if (error) {
      console.log('❌ Erro - tabelas não existem ainda:', error.message)
      console.log('📋 Execute este SQL no Supabase Dashboard:')
      console.log(`
-- Copie e cole no SQL Editor do Supabase:

CREATE TABLE flow_node_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  metrics jsonb DEFAULT '{}',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(node_id)
);

CREATE TABLE flow_layouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT auth.uid(),
  node_id text NOT NULL,
  position_x integer NOT NULL DEFAULT 0,
  position_y integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, node_id)
);

INSERT INTO flow_node_status (node_id, status, metrics) VALUES
('pa', 'pending', '{"completion": 0}'),
('pb', 'pending', '{"completion": 0, "variations_generated": 0}'),
('pc', 'pending', '{"completion": 0, "scorecard_avg": 0}'),
('pd', 'pending', '{"completion": 0, "assets_created": 0}'),
('pe', 'pending', '{"completion": 0, "cxa_score": 0}'),
('pf', 'pending', '{"completion": 0, "posts_published": 0}'),
('pg', 'pending', '{"completion": 0, "metrics_collected": 0}');
      `)
    } else {
      console.log('✅ Dados inseridos com sucesso:', data)
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message)
  }
}

createFlowTables()