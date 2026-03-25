// ============================================
// controller.js - Controlador do StudyFlow
// ============================================

// Inicia o banco quando a página carregar
document.addEventListener('DOMContentLoaded', async function() {
    try {
        await iniciarBanco();
        console.log('[Controller] Banco iniciado com sucesso!');
        
        // Carrega e exibe as tarefas existentes
        await listarTarefasNaTela();
        
        // Configura o listener do formulário
        configurarFormulario();
        
    } catch (erro) {
        console.error('[Controller] Erro ao iniciar:', erro);
    }
});

/**
 * Configura o evento de submit do formulário
 */
function configurarFormulario() {
    // Busca o formulário de adicionar tarefa
    // Ajuste o seletor conforme o ID ou classe do seu formulário
    const formulario = document.querySelector('#form-tarefa') || 
                       document.querySelector('.task-form') ||
                       document.querySelector('form');
    
    if (formulario) {
        formulario.addEventListener('submit', async function(event) {
            event.preventDefault(); // Impede o reload da página
            
            // Captura os dados do formulário
            // Ajuste os seletores conforme os IDs dos seus inputs
            const nome = document.querySelector('#nome-tarefa')?.value || 
                        document.querySelector('#task-name')?.value ||
                        document.querySelector('input[name="nome"]')?.value || '';
            
            const data = document.querySelector('#data-tarefa')?.value || 
                        document.querySelector('#task-date')?.value ||
                        document.querySelector('input[name="data"]')?.value || '';
            
            const categoria = document.querySelector('#categoria-tarefa')?.value || 
                             document.querySelector('#task-category')?.value ||
                             document.querySelector('select[name="categoria"]')?.value || 'geral';
            
            const urgencia = document.querySelector('#urgencia-tarefa')?.value || 
                            document.querySelector('#task-urgency')?.value ||
                            document.querySelector('input[name="urgencia"]')?.value || 5;
            
            const complexidade = document.querySelector('#complexidade-tarefa')?.value || 
                                document.querySelector('#task-complexity')?.value ||
                                document.querySelector('input[name="complexidade"]')?.value || 5;
            
            // Calcula prioridade usando fórmula P = U × C
            const prioridade = Number(urgencia) * Number(complexidade);
            
            // Monta o objeto da tarefa
            const tarefa = {
                nome: nome,
                data: data,
                categoria: categoria,
                urgencia: Number(urgencia),
                complexidade: Number(complexidade),
                prioridade: prioridade,
                concluida: false
            };
            
            try {
                // Salva no banco
                await adicionarItem(tarefa);
                
                // Limpa o formulário
                formulario.reset();
                
                // Atualiza a lista na tela
                await listarTarefasNaTela();
                
                // Feedback visual (opcional)
                alert('Tarefa adicionada com sucesso!');
                
            } catch (erro) {
                console.error('[Controller] Erro ao salvar tarefa:', erro);
                alert('Erro ao salvar tarefa. Veja o console.');
            }
        });
        
        console.log('[Controller] Formulário configurado!');
    } else {
        console.warn('[Controller] Formulário não encontrado. Verifique o seletor.');
    }
}

/**
 * Lista todas as tarefas na tela
 */
async function listarTarefasNaTela() {
    try {
        const tarefas = await buscarItens();
        
        // Ordena por prioridade (maior primeiro)
        tarefas.sort((a, b) => b.prioridade - a.prioridade);
        
        // Busca o container onde as tarefas serão exibidas
        // Ajuste o seletor conforme seu HTML
        const container = document.querySelector('#lista-tarefas') || 
                         document.querySelector('.task-list') ||
                         document.querySelector('.tasks-container');
        
        if (container) {
            // Limpa o container
            container.innerHTML = '';
            
            if (tarefas.length === 0) {
                container.innerHTML = '<p class="empty-message">Nenhuma tarefa cadastrada ainda.</p>';
                return;
            }
            
            // Renderiza cada tarefa
            tarefas.forEach(tarefa => {
                const tarefaHTML = criarCardTarefa(tarefa);
                container.innerHTML += tarefaHTML;
            });
            
            // Adiciona eventos aos botões de deletar
            configurarBotoesDeletar();
            
            // Adiciona eventos aos botões de concluir
            configurarBotoesConcluir();
            
            console.log('[Controller] Lista atualizada com', tarefas.length, 'tarefas');
        } else {
            console.warn('[Controller] Container de tarefas não encontrado.');
            // Exibe no console para debug
            console.table(tarefas);
        }
        
    } catch (erro) {
        console.error('[Controller] Erro ao listar tarefas:', erro);
    }
}

/**
 * Cria o HTML de um card de tarefa
 */
function criarCardTarefa(tarefa) {
    const classeStatus = tarefa.concluida ? 'task-done' : '';
    const classePrioridade = tarefa.prioridade >= 50 ? 'high-priority' : 
                            tarefa.prioridade >= 25 ? 'medium-priority' : 'low-priority';
    
    return `
        <div class="task-card ${classeStatus} ${classePrioridade}" data-id="${tarefa.id}">
            <div class="task-header">
                <h3 class="task-name">${tarefa.nome}</h3>
                <span class="task-priority">P: ${tarefa.prioridade}</span>
            </div>
            <div class="task-details">
                <span class="task-date">Data: ${tarefa.data || 'Sem data'}</span>
                <span class="task-category">Categoria: ${tarefa.categoria}</span>
            </div>
            <div class="task-metrics">
                <span>Urgência: ${tarefa.urgencia}/10</span>
                <span>Complexidade: ${tarefa.complexidade}/10</span>
            </div>
            <div class="task-actions">
                <button class="btn-concluir" data-id="${tarefa.id}">
                    ${tarefa.concluida ? 'Reabrir' : 'Concluir'}
                </button>
                <button class="btn-deletar" data-id="${tarefa.id}">Deletar</button>
            </div>
        </div>
    `;
}

/**
 * Configura os botões de deletar
 */
function configurarBotoesDeletar() {
    const botoes = document.querySelectorAll('.btn-deletar');
    
    botoes.forEach(botao => {
        botao.addEventListener('click', async function() {
            const id = Number(this.getAttribute('data-id'));
            
            if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
                try {
                    await deletarItem(id);
                    await listarTarefasNaTela();
                } catch (erro) {
                    console.error('[Controller] Erro ao deletar:', erro);
                }
            }
        });
    });
}

/**
 * Configura os botões de concluir
 */
function configurarBotoesConcluir() {
    const botoes = document.querySelectorAll('.btn-concluir');
    
    botoes.forEach(botao => {
        botao.addEventListener('click', async function() {
            const id = Number(this.getAttribute('data-id'));
            
            try {
                const tarefa = await buscarItemPorId(id);
                tarefa.concluida = !tarefa.concluida;
                await atualizarItem(tarefa);
                await listarTarefasNaTela();
            } catch (erro) {
                console.error('[Controller] Erro ao atualizar status:', erro);
            }
        });
    });
}

console.log('[Controller] controller.js carregado!');