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
    const panel = document.getElementById(`step-${n}`);
    if (panel) panel.classList.add('ativo');

    // Atualiza os indicadores de progresso (dots)
    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
            dot.classList.remove('ativo', 'feito');
            if (i < n) dot.classList.add('feito');
            if (i === n) dot.classList.add('ativo');
        }
    }
}

// --- Lógica dos Anti-Padrões --- //

/**
 * STEP 1: Dia por Cliques (Anti-padrão: esforço excessivo)
 */
export function setupDiaPorCliques() {
    const clickCounter = document.getElementById('click-counter');
    const clickTarget = document.getElementById('click-target');
    const clickHint = document.getElementById('click-progress-hint');
    const diaEscolhidoDisplay = document.getElementById('dia-escolhido');
    const btnConfirmarDia = document.getElementById('btn-confirmar-dia');
    
    if (!clickTarget || !btnConfirmarDia) return;

    let cliques = 0;
    const EMOJIS = ['😡', '😤', '🤯', '😵‍💫', '🫠', '😩', '😫', '😠', '🤬', '💢'];

    clickTarget.addEventListener('click', () => {
        cliques = (cliques % 31) + 1;
        estado.dia = cliques;

        if (clickCounter) {
            clickCounter.textContent = String(cliques).padStart(2, '0');
            clickCounter.classList.add('bounce');
            setTimeout(() => clickCounter.classList.remove('bounce'), 150);
        }

        clickTarget.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

        if (clickHint) {
            const restante = cliques === 31 ? 0 : 31 - cliques;
            clickHint.innerHTML = cliques < 31
                ? `Você clicou <strong>${cliques}</strong> vezes. Faltam <strong>${restante}</strong> cliques para o dia 31.`
                : `Finalmente! Dia <strong>31</strong>. Se quiser outro dia, continue clicando.`;
        }

        if (diaEscolhidoDisplay) diaEscolhidoDisplay.textContent = String(cliques).padStart(2, '0');
    });

    clickTarget.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            clickTarget.click();
        }
    });

    btnConfirmarDia.addEventListener('click', () => irParaStep(2));
}

/**
 * STEP 2: Slider Misterioso + Botão Fugitivo
 */
export function setupSliderMisterioso() {
    const sliderMes = document.getElementById('slider-mes');
    const sliderValDisplay = document.getElementById('slider-val');
    const btnConfirmarMes = document.getElementById('btn-confirmar-mes');
    
    if (!sliderMes || !btnConfirmarMes) return;

    let mesSelecionado = 1;
    let fugas = 0;
    const MAX_FUGAS = 7;

    sliderMes.addEventListener('input', () => {
        if (sliderValDisplay) {
            sliderValDisplay.classList.add('borrado');
            sliderValDisplay.textContent = '???';
        }
    });

    const revelarValor = () => {
        mesSelecionado = parseInt(sliderMes.value);
        estado.mes = mesSelecionado;
        if (sliderValDisplay) {
            sliderValDisplay.classList.remove('borrado');
            sliderValDisplay.textContent = MESES[mesSelecionado - 1];
        }
    };

    sliderMes.addEventListener('change', revelarValor);
    sliderMes.addEventListener('mouseup', revelarValor);

    btnConfirmarMes.addEventListener('mouseover', () => {
        if (fugas >= MAX_FUGAS) return;

        const wrap = btnConfirmarMes.parentElement;
        const wrapRect = wrap.getBoundingClientRect();
        const btnRect = btnConfirmarMes.getBoundingClientRect();

        const newX = Math.random() * (wrapRect.width - btnRect.width);
        const newY = Math.random() * (wrapRect.height - btnRect.height);

        btnConfirmarMes.style.position = 'absolute';
        btnConfirmarMes.style.left = `${newX}px`;
        btnConfirmarMes.style.top = `${newY}px`;
        btnConfirmarMes.style.transform = 'none';

        fugas++;
    });

    btnConfirmarMes.addEventListener('click', () => {
        estado.mes = mesSelecionado || parseInt(sliderMes.value);
        irParaStep(3);
    });
}

