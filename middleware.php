<?php
// ============================================================
// StudyFlow | middleware.php — Camada de Segurança e Filtro
// ============================================================

class Middleware
{
    /**
     * Sanitiza e valida os dados antes de chegarem ao Controller.
     * Passo 5 do professor: Proteção contra XSS e campos vazios.
     */
    public static function sanitizar(array $input): array
    {
        // 1. Verificação de campos obrigatórios
        if (empty($input['nome']) || empty($input['idade']) || empty($input['objetivo'])) {
            throw new Exception("Por favor, preencha todos os campos do formulário.");
        }

        // 2. Validação de idade (regra básica de tipo)
        if (!is_numeric($input['idade'])) {
            throw new Exception("O campo idade deve conter apenas números.");
        }

        // 3. SANITIZAÇÃO (Passo 5 da demanda: Fim das tags maliciosas)
        // filter_var com FILTER_SANITIZE_SPECIAL_CHARS impede ataques XSS
        return [
            'nome'     => filter_var($input['nome'], FILTER_SANITIZE_SPECIAL_CHARS),
            'idade'    => (int) filter_var($input['idade'], FILTER_SANITIZE_NUMBER_INT),
            'objetivo' => filter_var($input['objetivo'], FILTER_SANITIZE_SPECIAL_CHARS)
        ];
    }
}