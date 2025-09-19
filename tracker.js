// HIBRIT Tracker - Snippet para captura de eventos
(function() {
  'use strict';
  
  // Configuração global
  window.hibrit = window.hibrit || function(action, data) {
    (window.hibrit.q = window.hibrit.q || []).push([action, data]);
  };
  
  let config = {};
  let sessionId = generateSessionId();
  
  // Processar fila de comandos
  function processQueue() {
    const queue = window.hibrit.q || [];
    queue.forEach(([action, data]) => {
      switch (action) {
        case 'init':
          config = { ...data };
          trackEvent('page_view', {
            url: location.href,
            title: document.title,
            referrer: document.referrer,
            utm: getUTMParams()
          });
          break;
        case 'event':
          trackEvent(data.name, data);
          break;
      }
    });
    window.hibrit.q = [];
  }
  
  // Gerar ID de sessão único
  function generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  // Extrair parâmetros UTM da URL
  function getUTMParams() {
    const params = new URLSearchParams(location.search);
    return {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      content: params.get('utm_content'),
      term: params.get('utm_term')
    };
  }
  
  // Enviar evento para o backend
  function trackEvent(eventName, data = {}) {
    if (!config.endpoint || !config.funnelId) {
      console.warn('HIBRIT Tracker: endpoint ou funnelId não configurado');
      return;
    }
    
    const payload = {
      ts: new Date().toISOString(),
      session_id: sessionId,
      source: 'tracker',
      channel: 'web',
      event: eventName,
      url: location.href,
      utm: getUTMParams(),
      meta: {
        ...data,
        user_agent: navigator.userAgent,
        screen: {
          width: screen.width,
          height: screen.height
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    };
    
    // Enviar via fetch (com fallback para beacon)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        `${config.endpoint}?funnel_id=${config.funnelId}`,
        JSON.stringify(payload)
      );
    } else {
      fetch(`${config.endpoint}?funnel_id=${config.funnelId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(err => console.warn('HIBRIT Tracker error:', err));
    }
  }
  
  // Auto-tracking de eventos comuns
  function setupAutoTracking() {
    // Cliques em CTAs
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-hibrit-cta]');
      if (target) {
        trackEvent('cta_click', {
          cta_id: target.dataset.hibritCta,
          cta_text: target.textContent.trim(),
          element: target.tagName.toLowerCase()
        });
      }
    });
    
    // Submissão de formulários
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.dataset.hibritForm) {
        trackEvent('form_submit', {
          form_id: form.dataset.hibritForm,
          form_action: form.action,
          fields_count: form.elements.length
        });
      }
    });
    
    // Scroll tracking (25%, 50%, 75%, 100%)
    let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
    window.addEventListener('scroll', throttle(() => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      Object.keys(scrollMarks).forEach(mark => {
        if (scrollPercent >= mark && !scrollMarks[mark]) {
          scrollMarks[mark] = true;
          trackEvent('scroll', { percent: parseInt(mark) });
        }
      });
    }, 500));
    
    // Tempo na página (heartbeat a cada 30s)
    let timeOnPage = 0;
    setInterval(() => {
      timeOnPage += 30;
      trackEvent('time_on_page', { seconds: timeOnPage });
    }, 30000);
  }
  
  // Throttle helper
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // API pública
  window.hibrit.track = trackEvent;
  window.hibrit.session = sessionId;
  
  // Inicializar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      processQueue();
      setupAutoTracking();
    });
  } else {
    processQueue();
    setupAutoTracking();
  }
  
})();

// Exemplo de uso:
/*
<script>
hibrit('init', {
  funnelId: '550e8400-e29b-41d4-a716-446655440000',
  endpoint: 'https://your-site.netlify.app/.netlify/functions/ingest'
});

// Eventos customizados
hibrit('event', { name: 'video_play', video_id: 'intro-video' });
hibrit('event', { name: 'whatsapp_click', button_location: 'header' });
</script>

<!-- Elementos com tracking automático -->
<button data-hibrit-cta="header-whatsapp">Falar no WhatsApp</button>
<form data-hibrit-form="lead-capture" action="/submit">
  <!-- campos do form -->
</form>
*/