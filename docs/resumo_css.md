# Resumo de Aprendizado: CSS e Box Model

Este documento contém os conceitos fundamentais explorados em aula sobre a estilização de páginas web, organização de código e o funcionamento das "caixas" no navegador.

---

## 1. A Utilidade do CSS e o Uso de Arquivos Externos

O **CSS (Cascading Style Sheets)** é a linguagem responsável por dar "vida" ao HTML. Enquanto o HTML define a estrutura (textos, imagens e links), o CSS permite adicionar cores, ajustar fontes e criar layouts, transformando páginas simples em projetos visualmente atraentes.

### Por que usar o arquivo externo (`style.css`)?
Embora existam três formas de aplicar CSS (inline, interno e externo), a criação de um **arquivo externo** é a mais recomendada por:
* **Organização:** Mantém o código HTML limpo e focado na estrutura.
* **Manutenção:** Facilita alterações em projetos grandes; você muda em um lugar e reflete em todo o site.
* **Padronização:** Permite que várias páginas HTML utilizem as mesmas regras de estilo.

> **Importante:** Para conectar o arquivo, usamos a tag `<link>` dentro do `<head>` do HTML:
> `<link rel="stylesheet" href="style.css">`

---

## 2. O Modelo de Caixa: Margin vs. Padding

No CSS, tudo é uma caixa (**Box Model**). Entender a diferença entre o espaço interno e externo é crucial para o layout:

* **Padding (Preenchimento):** É o espaço interno. Ele fica entre o conteúdo (texto/imagem) e a borda do elemento. Serve para dar "respiro" dentro da caixa.
* **Margin (Margem):** É o espaço externo. Ele serve para afastar um elemento de seus vizinhos, criando distância entre as caixas.

> **Dica de Ouro:** É comum iniciar o CSS com o seletor universal `* { margin: 0; padding: 0; box-sizing: border-box; }` para remover os espaçamentos padrão dos navegadores e ter controle total.

---

## 3. Glossário de Propriedades Principais

Abaixo, as propriedades mais utilizadas para manipular o visual e o posicionamento:

| Propriedade | O que faz? |
| :--- | :--- |
| `color` | Altera a cor do texto. |
| `background-color` | Define a cor de fundo de um elemento. |
| `font-size` | Ajusta o tamanho da fonte. |
| `font-family` | Define a família tipográfica (fonte) utilizada. |
| `display: flex` | Ativa o Flexbox para alinhar e posicionar elementos filhos facilmente. |
| `flex-direction` | Define a direção dos itens (ex: `column` para vertical ou `row` para horizontal). |
| `gap` | Determina o espaçamento entre os elementos dentro de um container flex. |
| `border-radius` | Arredonda os cantos das bordas (útil para botões). |
| `text-align` | Alinha o texto (ex: `center` para centralizar). |

---

## 4. Organização com Classes

As **classes** são atributos HTML (`class="nome-da-classe"`) fundamentais para uma estilização organizada e específica.

* **Precisão:** Ao contrário de selecionar uma tag (como o `p`), que afetaria todos os parágrafos do site, a classe permite que você escolha exatamente qual elemento deseja estilizar.
* **Reutilização:** Você pode criar uma classe `.botao-azul` e aplicá-la a diversos botões em diferentes partes do site.
* **Sintaxe no CSS:** Para chamar uma classe no arquivo `.css`, usamos sempre um ponto antes do nome:
    ```css
    .minha-classe {
        color: blue;
    }
    ```

---
*Resumo criado para fins de revisão de conteúdo de Desenvolvimento Web.*