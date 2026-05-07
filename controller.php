<?php
// controller.php

require_once 'service.php';
require_once 'BusinessRuleException.php';

class EstudanteController {
    private StudyFlowService $service;

    public function __construct(StudyFlowService $service) {
        $this->service = $service;
    }

    public function store(array $dados): string {
        try {
            // Delegamos a tarefa para o Service
            $this->service->registrarEstudante($dados);
            
            // --- ALTERAÇÃO AQUI ---
            // Redireciona o usuário de volta para o site principal (porta 5500)
            header("Location: http://127.0.0.1:5500/cronograma.html");
            exit; // Importante para parar a execução do script após o redirecionamento
            // -----------------------
            
        } catch (BusinessRuleException $e) {
            return "⚠️ " . $e->getMessage();
            
        } catch (Exception $e) {
            return "❌ Erro inesperado no servidor.";
        }
    }
}