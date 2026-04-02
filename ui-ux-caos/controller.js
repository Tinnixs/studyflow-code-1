// controller.js - Lógica de controle para a UI/UX do Caos

import { iniciarBanco, adicionarItem } from './db.js';

// Variáveis de estado global para a data de nascimento
export const estado = { dia: 1, mes: 1, ano: '' };

// Nomes dos meses para exibição
export const MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// --- Funções Utilitárias --- //

/**
 * Atualiza a barra de progresso e exibe o painel do step atual.
 * @param {number} n O número do step a ser ativado.
 */
export function irParaStep(n) {
    document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('ativo'));
    document.getElementById(`step-${n}`).classList.add('ativo');

    // Atualiza os indicadores de progresso (dots)
    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        dot.classList.remove('ativo', 'feito');
        if (i < n) dot.classList.add('feito');
        if (i === n) dot.classList.add('ativo');
    }
}

// --- Lógica dos Anti-Padrões --- //

/**
 * STEP 1: Dia por Cliques (Anti-padrão: esforço excessivo)
 * O usuário deve clicar repetidamente para selecionar o dia.
 */
export function setupDiaPorCliques() {
    const clickCounter = document.getElementById('click-counter');
    const clickTarget = document.getElementById('click-target');
    const clickHint = document.getElementById('click-progress-hint');
    const diaEscolhidoDisplay = document.getElementById('dia-escolhido');
    const btnConfirmarDia = document.getElementById('btn-confirmar-dia');
    let cliques = 0;

    const EMOJIS = ['😡', '😤', '🤯', '😵‍💫', '🫠', '😩', '😫', '😠', '🤬', '💢']; // Emojis de frustração

    clickTarget.addEventListener('click', () => {
        cliques = (cliques % 31) + 1; // Limita a 31 dias
        estado.dia = cliques;

        // Animação e atualização do contador
        clickCounter.textContent = String(cliques).padStart(2, '0');
        clickCounter.classList.add('bounce');
        setTimeout(() => clickCounter.classList.remove('bounce'), 150);

        // Muda emoji aleatoriamente para aumentar a imprevisibilidade
        clickTarget.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

        // Atualiza a dica de progresso
        const restante = cliques === 31 ? 0 : 31 - cliques;
        clickHint.innerHTML = cliques < 31
            ? `Você clicou <strong>${cliques}</strong> vezes. Faltam <strong>${restante}</strong> cliques para o dia 31.`
            : `Finalmente! Dia <strong>31</strong>. Se quiser outro dia, continue clicando.`;

        diaEscolhidoDisplay.textContent = String(cliques).padStart(2, '0');
    });

    // Permite usar teclado (Enter/Space) para simular cliques
    clickTarget.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Evita scroll da página com espaço
            clickTarget.click();
        }
    });

    btnConfirmarDia.addEventListener('click', () => {
        irParaStep(2);
    });
}

/**
 * STEP 2: Slider Misterioso + Botão Fugitivo (Anti-padrão: falta de feedback, imprevisibilidade)
 * O slider esconde o valor e o botão de confirmação foge do mouse.
 */
