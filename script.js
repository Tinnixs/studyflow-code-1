/* ============================================================
   StudyFlow | script.js — Landing Page
   ============================================================
   AULA: Imersão em JavaScript — Fundamentos e DOM

   Recursos implementados:
   1. localStorage seguro (wrapper com try/catch)
   2. Toggle dark/light com persistência
   3. Navbar scroll (classe .rolado)
   4. Menu hambúrguer (toggle de classe)
   5. Timer mock regressivo (setInterval)
   6. IntersectionObserver — feature cards fade-in ao scroll
   7. [NOVO] Botão "Ver como funciona" — revela painel oculto
   8. [NOVO] Feature cards — expandem detalhe ao clicar
   ============================================================ */

console.log("🐱 StudyFlow carregado — script.js ativo");

// ============================================================
// CONCEITO: querySelector
// document.querySelector() encontra o PRIMEIRO elemento que
// bate com o seletor CSS passado.
// document.querySelectorAll() retorna TODOS (uma NodeList).
// ============================================================

// ── Seletores principais ────────────────────────────────────
const htmlEl    = document.documentElement;
const inputTema = document.getElementById('toggle-tema');
const labelTema = document.getElementById('label-tema');
const iconeTema = document.getElementById('icone-tema');
const navEl     = document.getElementById('nav-principal');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
const timerMock = document.getElementById('timer-mock');


// ============================================================
// 1. WRAPPER SEGURO PARA localStorage
// localStorage pode falhar em modo privado ou Safari.
// try/catch garante que o site não quebra nesses casos.
// ============================================================
function lsGet(chave, fallback = null) {
  try { return localStorage.getItem(chave) ?? fallback; }
  catch { return fallback; }
}
function lsSet(chave, valor) {
  try { localStorage.setItem(chave, valor); }
  catch { console.warn('localStorage indisponível'); }
}


// ============================================================
// 2. TOGGLE DARK / LIGHT
// CONCEITO: addEventListener('change', callback)
// Escuta o evento 'change' no checkbox e executa a função
// toda vez que o usuário clica no toggle de tema.
// ============================================================
const temaSalvo = lsGet('sf-tema');
if (temaSalvo === 'light') {
  inputTema.checked = true;
  htmlEl.setAttribute('data-tema', 'light');
  labelTema.textContent = 'Light';
  iconeTema.textContent = '☀️';
}

inputTema?.addEventListener('change', () => {
  const modoLight = inputTema.checked;

  // Manipula o DOM: altera o atributo data-tema no <html>
  // O CSS usa [data-tema="light"] para trocar as cores
  htmlEl.setAttribute('data-tema', modoLight ? 'light' : 'dark');
  labelTema.textContent = modoLight ? 'Light' : 'Dark';
  iconeTema.textContent = modoLight ? '☀️' : '🌙';
  lsSet('sf-tema', modoLight ? 'light' : 'dark');
});


// ============================================================
// 3. NAVBAR SCROLL
// CONCEITO: addEventListener('scroll', callback)
// classList.toggle(classe, condicao) adiciona ou remove a
// classe dependendo se a condição é true ou false.
// ============================================================
window.addEventListener('scroll', () => {
  navEl?.classList.toggle('rolado', window.scrollY > 20);
}, { passive: true });


// ============================================================
// 4. MENU HAMBÚRGUER
// CONCEITO: classList.toggle()
// toggle() adiciona a classe se não existir, remove se existir.
// Perfeito para estados "aberto/fechado".
// ============================================================
navToggle?.addEventListener('click', () => {
  const aberto = navLinks?.classList.toggle('aberto');
  navToggle.classList.toggle('aberto', aberto);
  navToggle.setAttribute('aria-expanded', String(aberto));
  navToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('aberto');
    navToggle?.classList.remove('aberto');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});


