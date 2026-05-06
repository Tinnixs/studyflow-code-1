<?php
class Middleware {
    public static function sanitizar(array $input): array {
        if (empty($input['nome']) || empty($input['idade'])) {
            throw new Exception("Campos obrigatórios não preenchidos.");
        }
        return [
            'nome' => filter_var($input['nome'], FILTER_SANITIZE_SPECIAL_CHARS),
            'idade' => filter_var($input['idade'], FILTER_SANITIZE_NUMBER_INT),
            'objetivo' => filter_var($input['objetivo'], FILTER_SANITIZE_SPECIAL_CHARS)
        ];
    }
}