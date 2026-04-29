<?php
class EstudanteModel {
    private string $nome;
    private int $idade;
    private string $objetivo;
    private PDO $pdo;

    public function __construct() {
        $this->pdo = new PDO('sqlite:' . __DIR__ . '/database.sqlite');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function setDados($nome, $idade, $objetivo) {
        $this->nome = $nome;
        $this->idade = $idade;
        $this->objetivo = $objetivo;
    }

    public function salvar(): void {
        $stmt = $this->pdo->prepare("INSERT INTO estudantes (nome, idade, objetivo) VALUES (:nome, :idade, :obj)");
        $stmt->execute([
            ':nome' => $this->nome,
            ':idade' => $this->idade,
            ':obj' => $this->objetivo
        ]);
    }
}