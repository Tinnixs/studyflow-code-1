<?php
class StudyFlowService {
    public function listaObjetivos(): array {
        return ["Vestibular", "Concursos", "Faculdade", "Autoaprendizado"];
    }

    public function validar(string $nome, int $idade, string $objetivo): array {
        if ($idade < 12) {
            throw new Exception("O StudyFlow é recomendado para maiores de 12 anos.");
        }

        return [
            'nome' => $nome,
            'idade' => $idade,
            'objetivo' => $objetivo,
            'mensagem' => "Bem-vindo ao StudyFlow, $nome! Seu plano de estudos foi criado."
        ];
    }
}