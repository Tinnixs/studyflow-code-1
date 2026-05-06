<?php
require_once 'middleware.php';

class Router {
    private EstudanteController $controller;

    // O construtor recebe o controller montado (Injeção de Dependência)
    public function __construct(EstudanteController $controller) {
        $this->controller = $controller;
    }

    public function handle() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                // Chama o Middleware para sanitizar os dados
                $dadosLimpos = Middleware::sanitizar($_POST);
                
                // Passa os dados limpos para o Controller
                $GLOBALS['mensagem_feedback'] = $this->controller->store($dadosLimpos);
            } catch (Exception $e) {
                $GLOBALS['mensagem_feedback'] = "❌ " . $e->getMessage();
            }
        }
        require 'view.php';
    }
}