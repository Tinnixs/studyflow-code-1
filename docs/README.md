# UI/UX do Caos: A Pior Seleção de Data de Nascimento com IndexedDB

Este projeto é uma implementação prática e propositalmente frustrante de uma interface de seleção de data de nascimento, criada com o objetivo de demonstrar a importância da boa Experiência do Usuário (UX) e Acessibilidade. Através de anti-padrões de design e interações inesperadas, os usuários são levados a refletir sobre os desafios de interfaces mal projetadas, enquanto praticam conceitos avançados de desenvolvimento web com HTML, CSS e JavaScript, e persistência de dados com IndexedDB.

## 🎯 Objetivos de Aprendizagem

- **Compreender Anti-Padrões de UI/UX:** Identificar e sentir na prática o impacto negativo de interfaces mal desenhadas.
- **Manipulação Avançada do DOM:** Utilizar JavaScript para criar e controlar elementos HTML e seus comportamentos de forma complexa.
- **Gestão de Eventos:** Dominar `Event Listeners` (mouseover, click, input, keydown, change, mouseup) para orquestrar interações caóticas.
- **Persistência de Dados com IndexedDB:** Implementar um mini-framework para salvar dados de forma assíncrona no banco de dados local do navegador, garantindo que, mesmo no caos, os dados sejam persistidos.
- **Lógica de Programação:** Exercitar a criatividade na resolução de problemas (ou na criação deles!) com JavaScript.
- **Resiliência e Paciência:** Desenvolver a capacidade de lidar com sistemas frustrantes, uma habilidade valiosa para qualquer desenvolvedor.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura da página.
- **CSS3:** Estilização e animações para os anti-padrões visuais.
- **JavaScript (ES6+):** Lógica de interação, manipulação do DOM e controle dos anti-padrões.
- **IndexedDB:** Banco de dados local para persistência da data de nascimento.

## 🚀 Como Rodar o Projeto

1.  **Clone ou Baixe:** Obtenha os arquivos deste projeto.
2.  **Estrutura de Pastas:** Certifique-se de que os arquivos `nascimento.html`, `style.css`, `db.js` e `controller.js` estejam na mesma pasta (ex: `ui-ux-caos/`).
3.  **Abra no Navegador:** **Importante:** Não utilize um Live Server ou extensões similares para abrir o `nascimento.html`. Abra o arquivo diretamente no seu navegador (ex: `Ctrl+O` ou `File > Open File...` e selecione `nascimento.html`). Isso evita problemas de CORS (Cross-Origin Resource Sharing) que podem impedir a comunicação entre os scripts `db.js` e `controller.js`.
4.  **Explore o Caos:** Interaja com a página e tente inserir sua data de nascimento. Prepare-se para a frustração!
5.  **Verifique o IndexedDB:** Abra as Ferramentas de Desenvolvedor do seu navegador (`F12`), vá na aba `Application` e, em seguida, em `IndexedDB`. Você deverá encontrar o banco `StudyFlowDB` e o `Object Store` chamado `tarefas`, onde sua data de nascimento (se você conseguiu salvar!) estará persistida.

## 📉 Os Anti-Padrões Implementados

Este projeto apresenta uma série de anti-padrões de UI/UX, cada um projetado para maximizar a frustração do usuário de forma educativa:

### Passo 1: Dia por Cliques (O Inferno dos Cliques)

-   **Anti-Padrão:** Exige um esforço físico e mental excessivo para uma tarefa simples. Viola o princípio de 
