<?php
require_once 'app/model/EstudanteRepository.php';
require_once 'app/services/StudyFlowService.php';
require_once 'app/controller/EstudanteController.php';
require_once 'app/router/Router.php';

// Aqui criamos as dependências "de baixo para cima" (Passo 5)
$repository = new EstudanteRepository();
$service    = new StudyFlowService($repository); // Injetamos o repositório no service
$controller = new EstudanteController($service);  // Injetamos o service no controller

// Passamos o controlador pronto para o Router
$router = new Router($controller);
$router->handle();