# Resumo sobre CSS

## 1. A utilidade do CSS e o uso de arquivos externos

O CSS (Cascading Style Sheets) é a linguagem responsável por definir a aparência visual de uma página web. Enquanto o HTML organiza o conteúdo da página, o CSS cuida do design, permitindo alterar cores, fontes, espaçamentos, tamanhos e a organização dos elementos na tela.

Existem três formas de aplicar CSS: inline (diretamente na tag HTML), interno (dentro da tag `<style>` no HTML) e externo. O método mais recomendado é o **arquivo externo**, normalmente chamado `style.css`.

Utilizar um arquivo externo é melhor porque deixa o código mais organizado, facilita a manutenção do projeto e permite reutilizar o mesmo estilo em várias páginas do site. Para conectar o CSS ao HTML, utilizamos a seguinte linha dentro da tag `<head>`:

```html
<link rel="stylesheet" href="style.css">