export function setupSliderMisterioso() {
    const sliderMes = document.getElementById('slider-mes');
    const sliderValDisplay = document.getElementById('slider-val');
    const btnConfirmarMes = document.getElementById('btn-confirmar-mes');
    let mesSelecionado = 1;
    let fugas = 0; // Contador de vezes que o botão fugiu
    const MAX_FUGAS = 7; // Número máximo de vezes que o botão foge

    // Borra o valor enquanto o slider é arrastado
    sliderMes.addEventListener('input', () => {
        sliderValDisplay.classList.add('borrado');
        sliderValDisplay.textContent = '???';
    });

    // Revela o valor ao soltar o slider
    sliderMes.addEventListener('change', () => {
        mesSelecionado = parseInt(sliderMes.value);
        estado.mes = mesSelecionado;
        sliderValDisplay.classList.remove('borrado');
        sliderValDisplay.textContent = MESES[mesSelecionado - 1];
    });
    // Garante que o valor seja revelado também no mouseup (para compatibilidade)
    sliderMes.addEventListener('mouseup', () => {
        mesSelecionado = parseInt(sliderMes.value);
        estado.mes = mesSelecionado;
        sliderValDisplay.classList.remove('borrado');
        sliderValDisplay.textContent = MESES[mesSelecionado - 1];
    });

    // Lógica do botão que foge
    btnConfirmarMes.addEventListener('mouseover', () => {
        if (fugas >= MAX_FUGAS) return; // Para de fugir depois de X vezes

        const wrap = btnConfirmarMes.parentElement;
        const wrapRect = wrap.getBoundingClientRect();
        const btnRect = btnConfirmarMes.getBoundingClientRect();

        // Calcula novas posições aleatórias dentro do contêiner
        const newX = Math.random() * (wrapRect.width - btnRect.width);
        const newY = Math.random() * (wrapRect.height - btnRect.height);

        btnConfirmarMes.style.position = 'absolute';
        btnConfirmarMes.style.left = `${newX}px`;
        btnConfirmarMes.style.top = `${newY}px`;
        btnConfirmarMes.style.transform = 'none'; // Remove transform para evitar conflitos

        fugas++;
        console.log(`[UX Caos] Botão fugiu ${fugas} vezes.`);
    });

    btnConfirmarMes.addEventListener('click', () => {
        estado.mes = mesSelecionado || parseInt(sliderMes.value); // Garante que o mês seja capturado
        irParaStep(3);
    });
}

/**
 * STEP 3: Teclado Sabotador (Anti-padrão: controle imprevisível, feedback enganoso)
 * As teclas digitam números aleatórios próximos ao clicado.
 */
export function setupTecladoSabotador() {
    const tecladoGrid = document.getElementById('teclado-grid');
    const anoDigitadoDisplay = document.getElementById('ano-digitado');
    const btnLimparAno = document.getElementById('btn-limpar-ano');
    let anoStr = '';

    // Gera os botões do teclado (0-9 e um botão de apagar)
    const digitos = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    digitos.forEach(num => {
        const btn = document.createElement('button');
        btn.className = 'tecla';
        btn.textContent = num;
        btn.dataset.num = num;
        tecladoGrid.appendChild(btn);
    });
    const btnApagarTecla = document.createElement('button');
    btnApagarTecla.className = 'tecla apagar';
    btnApagarTecla.textContent = '⌫';
    btnApagarTecla.id = 'tecla-apagar';
    tecladoGrid.appendChild(btnApagarTecla);

    // Função para atualizar o display do ano
    function atualizarDisplayAno() {
        // Preenche com underscores e adiciona um cursor piscante
        const display = anoStr.padEnd(4, '_').split('').join('');
        anoDigitadoDisplay.innerHTML = `${display}<span class="cursor"></span>`;
    }

    // Lógica principal do teclado sabotador
    tecladoGrid.addEventListener('click', e => {
        const btn = e.target.closest('.tecla');
        if (!btn) return;

        if (btn.id === 'tecla-apagar') {
            anoStr = anoStr.slice(0, -1);
            atualizarDisplayAno();
            return;
        }

        if (anoStr.length >= 4) return; // Limita a 4 dígitos para o ano

        const numClicado = parseInt(btn.dataset.num);
        let numDigitado = numClicado;

        // 60% de chance de digitar um número diferente (anti-padrão)
        if (Math.random() < 0.60) {
            // Desvia o número em -1, 0 ou +1, garantindo que fique entre 0-9
            const desvio = Math.floor(Math.random() * 3) - 1; // -1, 0, ou +1
            numDigitado = Math.min(9, Math.max(0, numClicado + desvio));
            // Se o desvio resultou no mesmo número, força uma diferença (ex: +1 ou -1)
            if (numDigitado === numClicado) {
                numDigitado = (numClicado + (Math.random() < 0.5 ? 1 : -1) + 10) % 10;
            }
        }

        anoStr += String(numDigitado);
        atualizarDisplayAno();

        // Feedback visual (verde para 
