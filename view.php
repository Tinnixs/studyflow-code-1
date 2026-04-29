<?php
require_once 'service.php';
$service = new StudyFlowService();
$objetivos = $service->listaObjetivos();
$msg = $GLOBALS['mensagem_feedback'] ?? null;
?>
<!DOCTYPE html>
<html lang="pt-BR" data-tema="dark">
<head>
    <meta charset="UTF-8">
    <title>StudyFlow | Cadastro de Estudante</title>
    <link rel="stylesheet" href="style.css"> <style>
        .form-container { max-width: 400px; margin: 100px auto; padding: 20px; background: #1b263b; border-radius: 12px; text-align: center; }
        input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: none; }
        button { background: #415a77; color: white; cursor: pointer; font-weight: bold; }
        .sucesso { color: #52b788; }
        .erro { color: #e76f51; }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>🚀 Começar no StudyFlow</h2>
        <?php if ($msg): ?>
            <p class="<?= strpos($msg, '✅') !== false ? 'sucesso' : 'erro' ?>"><?= $msg ?></p>
        <?php endif; ?>

        <form method="POST" action="index.php">
            <input type="text" name="nome" placeholder="Seu nome completo" required>
            <input type="number" name="idade" placeholder="Sua idade" required>
            <select name="objetivo">
                <option value="">Qual seu objetivo?</option>
                <?php foreach ($objetivos as $obj): ?>
                    <option value="<?= $obj ?>"><?= $obj ?></option>
                <?php endforeach; ?>
            </select>
            <button type="submit">Criar Perfil</button>
        </form>
    </div>
</body>
</html>