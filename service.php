<?php
require_once 'BusinessRuleException.php';

class StudyFlowService {
    private IEstudanteRepository $repository;

    public function __construct(IEstudanteRepository $repository) {
        $this->repository = $repository;
    }

    public function listaObjetivos(): array {
        return ["Vestibular", "Concursos", "Faculdade", "Autoaprendizado"];
    }

    public function registrarEstudante(array $dados): void {
        if ($dados['idade'] < 12) {
            throw new BusinessRuleException("O StudyFlow exige idade mínima de 12 anos.");
        }
        $estudante = new EstudanteModel($dados['nome'], (int)$dados['idade'], $dados['objetivo']);
        $this->repository->save($estudante);
    }
}