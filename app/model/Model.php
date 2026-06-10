<?php
// model.php - Agora é apenas uma ENTIDADE (Entity)
class EstudanteModel {
    public ?int $id;
    public string $nome;
    public int $idade;
    public string $objetivo;

    public function __construct(string $nome, int $idade, string $objetivo, ?int $id = null) {
        $this->id = $id;
        $this->nome = $nome;
        $this->idade = $idade;
        $this->objetivo = $objetivo;
    }
}