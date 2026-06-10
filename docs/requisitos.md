## 1. Requisitos Funcionais (O que o sistema faz)

Estes pontos definem as ferramentas que o estudante terá em mãos para organizar sua rotina.

    RF01 - Gestão de Perfil Acadêmico: O sistema deve permitir que o usuário cadastre seu curso, disciplinas e metas de longo prazo.

    RF02 - Gerenciamento de Disponibilidade: O usuário deve informar seus blocos de horários livres por dia da semana.

    RF03 - Cadastro de Atividades Inteligente: O sistema deve permitir o registro de tarefas, provas e projetos, incluindo:

        Data de entrega (deadline).

        Nível de prioridade (Baixa, Média, Alta).

        Estimativa de esforço/complexidade.

    RF04 - Gerador de Cronograma Automático: O sistema deve cruzar as tarefas (RF03) com a disponibilidade (RF02) para criar uma agenda semanal equilibrada.

    RF05 - Temporizador de Sessão de Estudo: Funcionalidade de cronômetro com opções de Técnica Pomodoro (25/5 min) ou Tempo Livre.

    RF06 - Feedback de Produtividade: Após cada sessão, o sistema deve coletar uma autoavaliação do usuário sobre seu nível de foco e rendimento.

    RF07 - Sistema de Gamificação: Implementação de uma barra de experiência (XP), níveis e medalhas por metas alcançadas (ex: "7 dias seguidos de foco").

    RF08 - Recomendações Personalizadas: Sugestão automática de métodos de estudo (revisão espaçada, mapas mentais) baseada no histórico de desempenho.

    RF09 - Dashboards de Evolução: Exibição de gráficos comparativos de horas estudadas vs. desempenho por disciplina.

## 2. Requisitos Não Funcionais (Como o sistema deve ser)

Estes pontos garantem a qualidade, segurança e eficiência técnica da plataforma.

    RNF01 - Usabilidade (UX): O sistema deve ser projetado para que o usuário consiga registrar uma nova tarefa em menos de 15 segundos.

    RNF02 - Desempenho: O cálculo e a reestruturação do cronograma automático não devem levar mais de 3 segundos.

    RNF03 - Disponibilidade: O aplicativo deve oferecer suporte a modo offline, permitindo o uso do cronômetro sem conexão com a internet.

    RNF04 - Segurança de Dados: Todos os dados do perfil e histórico escolar devem ser criptografados e armazenados conforme as diretrizes da LGPD.

    RNF05 - Escalabilidade: O banco de dados deve ser modelado para suportar o crescimento do histórico de estudos de milhares de usuários simultâneos.

    RNF06 - Portabilidade: O sistema deve ser responsivo, com foco principal em dispositivos móveis (Android e iOS).

## 3. Especificações Técnicas de Tradução

Como traduzimos as necessidades do usuário para a linguagem do desenvolvedor:

    Necessidade: "Não sei por onde começar."

        Tradução Técnica: Implementar algoritmo de ordenação baseado em P=(U×C), onde P é prioridade, U é urgência (tempo até o prazo) e C é complexidade.

    Necessidade: "Sinto que estudo muito e não aprendo."

        Tradução Técnica: Criar gatilhos no banco de dados que identifiquem quedas de rendimento em disciplinas específicas para disparar a função de recomendação de novas técnicas (RF08).

    Necessidade: "Perco o foco com facilidade."

        Tradução Técnica: Implementar o "Modo Foco" que, ao ser ativado pelo temporizador (RF05), utilize APIs de sistema para silenciar notificações do dispositivo.
