<?php
// ============================================================
// StudyFlow | migration.php
// ============================================================
// COMO RODAR (uma única vez): php migration.php
// ============================================================

class Migration
{
    private string $dbPath;
    private PDO $pdo;

    public function __construct()
    {
        $this->dbPath = __DIR__ . '/database.sqlite';
    }

    private function conectar(): void
    {
        $this->pdo = new PDO('sqlite:' . $this->dbPath);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->exec('PRAGMA foreign_keys = ON');
        echo "[Migration] ✅ Conectado: {$this->dbPath}" . PHP_EOL;
    }

    private function criarTabelaEstudantes(): void
    {
        // Campo 'objetivo' — mantém consistência com service/model/controller
        $this->pdo->exec("
            CREATE TABLE IF NOT EXISTS estudantes (
                id        INTEGER  PRIMARY KEY AUTOINCREMENT,
                nome      TEXT     NOT NULL,
                idade     INTEGER  NOT NULL,
                objetivo  TEXT     NOT NULL,
                criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ");
        echo "[Migration] ✅ Tabela 'estudantes' criada (ou já existia)." . PHP_EOL;
    }

    public function executar(): void
    {
        echo PHP_EOL . "=== StudyFlow | Migration ===" . PHP_EOL;
        $this->conectar();
        $this->criarTabelaEstudantes();
        echo PHP_EOL . "[Migration] 🎓 Banco pronto!" . PHP_EOL;
        echo "[Migration] Arquivo: {$this->dbPath}" . PHP_EOL . PHP_EOL;
    }
}

$migration = new Migration();
$migration->executar();