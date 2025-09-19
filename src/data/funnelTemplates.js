export const funnelTemplates = {
  'lead-magnet-basico': {
    id: 'lead-magnet-basico',
    name: 'Lead Magnet Básico',
    description: 'Funil simples para captura de leads com material gratuito',
    category: 'Captura de Leads',
    nodes: [
      {
        id: 'traffic-1',
        type: 'traffic',
        label: 'Tráfego Pago',
        position: { x: 50, y: 100 },
        config: {
          source: 'meta',
          utmCampaign: 'lead-magnet'
        }
      },
      {
        id: 'landing-1',
        type: 'landing',
        label: 'Landing Page',
        position: { x: 300, y: 100 },
        config: {
          urlPattern: '/lead-magnet'
        }
      },
      {
        id: 'form-1',
        type: 'form',
        label: 'Formulário',
        position: { x: 550, y: 100 },
        config: {
          formId: 'lead-form',
          eventName: 'form_submit'
        }
      },
      {
        id: 'thankyou-1',
        type: 'thankyou',
        label: 'Obrigado',
        position: { x: 800, y: 100 },
        config: {}
      }
    ],
    edges: [
      {
        source: 'traffic-1',
        target: 'landing-1'
      },
      {
        source: 'landing-1',
        target: 'form-1'
      },
      {
        source: 'form-1',
        target: 'thankyou-1'
      }
    ]
  }
}