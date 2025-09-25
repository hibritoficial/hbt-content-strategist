<template>
  <v-tooltip :text="tooltipText" location="top">
    <template #activator="{ props }">
      <div v-bind="props" class="metric-with-tooltip">
        <slot />
        <v-icon size="14" color="grey-lighten-1" class="ml-1">mdi-help-circle-outline</v-icon>
      </div>
    </template>
  </v-tooltip>
</template>

<script setup>
const props = defineProps({
  metric: {
    type: String,
    required: true
  }
})

const tooltips = {
  'MQL': 'Lead com fit/interesse mínimo validado pelo marketing.',
  'SQL': 'Lead qualificado por vendas (dor + orçamento + autoridade).',
  'CTA': 'Ação desejada agora (ex.: agendar diagnóstico).',
  'ICP': 'Perfil ideal do cliente para esta oferta.',
  'Gate': 'Regra objetiva para avançar de etapa.',
  'SLA': 'Prazo combinado de resposta/ação.',
  'UTM': 'Marcadores de origem do tráfego (source/medium/campaign).',
  'Coorte': 'Grupo pelo mês do 1º toque.',
  'Atribuição': 'Last-non-direct para tática; first-touch para estratégia.',
  'CVR': 'Taxa de conversão entre etapas.',
  'CPL': 'Gasto de mídia por lead gerado.',
  'CAC': 'Custo total para conquistar 1 cliente.',
  'Win Rate': 'Clientes ÷ oportunidades (SQL).',
  'Sales Cycle': 'Dias até fechar a venda.',
  'Coverage': 'Pipe ÷ Meta (objetivo ≈ 3×).',
  'NRR': 'Retenção líquida de receita (inclui expansão e churn).',
  'Churn': 'Perda de clientes/receita no período.',
  'TTV': 'Tempo até o 1º valor entregue.',
  'Onboarding': 'Implantação até ativar o uso.',
  'Winback': 'Fluxo para recuperar inativos.'
}

import { computed } from 'vue'

const tooltipText = computed(() => tooltips[props.metric] || 'Métrica não encontrada')
</script>

<style scoped>
.metric-with-tooltip {
  display: inline-flex;
  align-items: center;
  cursor: help;
}
</style>