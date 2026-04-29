<?php
require_once 'service.php';
require_once 'model.php';

class EstudanteController {
    public function registrar(array $dados): string {
        try {
            $service = new StudyFlowService();
            $validado = $service->validar($dados['nome'], (int)$dados['idade'], $dados['objetivo']);

            $model = new EstudanteModel();
            $model->setDados($validado['nome'], $validado['idade'], $validado['objetivo']);
            $model->salvar();

            return "✅ " . $validado['mensagem'];
        } catch (Exception $e) {
            return "❌ " . $e->getMessage();
        }
    }
}