/* ================================================================
   StudyFlow | script.js — Interatividade da Landing Page
   ================================================================
   Conectado ao index.html via: <script src="script.js"></script>
   (colocado antes de </body> para garantir que o HTML já carregou)

   ÍNDICE:
   1. Teste de conexão  — console.log de confirmação
   2. Tema dark/light   — toggle com localStorage
   3. Navbar scroll     — sombra ao rolar a página
   4. Menu hambúrguer   — abre/fecha no mobile
   5. Timer mock        — contador regressivo animado do hero
   ================================================================ */


/* ================================================================
   1. TESTE DE CONEXÃO
   Abra o navegador → F12 → aba "Console" para ver esta mensagem.
   Isso confirma que o script.js está conectado corretamente.
   ================================================================ */
console.log("O JavaScript está funcionando! 🚀 StudyFlow carregado.");


/* ================================================================
   2. TEMA DARK / LIGHT
   - Lê o tema salvo no localStorage ao carregar a página
   - Escuta o clique no toggle e salva a preferência
   ================================================================ */

// Seleciona os elementos do DOM pelo id
const inputTema = document.getElementById('toggle-tema');
const labelTema = document.getElementById('label-tema');
const iconeTema = document.getElementById('icone-tema');
const htmlEl    = document.documentElement; // a tag <html>

// Ao carregar: aplica o tema salvo (se existir)
const temaSalvo = localStorage.getItem('sf-tema');
if (temaSalvo === 'light') {
  inputTema.checked = true;
  htmlEl.setAttribute('data-tema', 'light');
  labelTema.textContent = 'Light';
  iconeTema.textContent = '☀️';
  console.log("Tema carregado do localStorage: light");
} else {
  console.log("Tema carregado do localStorage: dark (padrão)");
}

// Escuta o evento 'change' no checkbox do toggle
inputTema.addEventListener('change', function() {
  const modoLight = inputTema.checked;

  // Modifica o atributo data-tema no <html> — o CSS reage a isso
  htmlEl.setAttribute('data-tema', modoLight ? 'light' : 'dark');

  // Atualiza o texto e ícone visíveis
  labelTema.textContent = modoLight ? 'Light' : 'Dark';
  iconeTema.textContent = modoLight ? '☀️' : '🌙';

  // Salva a preferência no localStorage para persistir entre visitas
  localStorage.setItem('sf-tema', modoLight ? 'light' : 'dark');

  console.log("Tema alterado para:", modoLight ? 'light' : 'dark');
});


/* ================================================================
   3. NAVBAR — SOMBRA AO ROLAR
   Escuta o evento 'scroll' na janela.
   Adiciona/remove a classe .rolado na navbar conforme o scroll.
   O CSS usa essa classe para aplicar box-shadow.
   ================================================================ */
const nav = document.getElementById('nav-principal');

window.addEventListener('scroll', function() {
  // classList.toggle(classe, condição) — adiciona se true, remove se false
  nav.classList.toggle('rolado', window.scrollY > 20);
}, { passive: true }); // passive: true melhora a performance do scroll


/* ================================================================
   4. MENU HAMBÚRGUER (mobile)
   Escuta o clique no botão de 3 linhas.
   Alterna as classes .aberto no botão e na lista de links.
   ================================================================ */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', function() {
  // toggle retorna true se a classe foi ADICIONADA, false se removida
  const estaAberto = navToggle.classList.toggle('aberto');
  navLinks.classList.toggle('aberto');

  // Atualiza atributos de acessibilidade
  navToggle.setAttribute('aria-expanded', estaAberto);
  navToggle.setAttribute('aria-label', estaAberto ? 'Fechar menu' : 'Abrir menu');

  console.log("Menu mobile:", estaAberto ? 'aberto' : 'fechado');
});

// Fecha o menu ao clicar em qualquer link (em mobile)
navLinks.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    navToggle.classList.remove('aberto');
    navLinks.classList.remove('aberto');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  });
});


/* ================================================================
   5. TIMER MOCK DO HERO
   Simula um cronômetro regressivo no card de prévia do app.
   Usa setInterval para executar uma função a cada 1000ms (1 segundo).
   ================================================================ */
const timerMock = document.getElementById('timer-mock');

// Estado inicial do timer
let minutos  = 24;
let segundos = 37;

// setInterval executa a função repetidamente a cada X milissegundos
setInterval(function() {
  segundos--;

  // Quando os segundos chegam a 0, volta para 59 e decrementa os minutos
  if (segundos < 0) {
    segundos = 59;
    minutos--;
  }

  // Quando o timer chega a 0, reinicia
  if (minutos < 0) {
    minutos  = 24;
    segundos = 59;
  }

  // padStart(2, '0') garante sempre 2 dígitos — ex: "05" em vez de "5"
  timerMock.textContent =
    String(minutos).padStart(2, '0') + ':' + String(segundos).padStart(2, '0');

}, 1000); // 1000 milissegundos = 1 segundo