/**
 * STEP 3: Teclado Sabotador
 */
export function setupTecladoSabotador() {
    const tecladoGrid = document.getElementById('teclado-grid');
    const anoDigitadoDisplay = document.getElementById('ano-digitado');
    const btnLimparAno = document.getElementById('btn-limpar-ano');
    
    if (!tecladoGrid || !anoDigitadoDisplay) return;

    let anoStr = '';

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

    function atualizarDisplayAno() {
        const display = anoStr.padEnd(4, '_').split('').join('');
        anoDigitadoDisplay.innerHTML = `${display}<span class="cursor"></span>`;
    }

    tecladoGrid.addEventListener('click', e => {
        const btn = e.target.closest('.tecla');
        if (!btn) return;

        if (btn.id === 'tecla-apagar') {
            anoStr = anoStr.slice(0, -1);
            atualizarDisplayAno();
            return;
        }

        if (anoStr.length >= 4) return;

        const numClicado = parseInt(btn.dataset.num);
        let numDigitado = numClicado;

        if (Math.random() < 0.60) {
            const desvio = Math.floor(Math.random() * 3) - 1;
            numDigitado = Math.min(9, Math.max(0, numClicado + desvio));
            if (numDigitado === numClicado) {
                numDigitado = (numClicado + (Math.random() < 0.5 ? 1 : -1) + 10) % 10;
            }
        }

        anoStr += String(numDigitado);
        atualizarDisplayAno();

        btn.style.background = numDigitado !== numClicado ? 'var(--red-glow)' : 'var(--green-glow)';
        btn.style.borderColor = numDigitado !== numClicado ? 'var(--red)' : 'var(--green)';
        setTimeout(() => {
            btn.style.background = '';
            btn.style.borderColor = '';
        }, 300);

        if (anoStr.length === 4) {
            estado.ano = anoStr;
            setTimeout(() => {
                irParaStep(4);
                mostrarResultado();
            }, 500);
        }
    });

    if (btnLimparAno) {
        btnLimparAno.addEventListener('click', () => {
            anoStr = '';
            atualizarDisplayAno();
        });
    }
}

/**
 * STEP 4: Resultado e Salvar
 */
export function mostrarResultado() {
    const dia = String(estado.dia).padStart(2, '0');
    const mes = String(estado.mes).padStart(2, '0');
    const ano = estado.ano || '????';
    const dataFormatada = `${dia}/${mes}/${ano}`;
    const nomeMes = MESES[(estado.mes || 1) - 1];

    const displayData = document.getElementById('resultado-data-display');
    const displayNome = document.getElementById('resultado-nome-display');
    
    if (displayData) displayData.textContent = dataFormatada;
    if (displayNome) displayNome.textContent = `${dia} de ${nomeMes} de ${ano}`;
}

export function setupSalvarDados() {
    const btnSalvar = document.getElementById('btn-salvar-indexeddb');
    if (!btnSalvar) return;

    btnSalvar.addEventListener('click', async () => {
        const dia = String(estado.dia).padStart(2, '0');
        const mes = String(estado.mes).padStart(2, '0');
        const ano = estado.ano || new Date().getFullYear();

        const objeto = {
            tipo: 'data-nascimento-caos',
            dia: parseInt(dia),
            mes: parseInt(mes),
            ano: parseInt(ano),
            dataFormatada: `${dia}/${mes}/${ano}`,
            salvoEm: new Date().toISOString()
        };

        try {
            await iniciarBanco();
            await adicionarItem(objeto);

            const banner = document.getElementById('salvo-banner');
            if (banner) banner.classList.add('visivel');
            
            btnSalvar.textContent = '✅ Salvo com Sucesso!';
            btnSalvar.disabled = true;
            btnSalvar.style.background = 'var(--green)';
        } catch (erro) {
            console.error('[UX Caos] Erro ao salvar:', erro);
            alert('Erro ao salvar os dados.');
        }
    });
}

