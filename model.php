<?php
// ============================================================
// StudyFlow | model.php — Camada de Dados
// ============================================================
// RESPONSABILIDADE ÚNICA: comunicação com a tabela 'estudantes'
// Conceitos: encapsulamento, getters/setters, Prepared Statements
// ============================================================

class EstudanteModel
{
    private string $nome;
    private int    $idade;
    private string $objetivo;
    private string $dbPath;

    public function __construct()
    {
        $this->dbPath = __DIR__ . '/database.sqlite';
    }

    // ── Getters ────────────────────────────────────────────
    public function getNome(): string    { return $this->nome;    }
    public function getIdade(): int      { return $this->idade;   }
    public function getObjetivo(): string{ return $this->objetivo;}

    // ── Setters ────────────────────────────────────────────
    public function setDados(string $nome, int $idade, string $objetivo): void
    {
        $this->nome     = trim($nome);
        $this->idade    = $idade;
        $this->objetivo = trim($objetivo);
    }

    // ── Conexão privada ────────────────────────────────────
    private function getConexao(): PDO
    {
        $pdo = new PDO('sqlite:' . $this->dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,            PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    }

    // ── save() — INSERT com Prepared Statement ─────────────
    public function salvar(): int
    {
        $pdo  = $this->getConexao();
        $stmt = $pdo->prepare(
            "INSERT INTO estudantes (nome, idade, objetivo)
             VALUES (:nome, :idade, :objetivo)"
        );
        $stmt->execute([
            ':nome'     => $this->nome,
            ':idade'    => $this->idade,
            ':objetivo' => $this->objetivo,
        ]);
        return (int) $pdo->lastInsertId();
    }

    // ── buscarTodos() — retorna todos os estudantes ─────────
    public static function buscarTodos(): array
    {
        try {
            $pdo  = new PDO('sqlite:' . __DIR__ . '/database.sqlite');
            $pdo->setAttribute(PDO::ATTR_ERRMODE,            PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $pdo->query(
                "SELECT * FROM estudantes ORDER BY criado_em DESC"
            )->fetchAll();
        } catch (PDOException $e) {
            return [];
        }
    }
}