// ============================================================
// 5. TIMER MOCK REGRESSIVO
// CONCEITO: setInterval(callback, milissegundos)
// Executa a função repetidamente a cada X ms.
// String.padStart(2, '0') formata: 5 → "05", 12 → "12"
// ============================================================
if (timerMock) {
  let minutos = 24, segundos = 37;
  setInterval(() => {
    if (segundos === 0) {
      if (minutos === 0) { minutos = 24; segundos = 59; }
      else { minutos--; segundos = 59; }
    } else {
      segundos--;
    }
    // Manipula o DOM: atualiza o texto do elemento #timer-mock
    timerMock.textContent =
      String(minutos).padStart(2, '0') + ':' + String(segundos).padStart(2, '0');
  }, 1000);
}


// ============================================================
// 6. INTERSECTIONOBSERVER — Feature cards fade-in ao scroll
// CONCEITO: IntersectionObserver
// Monitora quando elementos entram na área visível da tela.
// Muito mais eficiente que checar scroll a cada pixel.
// Quando o card entra na tela → adiciona classe .visivel
// O CSS cuida da animação: opacity 0→1 + translateY
// ============================================================
const cards = document.querySelectorAll('.feature-card');

if (cards.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = [...cards].indexOf(entry.target);
        // Delay escalonado: card 0=0ms, card 1=80ms, card 2=160ms...
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        // Adiciona .visivel → CSS anima opacity e posição
        entry.target.classList.add('visivel');
        // Para de observar esse card (já apareceu)
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
} else {
  cards.forEach(card => card.classList.add('visivel'));
}


// ============================================================
// 7. [NOVO] BOTÃO "VER COMO FUNCIONA" — Revela painel oculto
// ============================================================
// CONCEITO: Interação → Evento → Manipulação do DOM
//
// Fluxo:
//   1. Usuário clica no botão "Ver como funciona"
//   2. addEventListener captura o evento 'click'
//   3. JS manipula o DOM: adiciona/remove classe no painel
//   4. CSS cuida da animação (height + opacity)
//
// querySelector('seletor') — encontra elemento pelo seletor CSS
// classList.toggle() — alterna a classe a cada clique
// evento.preventDefault() — cancela o comportamento padrão do link
// ============================================================

// Seleciona o botão pelo href e classe
const btnVerComoFunciona = document.querySelector('a[href="#funcionalidades"].btn-secundario');
const painelComoFunciona = document.getElementById('como-funciona-painel');

if (btnVerComoFunciona && painelComoFunciona) {
  btnVerComoFunciona.addEventListener('click', (evento) => {
    evento.preventDefault(); // cancela o scroll automático do link

    // toggle: fecha se aberto, abre se fechado
    const estaAberto = painelComoFunciona.classList.toggle('expandido');

    // Atualiza texto do botão conforme o estado atual
    btnVerComoFunciona.textContent = estaAberto ? '✕ Fechar' : '▷ Ver como funciona';

    // Scroll suave até o painel se ele abriu
    if (estaAberto) {
      painelComoFunciona.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}


// ============================================================
// 8. [NOVO] FEATURE CARDS — Expandem um detalhe ao clicar
// ============================================================
// CONCEITO: forEach + addEventListener em múltiplos elementos
//
// querySelectorAll retorna TODOS os cards (NodeList).
// forEach percorre cada um e adiciona um ouvinte de evento.
// classList.contains() — verifica se a classe existe no elemento
//
// Regra UX: apenas 1 card expandido por vez (fecha os outros)
// ============================================================

cards.forEach((card) => {
  // Cada card ganha seu próprio addEventListener
  card.addEventListener('click', () => {
    const jaExpandido = card.classList.contains('expandido');

    // Fecha TODOS antes de abrir o clicado
    cards.forEach(c => {
      c.classList.remove('expandido');
      const icone = c.querySelector('.feature-card__icone');
      if (icone) icone.style.transform = 'scale(1)';
    });

    // Se não estava expandido → expande agora
    if (!jaExpandido) {
      card.classList.add('expandido');

      // Anima o ícone do card expandido
      const icone = card.querySelector('.feature-card__icone');
      if (icone) icone.style.transform = 'scale(1.15)';
    }
  });
});