<?php
require_once 'middleware.php';

class Router {
    private EstudanteController $controller;

    public function __construct($controller) {
        $this->controller = $controller;
    }

    public function handle() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                $dadosLimpos = Middleware::sanitizar($_POST);
                $GLOBALS['mensagem_feedback'] = $this->controller->store($dadosLimpos);
            } catch (Exception $e) {
                $GLOBALS['mensagem_feedback'] = "❌ " . $e->getMessage();
            }
        }
        require 'view.php';
    }
}