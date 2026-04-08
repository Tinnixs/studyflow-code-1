import { iniciarBanco, adicionarItem } from './db.js';

export const estado = { dia: 1, mes: 1, ano: '' };
export const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

export function irParaStep(n) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('ativo'));
    const stepEl = document.getElementById(`step-${n}`);
    if (stepEl) stepEl.classList.add('ativo');

    document.getElementById('step-number').textContent = n;
}

// Hit counter irritante
function hitCounterIrritante() {
    let count = 1337;
    const el = document.getElementById('hit-counter');
    setInterval(() => {
        count += Math.floor(Math.random() * 7) + 1;
        el.textContent = String(count).padStart(8, '0');
    }, 1800);
}

// STEP 1
export function setupDiaPorCliques() {
    const counter = document.getElementById('click-counter');
    const target = document.getElementById('click-target');
    const btn = document.getElementById('btn-confirmar-dia');

    target.addEventListener('click', () => {
        estado.dia = Math.min(31, estado.dia + (Math.random() < 0.25 ? -1 : 1));
        if (estado.dia < 1) estado.dia = 1;
        counter.textContent = String(estado.dia).padStart(2, '0');
    });

    btn.addEventListener('click', () => irParaStep(2));
}

// STEP 2 - Slider + botão fugitivo
export function setupSliderMisterioso() {
    const slider = document.getElementById('slider-mes');
    const val = document.getElementById('slider-val');
    const btn = document.getElementById('btn-confirmar-mes');

    let bx = 180, by = 160;

    btn.style.left = bx + 'px';
    btn.style.top = by + 'px';

    slider.addEventListener('input', () => {
        val.textContent = '???';
    });

    slider.addEventListener('change', () => {
        estado.mes = parseInt(slider.value);
        val.textContent = MESES[estado.mes - 1];
    });

    // Botão foge quando mouse chega perto
    document.addEventListener('mousemove', e => {
        if (!document.getElementById('step-2').classList.contains('ativo')) return;
        const dx = e.clientX - (bx + 70);
        const dy = e.clientY - (by + 25);
        if (Math.hypot(dx, dy) < 150) {
            bx += dx * -0.75;
            by += dy * -0.75;
            btn.style.left = Math.max(20, Math.min(400, bx)) + 'px';
            btn.style.top = Math.max(100, Math.min(300, by)) + 'px';
        }
    });

    btn.addEventListener('click', () => irParaStep(3));
}

// STEP 3 - Teclado
export function setupTecladoSabotador() {
    const grid = document.getElementById('teclado-grid');
    const display = document.getElementById('keyboard-display');
    let anoAtual = '';

    grid.innerHTML = '';
    const nums = [1,2,3,4,5,6,7,8,9,0];

    nums.forEach(n => {
        const tecla = document.createElement('div');
        tecla.className = 'tecla';
        tecla.textContent = n;
        tecla.addEventListener('click', () => {
            if (anoAtual.length >= 4) return;
            let digitado = n;
            if (Math.random() < 0.55) {
                digitado = (n + (Math.random() < 0.5 ? 1 : -1) + 10) % 10;
            }
            anoAtual += digitado;
            display.textContent = anoAtual.padEnd(4, '_');

            if (anoAtual.length === 4) {
                estado.ano = anoAtual;
                setTimeout(() => {
                    irParaStep(4);
                    mostrarResultado();
                }, 400);
            }
        });
        grid.appendChild(tecla);
    });

    const apagar = document.createElement('div');
    apagar.className = 'tecla apagar';
    apagar.textContent = 'APAGAR';
    apagar.addEventListener('click', () => {
        anoAtual = '';
        display.textContent = '____';
    });
    grid.appendChild(apagar);

    document.getElementById('btn-limpar-ano').addEventListener('click', () => {
        anoAtual = '';
        display.textContent = '____';
    });
}

export function mostrarResultado() {
    const d = String(estado.dia).padStart(2, '0');
    const m = String(estado.mes).padStart(2, '0');
    const a = estado.ano || '????';
    document.getElementById('resultado-data-display').textContent = `${d}/${m}/${a}`;
}

export function setupSalvarDados() {
    const btn = document.getElementById('btn-salvar-indexeddb');
    const banner = document.getElementById('salvo-banner');

    btn.addEventListener('click', async () => {
        const data = {
            tipo: 'data-nascimento-caos',
            dia: estado.dia,
            mes: estado.mes,
            ano: parseInt(estado.ano) || new Date().getFullYear(),
            dataFormatada: `${String(estado.dia).padStart(2,'0')}/${String(estado.mes).padStart(2,'0')}/${estado.ano || '????'}`,
            salvoEm: new Date().toISOString()
        };

        try {
            await adicionarItem(data);
            banner.style.display = 'block';
            btn.textContent = 'SALVO!!! (talvez)';
            btn.disabled = true;
        } catch (e) {
            alert('ERRO AO SALVAR... tente de novo!');
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    irParaStep(1);
    setupDiaPorCliques();
    setupSliderMisterioso();
    setupTecladoSabotador();
    setupSalvarDados();
    hitCounterIrritante();
});