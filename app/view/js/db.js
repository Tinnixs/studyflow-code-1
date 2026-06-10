// ============================================================
// StudyFlow | db.js — Camada de Persistência (IndexedDB)
// ============================================================
// Versão revisada — Code Review Técnico
//
// MUDANÇAS vs versão anterior:
//   - Banco singleton com verificação de estado
//   - Stores separados por domínio (tarefas, perfil, sessoes)
//   - Erros tipados com mensagens claras
//   - API consistente: todas as funções retornam Promise
//   - Sem console.log em produção (apenas console.error)
// ============================================================

const SF_DB_NAME    = 'StudyFlowDB';
const SF_DB_VERSION = 2; // bump de versão para nova estrutura

let _db = null; // instância singleton

// ── Obtém o banco (inicializa se necessário) ────────────────
// Padrão: lazy initialization — só abre quando precisa
function getDB() {
  if (_db) return Promise.resolve(_db);
  return iniciarBanco();
}

// ── Inicializa o banco e cria os object stores ──────────────
function iniciarBanco() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(SF_DB_NAME, SF_DB_VERSION);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;

      // Store: tarefas (cronograma)
      if (!db.objectStoreNames.contains('tarefas')) {
        const tarefas = db.createObjectStore('tarefas', {
          keyPath: 'id', autoIncrement: true
        });
        tarefas.createIndex('data',      'data',      { unique: false });
        tarefas.createIndex('materia',   'materia',   { unique: false });
        tarefas.createIndex('prioridade','prioridade',{ unique: false });
        tarefas.createIndex('feita',     'feita',     { unique: false });
      }

      // Store: sessoes (histórico de Pomodoro)
      if (!db.objectStoreNames.contains('sessoes')) {
        const sessoes = db.createObjectStore('sessoes', {
          keyPath: 'id', autoIncrement: true
        });
        sessoes.createIndex('data', 'data', { unique: false });
        sessoes.createIndex('modo', 'modo', { unique: false });
      }

      // Store: perfil (dados do usuário)
      if (!db.objectStoreNames.contains('perfil')) {
        db.createObjectStore('perfil', { keyPath: 'chave' });
      }
    };

    request.onsuccess = function(event) {
      _db = event.target.result;

      // Reconecta automaticamente se a conexão for fechada
      _db.onversionchange = () => { _db.close(); _db = null; };

      resolve(_db);
    };

    request.onerror = function(event) {
      console.error('[StudyFlow DB] Erro ao abrir banco:', event.target.error);
      reject(new Error(`IndexedDB não disponível: ${event.target.error?.message}`));
    };

    request.onblocked = function() {
      console.error('[StudyFlow DB] Banco bloqueado — feche outras abas do StudyFlow');
      reject(new Error('Banco bloqueado por outra aba'));
    };
  });
}

// ── CRUD genérico ───────────────────────────────────────────
// store: nome do object store ('tarefas', 'sessoes', 'perfil')

function adicionarItem(item, store = 'tarefas') {
  return getDB().then(db => new Promise((resolve, reject) => {
    const tx  = db.transaction([store], 'readwrite');
    const req = tx.objectStore(store).add({
      ...item,
      criadoEm: item.criadoEm || new Date().toISOString()
    });
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(new Error(`Erro ao adicionar: ${e.target.error?.message}`));
  }));
}

function buscarItens(store = 'tarefas') {
  return getDB().then(db => new Promise((resolve, reject) => {
    const tx  = db.transaction([store], 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(new Error(`Erro ao buscar: ${e.target.error?.message}`));
  }));
}

function buscarItemPorId(id, store = 'tarefas') {
  return getDB().then(db => new Promise((resolve, reject) => {
    const tx  = db.transaction([store], 'readonly');
    const req = tx.objectStore(store).get(id);
    req.onsuccess = e => resolve(e.target.result ?? null);
    req.onerror   = e => reject(new Error(`Erro ao buscar por id: ${e.target.error?.message}`));
  }));
}

function atualizarItem(item, store = 'tarefas') {
  return getDB().then(db => new Promise((resolve, reject) => {
    const tx  = db.transaction([store], 'readwrite');
    const req = tx.objectStore(store).put({
      ...item,
      atualizadoEm: new Date().toISOString()
    });
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(new Error(`Erro ao atualizar: ${e.target.error?.message}`));
  }));
}

function deletarItem(id, store = 'tarefas') {
  return getDB().then(db => new Promise((resolve, reject) => {
    const tx  = db.transaction([store], 'readwrite');
    const req = tx.objectStore(store).delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror   = e => reject(new Error(`Erro ao deletar: ${e.target.error?.message}`));
  }));
}

function limparStore(store = 'tarefas') {
  return getDB().then(db => new Promise((resolve, reject) => {
    const tx  = db.transaction([store], 'readwrite');
    const req = tx.objectStore(store).clear();
    req.onsuccess = () => resolve(true);
    req.onerror   = e => reject(new Error(`Erro ao limpar: ${e.target.error?.message}`));
  }));
}

// ── Busca por índice ────────────────────────────────────────
function buscarPorIndice(store, indice, valor) {
  return getDB().then(db => new Promise((resolve, reject) => {
    const tx  = db.transaction([store], 'readonly');
    const idx = tx.objectStore(store).index(indice);
    const req = idx.getAll(valor);
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(new Error(`Erro ao buscar por índice: ${e.target.error?.message}`));
  }));
}

// Alias retrocompatível — não quebra código existente
const limparBanco = () => limparStore('tarefas');