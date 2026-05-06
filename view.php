<?php
require_once 'service.php';
$service = new StudyFlowService();
$objetivos = $service->listaObjetivos();
$msg = $GLOBALS['mensagem_feedback'] ?? null;
?>
<!DOCTYPE html>
<html lang="pt-BR" data-tema="dark">
<head>
    <meta charset="UTF-8 Murphy">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyFlow | Cadastro de Perfil</title>
    <link rel="stylesheet" href="style.css"> 
    <style>
        /* Ajustes específicos para centralizar o formulário na tela */
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: var(--bg-base);
            margin: 0;
        }

        .cadastro-card {
            background: var(--bg-surface);
            border: 1px solid var(--border);
            padding: var(--s8);
            border-radius: var(--r-xl);
            width: 100%;
            max-width: 450px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .cadastro-card h2 {
            font-family: var(--font-display);
            color: var(--text-primary);
            font-size: 24px;
            margin-bottom: var(--s2);
        }

        .input-group {
            margin-bottom: var(--s4);
            text-align: left;
        }

        .input-group label {
            display: block;
            color: var(--text-secondary);
            font-size: 14px;
            margin-bottom: var(--s1);
        }

        /* Reutilizando o estilo dos inputs do seu style.css */
        input, select {
            width: 100%;
            background: var(--bg-input);
            border: 1px solid var(--border);
            color: var(--text-primary);
            padding: var(--s3);
            border-radius: var(--r-md);
            font-family: var(--font-sans);
            transition: all 0.2s;
        }

        input:focus, select:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px var(--accent-glow);
        }

        .btn-enviar {
            background: var(--accent);
            color: white;
            border: none;
            padding: var(--s3);
            border-radius: var(--r-md);
            font-weight: 700;
            width: 100%;
            cursor: pointer;
            margin-top: var(--s4);
            transition: transform 0.2s, background 0.2s;
        }

        .btn-enviar:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
        }

        .feedback {
            padding: var(--s3);
            border-radius: var(--r-md);
            margin-bottom: var(--s4);
            font-size: 14px;
        }

        .feedback.sucesso { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981; }
        .feedback.erro { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; }
    </style>
</head>
<body>

    <div class="cadastro-card">
        <h2>🚀 Criar Perfil</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--s6);">Configure sua experiência no StudyFlow</p>

        <?php if ($msg): ?>
            <div class="feedback <?= strpos($msg, '✅') !== false ? 'sucesso' : 'erro' ?>">
                <?= $msg ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="index.php">
            <div class="input-group">
                <label>Nome Completo</label>
                <input type="text" name="nome" placeholder="Ex: Alex Silva" required>
            </div>

            <div class="input-group">
                <label>Idade</label>
                <input type="number" name="idade" placeholder="Sua idade" required>
            </div>

            <div class="input-group">
                <label>Objetivo de Estudo</label>
                <select name="objetivo">
                    <?php foreach ($objetivos as $obj): ?>
                        <option value="<?= $obj ?>"><?= $obj ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <button type="submit" class="btn-enviar">Começar Jornada</button>
        </form>
        
        <p style="margin-top: var(--s6); font-size: 12px; color: var(--text-muted);">
            Seus dados serão salvos localmente no StudyFlowDB.
        </p>
    </div>

</body>
</html>