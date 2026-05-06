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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyFlow | Cadastro</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            background-color: var(--bg-base);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            font-family: var(--font-sans);
        }

        .form-card {
            background: var(--bg-surface);
            border: 1px solid var(--border);
            padding: var(--s8);
            border-radius: var(--r-xl);
            width: 100%;
            max-width: 420px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            text-align: center;
        }

        .form-card h2 {
            font-family: var(--font-display);
            color: var(--text-primary);
            font-size: 28px;
            margin-bottom: var(--s2);
            letter-spacing: -0.5px;
        }

        .form-card p {
            color: var(--text-secondary);
            font-size: 14px;
            margin-bottom: var(--s6);
        }

        .input-wrapper {
            text-align: left;
            margin-bottom: var(--s4);
        }

        .input-wrapper label {
            display: block;
            color: var(--text-secondary);
            font-size: 13px;
            font-weight: 600;
            margin-bottom: var(--s1);
            margin-left: 4px;
        }

        input, select {
            width: 100%;
            background: var(--bg-input);
            border: 1px solid var(--border);
            color: var(--text-primary);
            padding: var(--s3) var(--s4);
            border-radius: var(--r-lg);
            font-size: 15px;
            transition: all 0.2s ease;
        }

        input:focus, select:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 4px var(--accent-glow);
            background: var(--bg-surface);
        }

        .btn-submit {
            background: var(--accent);
            color: white;
            border: none;
            width: 100%;
            padding: var(--s4);
            border-radius: var(--r-lg);
            font-family: var(--font-display);
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            margin-top: var(--s4);
            transition: all 0.3s ease;
        }

        .btn-submit:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px var(--accent-glow);
        }

        /* Estilo para as mensagens de Erro/Sucesso */
        .alert {
            padding: var(--s3);
            border-radius: var(--r-md);
            margin-bottom: var(--s6);
            font-size: 14px;
            font-weight: 500;
        }
        .alert-success { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid #059669; }
        .alert-error { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid #dc2626; }

    </style>
</head>
<body>

    <div class="form-card">
        <h2>🚀 StudyFlow</h2>
        <p>Crie o seu perfil para começar a estudar com inteligência.</p>

        <?php if ($msg): ?>
            <div class="alert <?= strpos($msg, '✅') !== false ? 'alert-success' : 'alert-error' ?>">
                <?= $msg ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="index.php">
            <div class="input-wrapper">
                <label>Como quer ser chamado?</label>
                <input type="text" name="nome" placeholder="Digite seu nome..." required>
            </div>

            <div class="input-wrapper">
                <label>Sua idade</label>
                <input type="number" name="idade" placeholder="Ex: 18" required>
            </div>

            <div class="input-wrapper">
                <label>Qual seu foco?</label>
                <select name="objetivo">
                    <?php foreach ($objetivos as $obj): ?>
                        <option value="<?= $obj ?>"><?= $obj ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <button type="submit" class="btn-submit">Criar meu Plano →</button>
        </form>
    </div>

</body>
</html>