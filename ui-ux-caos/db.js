// db.js - Mini-framework para IndexedDB

const DB_NAME = 'StudyFlowDB';
const DB_VERSION = 1; // Incrementa a versão se mudar a estrutura do banco
const STORE_NAME = 'tarefas'; // Nome do Object Store para armazenar os dados

let db = null;

/**
 * Inicializa o banco de dados IndexedDB.
 * Cria o Object Store 'tarefas' se ele não existir.
 * @returns {Promise<IDBDatabase>} Uma promessa que resolve com a instância do banco de dados.
 */
export function iniciarBanco() {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const dbInstance = event.target.result;
            if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
                dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                console.log(`[IndexedDB] Object Store '${STORE_NAME}' criado.`);
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            console.log('[IndexedDB] Banco de dados aberto com sucesso.');
            resolve(db);
        };

        request.onerror = (event) => {
            console.error('[IndexedDB] Erro ao abrir o banco de dados:', event.target.error);
            reject(event.target.error);
        };
    });
}

/**
 * Adiciona um novo item ao Object Store 'tarefas'.
 * @param {Object} item O objeto a ser adicionado. Deve ser serializável.
 * @returns {Promise<number>} Uma promessa que resolve com a chave (id) do item adicionado.
 */
export function adicionarItem(item) {
    return new Promise(async (resolve, reject) => {
        try {
            const dbInstance = await iniciarBanco();
            const transaction = dbInstance.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(item);

            request.onsuccess = (event) => {
                console.log('[IndexedDB] Item adicionado com sucesso:', item);
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                console.error('[IndexedDB] Erro ao adicionar item:', event.target.error);
                reject(event.target.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Obtém todos os itens do Object Store 'tarefas'.
 * @returns {Promise<Array<Object>>} Uma promessa que resolve com um array de todos os itens.
 */
export function obterTodosItens() {
    return new Promise(async (resolve, reject) => {
        try {
            const dbInstance = await iniciarBanco();
            const transaction = dbInstance.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = (event) => {
                console.log('[IndexedDB] Itens obtidos com sucesso.');
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                console.error('[IndexedDB] Erro ao obter itens:', event.target.error);
                reject(event.target.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Limpa todos os itens do Object Store 'tarefas'.
 * @returns {Promise<void>} Uma promessa que resolve quando a limpeza for concluída.
 */
export function limparStore() {
    return new Promise(async (resolve, reject) => {
        try {
            const dbInstance = await iniciarBanco();
            const transaction = dbInstance.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.clear();

            request.onsuccess = () => {
                console.log('[IndexedDB] Object Store limpo com sucesso.');
                resolve();
            };

            request.onerror = (event) => {
                console.error('[IndexedDB] Erro ao limpar Object Store:', event.target.error);
                reject(event.target.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}