// ============================================
// db.js - Mini Framework IndexedDB para o StudyFlow
// ============================================

// Configuração do banco
const DB_NAME = 'StudyFlowDB';
const DB_VERSION = 1;
const STORE_NAME = 'tarefas';

let db = null;

/**
 * Inicia a conexão com o banco IndexedDB
 * Cria a estrutura (object store) se não existir
 * @returns {Promise} - Retorna o banco conectado
 */
function iniciarBanco() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // Executa quando o banco é criado ou atualizado
        request.onupgradeneeded = function(event) {
            const database = event.target.result;
            
            // Cria a tabela "tarefas" se não existir
            if (!database.objectStoreNames.contains(STORE_NAME)) {
                const store = database.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true
                });
                
                // Índices para busca rápida
                store.createIndex('nome', 'nome', { unique: false });
                store.createIndex('categoria', 'categoria', { unique: false });
                store.createIndex('data', 'data', { unique: false });
                store.createIndex('prioridade', 'prioridade', { unique: false });
                
                console.log('[StudyFlow] Banco de dados criado com sucesso!');
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            console.log('[StudyFlow] Conexão com o banco estabelecida!');
            resolve(db);
        };

        request.onerror = function(event) {
            console.error('[StudyFlow] Erro ao abrir o banco:', event.target.error);
            reject(event.target.error);
        };
    });
}

/**
 * Adiciona uma nova tarefa ao banco
 * @param {Object} tarefa - Objeto com os dados da tarefa
 * @returns {Promise} - Retorna o ID da tarefa adicionada
 */
function adicionarItem(tarefa) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject('Banco não inicializado. Chame iniciarBanco() primeiro.');
            return;
        }

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        // Adiciona timestamp de criação
        tarefa.criadoEm = new Date().toISOString();
        
        const request = store.add(tarefa);

        request.onsuccess = function(event) {
            console.log('[StudyFlow] Tarefa adicionada com ID:', event.target.result);
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            console.error('[StudyFlow] Erro ao adicionar tarefa:', event.target.error);
            reject(event.target.error);
        };
    });
}

/**
 * Busca todas as tarefas do banco
 * @returns {Promise} - Retorna um array com todas as tarefas
 */
function buscarItens() {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject('Banco não inicializado. Chame iniciarBanco() primeiro.');
            return;
        }

        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = function(event) {
            console.log('[StudyFlow] Tarefas encontradas:', event.target.result.length);
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            console.error('[StudyFlow] Erro ao buscar tarefas:', event.target.error);
            reject(event.target.error);
        };
    });
}

/**
 * Busca uma tarefa específica pelo ID
 * @param {Number} id - ID da tarefa
 * @returns {Promise} - Retorna a tarefa encontrada
 */
function buscarItemPorId(id) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject('Banco não inicializado. Chame iniciarBanco() primeiro.');
            return;
        }

        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            console.error('[StudyFlow] Erro ao buscar tarefa:', event.target.error);
            reject(event.target.error);
        };
    });
}

/**
 * Atualiza uma tarefa existente
 * @param {Object} tarefa - Objeto com os dados atualizados (deve conter id)
 * @returns {Promise} - Retorna o ID da tarefa atualizada
 */
function atualizarItem(tarefa) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject('Banco não inicializado. Chame iniciarBanco() primeiro.');
            return;
        }

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        tarefa.atualizadoEm = new Date().toISOString();
        
        const request = store.put(tarefa);

        request.onsuccess = function(event) {
            console.log('[StudyFlow] Tarefa atualizada com ID:', event.target.result);
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            console.error('[StudyFlow] Erro ao atualizar tarefa:', event.target.error);
            reject(event.target.error);
        };
    });
}

/**
 * Deleta uma tarefa pelo ID
 * @param {Number} id - ID da tarefa a ser deletada
 * @returns {Promise} - Confirma a exclusão
 */
function deletarItem(id) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject('Banco não inicializado. Chame iniciarBanco() primeiro.');
            return;
        }

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = function() {
            console.log('[StudyFlow] Tarefa deletada com ID:', id);
            resolve(true);
        };

        request.onerror = function(event) {
            console.error('[StudyFlow] Erro ao deletar tarefa:', event.target.error);
            reject(event.target.error);
        };
    });
}

/**
 * Limpa todas as tarefas do banco
 * @returns {Promise} - Confirma a limpeza
 */
function limparBanco() {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject('Banco não inicializado. Chame iniciarBanco() primeiro.');
            return;
        }

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = function() {
            console.log('[StudyFlow] Banco limpo com sucesso!');
            resolve(true);
        };

        request.onerror = function(event) {
            console.error('[StudyFlow] Erro ao limpar banco:', event.target.error);
            reject(event.target.error);
        };
    });
}

console.log('[StudyFlow] db.js carregado! Funções disponíveis: iniciarBanco(), adicionarItem(), buscarItens(), buscarItemPorId(), atualizarItem(), deletarItem(), limparBanco()');