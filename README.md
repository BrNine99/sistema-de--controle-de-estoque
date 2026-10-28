# Sistema de Controle de Estoque

Este é um projeto que desenvolvi durante meus estudos de desenvolvimento Full Stack, para praticar HTML e JavaScript na criação de um sistema simples de controle de produtos.

**Autor:** BrNine99

## Sobre o projeto

O sistema permite cadastrar produtos, visualizar os itens em uma tabela e acompanhar a quantidade e o valor total do estoque. Também é possível pesquisar, editar e excluir produtos.

Os dados são salvos no `localStorage` do navegador, então continuam disponíveis ao atualizar a página.

## Funcionalidades

- Cadastrar produtos com nome, preço e quantidade.
- Validar os dados preenchidos no formulário.
- Listar produtos em uma tabela.
- Pesquisar produtos pelo nome.
- Editar produtos e cancelar a edição.
- Excluir produtos.
- Mostrar o total de produtos, unidades e valor em estoque.
- Exibir mensagens quando não há produtos cadastrados ou encontrados.
- Salvar e recuperar os produtos usando `localStorage`.

## Tecnologias utilizadas

- **HTML:** estrutura da página, formulário, botões e tabela.
- **JavaScript:** lógica do sistema, manipulação dos produtos e interação com a página.
- **Git e GitHub:** versionamento e registro da evolução do projeto.

## Conceitos que aprendi e pratiquei

### HTML e DOM

- Estrutura de formulários, campos, botões e tabelas.
- Uso de `id` para identificar elementos.
- Seleção de elementos com `document.getElementById()`.
- Manipulação de `value`, `textContent` e `hidden`.
- Criação de elementos com `createElement()` e `appendChild()`.
- Limpeza da tabela com `replaceChildren()`.
- Eventos com `addEventListener()` e `event.preventDefault()`.

### JavaScript

- Variáveis com `const` e `let`.
- Funções tradicionais, funções anônimas e arrow functions.
- Objetos e arrays para representar e armazenar produtos.
- Condicionais com `if`, `else` e operador ternário.
- Validação com `trim()`, `Number.isFinite()` e `Number.isInteger()`.
- Conversão de valores com `Number()` e `parseFloat()`.
- Métodos de array:
  - `push()` para adicionar produtos.
  - `forEach()` para percorrer e mostrar produtos.
  - `find()` e `findIndex()` para localizar produtos.
  - `splice()` para excluir produtos.
  - `filter()` para pesquisar produtos.
  - `reduce()` para calcular totais.
  - `map()` para obter os IDs dos produtos.
- Formatação de valores em reais com `Intl.NumberFormat()`.
- Identificação dos produtos por ID e controle de edição.
- Cálculo do próximo ID com `Math.max()` e o operador spread (`...`).

### Armazenamento de dados

- `localStorage.setItem()` para salvar dados no navegador.
- `localStorage.getItem()` para recuperar dados.
- `JSON.stringify()` para converter dados em texto JSON.
- `JSON.parse()` para transformar o texto JSON em dados JavaScript novamente.

### Organização do código

- Separação entre funções de cadastro, listagem, busca e atualização do painel.
- Reutilização de funções para evitar código repetido.
- Atualização da interface depois de alterar os produtos.
- Uso de commits no Git para registrar as etapas do desenvolvimento.

## Como executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador.
3. Cadastre alguns produtos e teste as funcionalidades.

> Este é um projeto de estudos. Os dados são armazenados no navegador, sem banco de dados ou servidor.

## Próximos aprendizados

Quero continuar melhorando o projeto, aprendendo a tratar erros, organizar melhor o código e, futuramente, integrar um back-end e um banco de dados.

---

Desenvolvido por **BrNine99** como parte dos meus estudos em desenvolvimento Full Stack.
