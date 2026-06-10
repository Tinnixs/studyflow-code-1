<?php
// EstudanteController.php

require_once __DIR__ . '/../services/StudyFlowService.php';
require_once __DIR__ . '/../model/BusinessRuleException.php';

class EstudanteController {
    private StudyFlowService $service;

    public function __construct(StudyFlowService $service) {
        $this->service = $service;
    }

    public function store(array $dados): string {
        try {
            // Delegamos a tarefa para o Service
            $this->service->registrarEstudante($dados);
            
            // Redireciona o usuário para o cronograma
            header("Location: /app/view/html/cronograma.html");
            exit; // Importante para parar a execução do script após o redirecionamento
            
        } catch (BusinessRuleException $e) {
            return "⚠️ " . $e->getMessage();
            
        } catch (Exception $e) {
            return "❌ Erro inesperado no servidor.";
        }
    }
}