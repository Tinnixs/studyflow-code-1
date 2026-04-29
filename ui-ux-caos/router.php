<?php
require_once 'controller.php';

class Router {
    public function handle() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $controller = new EstudanteController();
            $GLOBALS['mensagem_feedback'] = $controller->registrar($_POST);
        }
        require 'view.php';
    }
}