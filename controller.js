// ============================================================
// StudyFlow | controller.js — Controlador Central
// ============================================================
// Versão revisada — Code Review Técnico
//
// MUDANÇAS vs versão anterior:
//   - Selectors específicos (não mais tentativa/erro com 3 IDs)
//   - Integrado ao design system real do StudyFlow
//   - Funções de sincronização entre localStorage ↔ IndexedDB
//   - Sem alert() — usa o sistema de toast do projeto
//   - Exporta tarefas do cronograma para o IndexedDB
// ============================================================

// ── Inicialização ───────────────────────────────────────────
// Roda quando o DOM estiver pronto em qualquer página
document.addEventListener('DOMContentLoaded', async function() {
  try {
    await iniciarBanco();

    // Detecta em qual página estamos e inicializa o que for necessário
    const pagina = detectarPagina();

    if (pagina === 'cronograma') {
      await sincronizarTarefasComIndexedDB();
    }

    if (pagina === 'perfil') {
      await sincronizarPerfilComIndexedDB();
    }

  } catch (erro) {
    // Falha silenciosa — o site funciona sem IndexedDB
    // (dados ficam só no localStorage como fallback)
    console.error('[StudyFlow] IndexedDB indisponível, usando localStorage:', erro.message);
  }
});

// ── Detecta a página atual pelo título ou URL ───────────────
function detectarPagina() {
  const url = window.location.pathname.toLowerCase();
  if (url.includes('cronograma')) return 'cronograma';
  if (url.includes('perfil'))     return 'perfil';
  if (url.includes('foco'))       return 'foco';
  if (url.includes('inscricao'))  return 'inscricao';
  return 'index';
}

// ── Sincroniza tarefas do localStorage → IndexedDB ─────────
// Garante que os dados do cronograma estejam persistidos no banco
async function sincronizarTarefasComIndexedDB() {
  try {
    const raw = localStorage.getItem('sf-tarefas');
    if (!raw) return;

    const tarefasLS  = JSON.parse(raw);
    const tarefasDB  = await buscarItens('tarefas');
    const idsNoDB    = new Set(tarefasDB.map(t => t.id));

    // Adiciona apenas as tarefas que ainda não estão no IndexedDB
    const novas = tarefasLS.filter(t => !idsNoDB.has(t.id));
    for (const tarefa of novas) {
      // Usa put em vez de add para evitar conflito de IDs
      await atualizarItem(tarefa, 'tarefas');
    }

  } catch (e) {
    console.error('[StudyFlow] Erro ao sincronizar tarefas:', e.message);
  }
}

// ── Sincroniza perfil do localStorage → IndexedDB ──────────
async function sincronizarPerfilComIndexedDB() {
  try {
    const raw = localStorage.getItem('sf-perfil');
    if (!raw) return;

    await atualizarItem(
      { chave: 'dados', valor: JSON.parse(raw), sincronizadoEm: new Date().toISOString() },
      'perfil'
    );
  } catch (e) {
    console.error('[StudyFlow] Erro ao sincronizar perfil:', e.message);
  }
}

// ── Salva uma tarefa do formulário (cronograma) ─────────────
// Chamada pelo cronograma.html ao submeter nova tarefa
async function salvarTarefaComIndexedDB(tarefa) {
  try {
    // 1. Salva no localStorage (fonte principal de verdade)
    const raw     = localStorage.getItem('sf-tarefas');
    const tarefas = raw ? JSON.parse(raw) : [];
    tarefas.push(tarefa);
    localStorage.setItem('sf-tarefas', JSON.stringify(tarefas));

    // 2. Replica no IndexedDB (persistência secundária)
    await adicionarItem(tarefa, 'tarefas');

    return true;
  } catch (e) {
    console.error('[StudyFlow] Erro ao salvar tarefa:', e.message);
    return false;
  }
}

// ── Salva sessão Pomodoro no IndexedDB ──────────────────────
// Chamada pelo foco.html ao concluir um pomodoro
async function salvarSessaoPomodoro(sessao) {
  try {
    await adicionarItem({
      ...sessao,
      data: new Date().toISOString().split('T')[0]
    }, 'sessoes');
  } catch (e) {
    console.error('[StudyFlow] Erro ao salvar sessão:', e.message);
  }
}

// ── Exporta dados completos (para backup/debug) ─────────────
async function exportarDados() {
  try {
    const [tarefas, sessoes] = await Promise.all([
      buscarItens('tarefas'),
      buscarItens('sessoes'),
    ]);
    return {
      tarefas,
      sessoes,
      exportadoEm: new Date().toISOString(),
      versao: '1.0'
    };
  } catch (e) {
    console.error('[StudyFlow] Erro ao exportar:', e.message);
    return null;
  }
}

console.log('[StudyFlow] controller.js carregado');