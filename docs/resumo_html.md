# Fundamentos do HTML e Estruturação de Páginas Web

## Glossário das Principais Tags e a Importância da Tag `div` na Organização do Código

O HTML é uma linguagem de marcação responsável por estruturar o conteúdo das páginas web. Diferente das linguagens de programação, ele não trabalha com lógica, funções ou estruturas de repetição, mas sim com a organização dos elementos que aparecem na tela.

No desenvolvimento web, o HTML faz parte da tríade composta por HTML, CSS e JavaScript. O HTML define a estrutura da página, o CSS é responsável pela aparência visual e pelos layouts, e o JavaScript adiciona interatividade e dinamismo.

A base do HTML é composta por tags, que normalmente possuem uma abertura, um conteúdo e um fechamento. Essas tags podem conter atributos, que funcionam como configurações adicionais. Um exemplo são os links, que utilizam o atributo `href` para definir o destino da navegação.

Existe também o conceito de aninhamento, que consiste em organizar elementos dentro de outros para estruturar melhor a página. Além disso, existem tags singulares, como a de imagem, que não precisam de fechamento por não possuírem conteúdo interno.

Todo documento HTML segue uma estrutura padrão. Ele começa com a declaração do tipo de documento, seguida pela tag principal que envolve todo o código. Dentro dela existem duas partes principais: uma área destinada às configurações da página (como título e codificação de caracteres) e outra onde fica todo o conteúdo visível ao usuário.

Entre os principais elementos de marcação estão os títulos organizados hierarquicamente, os parágrafos, as marcações semânticas para dar ênfase, os links para navegação e as listas, que podem ser ordenadas ou não ordenadas.

Para tornar essa estrutura visualmente organizada e atraente, utiliza-se o CSS, preferencialmente em um arquivo externo conectado ao documento principal. Com ele é possível definir tipografia, cores, alinhamento e criar layouts modernos.

Por fim, é fundamental utilizar um editor de código adequado e salvar os arquivos com a extensão correta para que possam ser executados diretamente no navegador.

---

## Glossário das Principais Tags

### `<h1>` até `<h6>`
São utilizadas para definir títulos e subtítulos. A tag `<h1>` representa o título mais importante da página, enquanto `<h6>` representa o de menor hierarquia.

### `<p>`
Define parágrafos de texto, organizando o conteúdo escrito dentro da página.

### `<a>`
Cria links que permitem a navegação entre páginas ou sites diferentes. Utiliza o atributo `href` para definir o destino do link.

### `<img>`
Insere imagens na página. É uma tag singular, ou seja, não possui fechamento. Utiliza atributos como `src` (caminho da imagem) e `alt` (descrição alternativa).

### `<ul>`
Cria uma lista não ordenada, normalmente representada por marcadores.

### `<ol>`
Cria uma lista ordenada, representada por números.

### `<li>`
Define cada item dentro de uma lista, seja ordenada ou não ordenada.

### `<strong>` e `<em>`
São tags semânticas utilizadas para dar ênfase ao texto, indicando importância ou destaque.

---

## A Importância da Tag `<div>` no Aninhamento e Organização

A tag `<div>` é um elemento de agrupamento utilizado para organizar e estruturar o código HTML. Ela permite reunir vários elementos dentro de um mesmo bloco, facilitando a aplicação de estilos com CSS e melhorando a organização da página.

O aninhamento acontece quando uma tag é colocada dentro de outra. A `<div>` é amplamente utilizada para isso, ajudando a dividir a página em seções lógicas, como cabeçalho, conteúdo principal e rodapé. Essa organização torna o código mais limpo, estruturado e fácil de manter.