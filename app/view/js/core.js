// ============================================================
// StudyFlow | core.js — Utilitários Compartilhados
// ============================================================
// Inclua este arquivo em TODAS as páginas, antes dos scripts
// específicos de cada página:
//   <script src="core.js"></script>
//
// Substitui o código duplicado de:
//   - Toggle de tema (dark/light)
//   - Navbar scroll + hambúrguer
//   - Loading screen (com lógica de sessionStorage)
//   - Wrapper seguro para localStorage
//   - Sistema de Toast (sem alert())
// ============================================================

// ── Wrapper seguro para localStorage ───────────────────────
// localStorage pode falhar em modo privado ou Safari.
// Todas as páginas devem usar lsGet/lsSet em vez de
// localStorage.getItem/setItem diretamente.
function lsGet(chave, fallback = null) {
  try { return localStorage.getItem(chave) ?? fallback; }
  catch { return fallback; }
}

function lsSet(chave, valor) {
  try { localStorage.setItem(chave, valor); }
  catch { console.warn('[StudyFlow] localStorage indisponível'); }
}

function lsRemove(chave) {
  try { localStorage.removeItem(chave); }
  catch { console.warn('[StudyFlow] localStorage indisponível'); }
}


// ── Toggle Dark / Light ─────────────────────────────────────
// Lê os elementos pelo ID padrão usado em todas as páginas:
//   #toggle-tema  → <input type="checkbox">
//   #label-tema   → <label> com o texto "Dark" / "Light"
//   #icone-tema   → <span> com o emoji 🌙 / ☀️
//
// Como usar no HTML (igual ao que já existe):
//   <input type="checkbox" id="toggle-tema" ...>
//   <label id="label-tema">Dark</label>
//   <span  id="icone-tema">🌙</span>
function initTheme() {
  const htmlEl    = document.documentElement;
  const inputTema = document.getElementById('toggle-tema');
  const labelTema = document.getElementById('label-tema');
  const iconeTema = document.getElementById('icone-tema');

  // Sem toggle na página — encerra sem erro
  if (!inputTema) return;

  // Aplica o tema salvo ao carregar
  const temaSalvo = lsGet('sf-tema');
  if (temaSalvo === 'light') {
    inputTema.checked = true;
    htmlEl.setAttribute('data-tema', 'light');
    if (labelTema) labelTema.textContent = 'Light';
    if (iconeTema) iconeTema.textContent = '☀️';
  }

  // Escuta mudanças no toggle
  inputTema.addEventListener('change', () => {
    const modoLight = inputTema.checked;
    htmlEl.setAttribute('data-tema', modoLight ? 'light' : 'dark');
    if (labelTema) labelTema.textContent = modoLight ? 'Light' : 'Dark';
    if (iconeTema) iconeTema.textContent = modoLight ? '☀️' : '🌙';
    lsSet('sf-tema', modoLight ? 'light' : 'dark');
  });
}


// ── Navbar: scroll + hambúrguer ─────────────────────────────
// Espera os IDs padrão:
//   #nav-principal → <nav>
//   #nav-toggle    → <button> hambúrguer
//   #nav-links     → <ul> com os links
function initNavigation() {
  const navEl     = document.getElementById('nav-principal');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  // Adiciona classe .rolado ao rolar (para efeito de sombra/blur)
  if (navEl) {
    window.addEventListener('scroll', () => {
      navEl.classList.toggle('rolado', window.scrollY > 20);
    }, { passive: true });
  }

  // Hambúrguer: abre/fecha o menu em mobile
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const aberto = navLinks.classList.toggle('aberto');
      navToggle.classList.toggle('aberto', aberto);
      navToggle.setAttribute('aria-expanded', String(aberto));
      navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha o menu ao clicar em qualquer link (navegação em SPA-like)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('aberto');
        navToggle.classList.remove('aberto');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }
}


// ── Loading Screen ──────────────────────────────────────────
// Lógica com sessionStorage: aparece apenas na PRIMEIRA visita
// da sessão, não em cada navegação entre páginas.
//
// Espera o ID: #loading-screen
//
// sessionStorage vs localStorage:
//   localStorage   → persiste até o usuário limpar
//   sessionStorage → some quando a aba é fechada
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  const jaCarregou = sessionStorage.getItem('sf-loaded');

  if (jaCarregou) {
    // Não é a primeira visita da sessão → esconde sem animação
    loadingScreen.style.display = 'none';
    return;
  }

  // Primeira visita → registra e mostra normalmente
  sessionStorage.setItem('sf-loaded', 'true');

  function esconderLoading() {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1800);
  }

  if (document.readyState === 'complete') {
    esconderLoading();
  } else {
    window.addEventListener('load', esconderLoading);
  }

  // Segurança: esconde após 6s mesmo se algo travar
  setTimeout(() => {
    if (!loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
    }
  }, 6000);
}


// ── Sistema de Toast ────────────────────────────────────────
// Substitui alert() em todo o projeto.
// Uso: showToast('Tarefa salva!', 'sucesso')
//      showToast('Erro ao salvar.', 'erro')
//      showToast('Atenção: prazo próximo.', 'aviso')
//
// Tipos disponíveis: 'sucesso' | 'erro' | 'aviso' | 'info'
// Duração padrão: 3500ms
function showToast(mensagem, tipo = 'info', duracao = 3500) {
  // Cria container de toasts se ainda não existir
  let container = document.getElementById('sf-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'sf-toast-container';
    // Estilos inline mínimos — não dependem do CSS carregado
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: '99999',
      pointerEvents: 'none',
    });
    document.body.appendChild(container);
  }

  // Cria o toast
  const toast = document.createElement('div');
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  const icones = { sucesso: '✅', erro: '❌', aviso: '⚠️', info: 'ℹ️' };
  const cores  = {
    sucesso: '#0f5132',
    erro:    '#842029',
    aviso:   '#664d03',
    info:    '#0c3460',
  };

  Object.assign(toast.style, {
    background:   cores[tipo] || cores.info,
    color:        '#fff',
    padding:      '12px 16px',
    borderRadius: '10px',
    fontSize:     '14px',
    fontFamily:   'Inter, sans-serif',
    boxShadow:    '0 4px 12px rgba(0,0,0,0.3)',
    display:      'flex',
    alignItems:   'center',
    gap:          '8px',
    opacity:      '0',
    transform:    'translateY(8px)',
    transition:   'opacity 0.25s ease, transform 0.25s ease',
    pointerEvents:'auto',
    maxWidth:     '320px',
  });

  toast.innerHTML = `<span>${icones[tipo] || icones.info}</span><span>${mensagem}</span>`;
  container.appendChild(toast);

  // Anima entrada
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  // Remove após duração
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, duracao);
}


// ── Inicialização automática ────────────────────────────────
// Roda quando o DOM estiver pronto em qualquer página que
// inclua este arquivo. Não é necessário chamar nada manualmente.
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initLoadingScreen();
});

console.log('[StudyFlow] core.js carregado');