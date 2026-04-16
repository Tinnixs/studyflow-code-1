/* ============================================================
   StudyFlow | script.js — Landing Page (index.html)
   ============================================================
   AULA: Imersão em JavaScript — Fundamentos e DOM

   NOTA: tema, navbar e loading screen são gerenciados pelo
   core.js (carregado antes deste arquivo). Este script
   contém apenas a lógica EXCLUSIVA da landing page.

   Recursos implementados:
   1. Timer mock regressivo (setInterval)
   2. IntersectionObserver — feature cards fade-in ao scroll
   3. Botão "Ver como funciona" — revela painel oculto
   4. Feature cards — expandem detalhe ao clicar
   ============================================================ */

console.log("🐱 StudyFlow carregado — script.js ativo");

// ── Seletores da landing page ───────────────────────────────
const timerMock = document.getElementById('timer-mock');

// ============================================================
// 1. TIMER MOCK REGRESSIVO
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
    timerMock.textContent =
      String(minutos).padStart(2, '0') + ':' + String(segundos).padStart(2, '0');
  }, 1000);
}

// ============================================================
// 2. INTERSECTIONOBSERVER — Feature cards fade-in ao scroll
// CONCEITO: IntersectionObserver
// Monitora quando elementos entram na área visível da tela.
// Muito mais eficiente que checar scroll a cada pixel.
// ============================================================
const cards = document.querySelectorAll('.feature-card');

if (cards.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = [...cards].indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visivel');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(card => observer.observe(card));
} else {
  cards.forEach(card => card.classList.add('visivel'));
}

// ============================================================
// 3. BOTÃO "VER COMO FUNCIONA" — Revela painel oculto
// CONCEITO: Interação → Evento → Manipulação do DOM
// querySelector + classList.toggle + scrollIntoView
// ============================================================
const btnVerComoFunciona = document.querySelector('a[href="#funcionalidades"].btn-secundario');
const painelComoFunciona = document.getElementById('como-funciona-painel');

if (btnVerComoFunciona && painelComoFunciona) {
  btnVerComoFunciona.addEventListener('click', (evento) => {
    evento.preventDefault();
    const estaAberto = painelComoFunciona.classList.toggle('expandido');
    btnVerComoFunciona.textContent = estaAberto ? '✕ Fechar' : '▷ Ver como funciona';
    if (estaAberto) {
      painelComoFunciona.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// ============================================================
// 4. FEATURE CARDS — Expandem um detalhe ao clicar
// CONCEITO: forEach + addEventListener em múltiplos elementos
// Regra UX: apenas 1 card expandido por vez
// ============================================================
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const jaExpandido = card.classList.contains('expandido');
    cards.forEach(c => {
      c.classList.remove('expandido');
      const icone = c.querySelector('.feature-card__icone');
      if (icone) icone.style.transform = 'scale(1)';
    });
    if (!jaExpandido) {
      card.classList.add('expandido');
      const icone = card.querySelector('.feature-card__icone');
      if (icone) icone.style.transform = 'scale(1.15)';
    }
  });
});