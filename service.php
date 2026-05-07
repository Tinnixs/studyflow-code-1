<?php
// service.php

require_once 'BusinessRuleException.php';
require_once 'model.php'; // IMPORTANTE: Faltava o model para criar o objeto EstudanteModel

class StudyFlowService {
    private IEstudanteRepository $repository;

    // Recebe a interface (Contrato), cumprindo o Passo 2 e 3 do professor
    public function __construct(IEstudanteRepository $repository) {
        $this->repository = $repository;
    }

    public function listaObjetivos(): array {
        return ["Vestibular", "Concursos", "Faculdade", "Autoaprendizado"];
    }

    public function registrarEstudante(array $dados): void {
        // Regra de Negócio (Passo 4 do professor)
        if ($dados['idade'] < 12) {
            throw new BusinessRuleException("O StudyFlow exige idade mínima de 12 anos.");
        }

        // Transforma o array vindo do formulário em um Objeto Model
        $estudante = new EstudanteModel(
            $dados['nome'], 
            (int)$dados['idade'], 
            $dados['objetivo']
        );

        // Salva através do repositório (não importa se é SQLite ou MySQL)
        $this->repository->save($estudante);
    }
}