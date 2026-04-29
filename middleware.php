<?php
// middleware.php

class Middleware
{
    /**
     * Valida os dados antes de chegarem ao Controller.
     * Se algo estiver errado, o sistema para aqui e avisa o usuário.
     */
    public static function validar(array $dados): void
    {
        // 1. Verifica se os campos existem e não estão vazios
        if (empty($dados['nome']) || empty($dados['idade']) || empty($dados['objetivo'])) {
            die("❌ Erro: Por favor, preencha todos os campos do formulário.");
        }

        // 2. Verifica se o nome tem pelo menos 3 letras
        if (strlen($dados['nome']) < 3) {
            die("❌ Erro: O nome precisa ter pelo menos 3 caracteres.");
        }

        // 3. Verifica se a idade é realmente um número
        if (!is_numeric($dados['idade'])) {
            die("❌ Erro: O campo idade deve conter apenas números.");
        }

        // 4. Garante que a idade não seja negativa ou absurda
        $idade = (int)$dados['idade'];
        if ($idade <= 0 || $idade > 120) {
            die("❌ Erro: Por favor, insira uma idade válida.");
        }
    }
}