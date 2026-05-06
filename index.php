<?php
require_once 'EstudanteRepository.php';
require_once 'service.php';
require_once 'controller.php';
require_once 'router.php';

// Montagem manual das dependências
$repository = new EstudanteRepository();
$service    = new StudyFlowService($repository);
$controller = new EstudanteController($service);

// Injetamos o controller no router
$router = new Router($controller);
$router->handle();