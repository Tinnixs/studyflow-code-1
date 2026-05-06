<?php
class EstudanteController {
    private StudyFlowService $service;

    public function __construct(StudyFlowService $service) {
        $this->service = $service;
    }

    public function store(array $dados): string {
        try {
            $this->service->registrarEstudante($dados);
            return "✅ Perfil criado com sucesso!";
        } catch (BusinessRuleException $e) {
            return "⚠️ " . $e->getMessage();
        } catch (Exception $e) {
            return "❌ Erro inesperado no servidor.";
        }
    }
}