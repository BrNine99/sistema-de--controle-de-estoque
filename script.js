
"use strict";

// ============================================================
// SISTEMA DE CONTROLE DE ESTOQUE
// Autor: BrNine99
//
// Este arquivo controla:
// - Cadastro, edição e exclusão de produtos
// - Pesquisa de produtos
// - Atualização da tabela e do painel
// - Armazenamento dos produtos no localStorage
// ============================================================


// ============================================================
// ETAPA 1 - CONFIGURAÇÕES E ELEMENTOS DO HTML
// ============================================================

// Função auxiliar para buscar elementos pelo ID.
const obterElemento = (id) => document.getElementById(id);

// Captura dos elementos utilizados no sistema.
const formulario = obterElemento("form-cadastro");
const tbody = obterElemento("lista-produtos");

const inputNome = obterElemento("nome");
const inputPreco = obterElemento("preco");
const inputQuantidade = obterElemento("quantCadastro");
const inputBusca = obterElemento("buscar");

const quantidadeProdutos = obterElemento("quantProduto");
const unidades = obterElemento("unidade");
const total = obterElemento("total");

const botaoSalvar = obterElemento("botaoCadastro");
const botaoCancelar = obterElemento("cancelar-edicao");

// Configuração para formatar valores em reais.
const formatarMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

// Chave utilizada para identificar os dados no localStorage.
const CHAVE_PRODUTOS = "produtos";


// ============================================================
// ETAPA 2 - ARMAZENAMENTO E VARIÁVEIS DE CONTROLE
// ============================================================

// Recupera os produtos salvos no navegador.
function carregarProdutos() {
    const dadosSalvos = localStorage.getItem(CHAVE_PRODUTOS);

    // Se não houver dados, retorna um array vazio.
    if (dadosSalvos === null) {
        return [];
    }

    try {
        const dadosConvertidos = JSON.parse(dadosSalvos);

        // Verifica se os dados recuperados são um array.
        if (!Array.isArray(dadosConvertidos)) {
            return [];
        }

        return dadosConvertidos;

    } catch (erro) {
        // Evita que um JSON inválido interrompa o sistema.
        console.error("Erro ao recuperar produtos:", erro);
        return [];
    }
}

// Salva o estado atual do array no navegador.
function salvarProdutos() {
    localStorage.setItem(
        CHAVE_PRODUTOS,
        JSON.stringify(produtos)
    );
}

// Array principal que armazena os produtos.
const produtos = carregarProdutos();

// Recupera os IDs existentes.
const ids = produtos.map(function(produto) {
    return produto.id;
});

// Calcula o próximo ID a partir do maior ID existente.
let proximoId = Math.max(0, ...ids) + 1;

// null significa que nenhum produto está sendo editado.
let idEmEdicao = null;


// ============================================================
// ETAPA 3 - FUNÇÕES AUXILIARES DO FORMULÁRIO
// ============================================================

// Limpa os campos do formulário.
function limparCampos() {
    inputNome.value = "";
    inputPreco.value = "";
    inputQuantidade.value = "";
}

// Atualiza os botões de acordo com o modo do formulário.
function atualizarModoFormulario() {
    const estaEditando = idEmEdicao !== null;

    botaoSalvar.textContent = estaEditando
        ? "Salvar alterações"
        : "+ Cadastrar produto";

    botaoCancelar.hidden = !estaEditando;
}

// Encerra a edição e retorna ao modo de cadastro.
function cancelarEdicao() {
    idEmEdicao = null;

    limparCampos();
    atualizarModoFormulario();
}

// Lê os valores preenchidos no formulário.
function obterDadosFormulario() {
    return {
        nome: inputNome.value.trim(),
        preco: parseFloat(inputPreco.value),
        quantidade: Number(inputQuantidade.value)
    };
}

// Valida os dados antes de cadastrar ou editar.
function validarProduto(produto) {
    if (produto.nome === "") {
        alert("Adicione um nome de produto.");
        return false;
    }

    if (!Number.isFinite(produto.preco) || produto.preco <= 0) {
        alert("Adicione um valor válido.");
        return false;
    }

    if (
        !Number.isInteger(produto.quantidade) ||
        produto.quantidade < 0 ||
        inputQuantidade.value.trim() === ""
    ) {
        alert("Adicione uma quantidade válida.");
        return false;
    }

    // Todos os dados são válidos.
    return true;
}


// ============================================================
// ETAPA 4 - CADASTRO, EDIÇÃO E EXCLUSÃO DE PRODUTOS
// ============================================================

// Adiciona um novo produto ao array.
function cadastrarProduto(dados) {
    const novoProduto = {
        id: proximoId,
        nome: dados.nome,
        preco: dados.preco,
        quantidade: dados.quantidade
    };

    produtos.push(novoProduto);

    // Incrementa o ID para o próximo cadastro.
    proximoId++;
}

// Atualiza os dados de um produto existente.
function editarProduto(dados) {
    const produtoEncontrado = produtos.find(function(produto) {
        return produto.id === idEmEdicao;
    });

    if (!produtoEncontrado) {
        alert("Produto não encontrado.");
        return false;
    }

    produtoEncontrado.nome = dados.nome;
    produtoEncontrado.preco = dados.preco;
    produtoEncontrado.quantidade = dados.quantidade;

    idEmEdicao = null;

    return true;
}

// Preenche o formulário com os dados do produto selecionado.
function iniciarEdicao(id) {
    const produtoEncontrado = produtos.find(function(produto) {
        return produto.id === id;
    });

    if (!produtoEncontrado) {
        return;
    }

    idEmEdicao = produtoEncontrado.id;

    inputNome.value = produtoEncontrado.nome;
    inputPreco.value = produtoEncontrado.preco;
    inputQuantidade.value = produtoEncontrado.quantidade;

    atualizarModoFormulario();
}

// Exclui um produto utilizando seu ID.
function excluirProduto(id) {
    const indice = produtos.findIndex(function(produto) {
        return produto.id === id;
    });

    // Se o produto não existir, interrompe a exclusão.
    if (indice === -1) {
        return;
    }

    produtos.splice(indice, 1);

    // Se o produto excluído estava em edição, cancela a edição.
    if (idEmEdicao === id) {
        cancelarEdicao();
    }

    // Salva a exclusão e atualiza a tela.
    salvarProdutos();
    atualizarInterface();
}


// ============================================================
// ETAPA 5 - RENDERIZAÇÃO DA TABELA
// ============================================================

// Cria uma linha da tabela para um produto.
function criarLinhaProduto(produto) {
    const linha = document.createElement("tr");

    const celulaNome = document.createElement("td");
    const celulaPreco = document.createElement("td");
    const celulaQuantidade = document.createElement("td");
    const celulaTotal = document.createElement("td");
    const celulaAcoes = document.createElement("td");

    const botaoEditar = document.createElement("button");
    const botaoExcluir = document.createElement("button");

    // Preenche as células com os dados do produto.
    celulaNome.textContent = produto.nome;

    celulaPreco.textContent = formatarMoeda.format(produto.preco);

    celulaQuantidade.textContent = produto.quantidade;

    celulaTotal.textContent = formatarMoeda.format(
        produto.preco * produto.quantidade
    );

    // Configuração do botão Editar.
    botaoEditar.textContent = "Editar";
    botaoEditar.type = "button";

    botaoEditar.addEventListener("click", function() {
        iniciarEdicao(produto.id);
    });

    // Configuração do botão Excluir.
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.type = "button";

    botaoExcluir.addEventListener("click", function() {
        excluirProduto(produto.id);
    });

    // Adiciona os botões à célula de ações.
    celulaAcoes.appendChild(botaoEditar);
    celulaAcoes.appendChild(botaoExcluir);

    // Adiciona as células à linha.
    linha.appendChild(celulaNome);
    linha.appendChild(celulaPreco);
    linha.appendChild(celulaQuantidade);
    linha.appendChild(celulaTotal);
    linha.appendChild(celulaAcoes);

    return linha;
}

// Atualiza a tabela com os produtos recebidos.
function renderizarProdutos(lista) {
    // Remove as linhas anteriores para evitar duplicações.
    tbody.replaceChildren();

    // Exibe uma mensagem quando a lista estiver vazia.
    if (lista.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;

        celula.textContent = produtos.length === 0
            ? "Nenhum produto cadastrado."
            : "Nenhum produto encontrado.";

        linha.appendChild(celula);
        tbody.appendChild(linha);

        return;
    }

    // Percorre a lista e cria uma linha para cada produto.
    lista.forEach(function(produto) {
        const linha = criarLinhaProduto(produto);
        tbody.appendChild(linha);
    });
}


// ============================================================
// ETAPA 6 - ATUALIZAÇÃO DO PAINEL
// ============================================================

// Atualiza as informações gerais do estoque.
function atualizarPainel() {
    // Quantidade de produtos diferentes cadastrados.
    quantidadeProdutos.textContent = `Produtos: ${produtos.length}`;

    // Soma todas as unidades disponíveis.
    const totalUnidades = produtos.reduce(function(acumulador, produto) {
        return acumulador + produto.quantidade;
    }, 0);

    unidades.textContent = `Unidades: ${totalUnidades}`;

    // Calcula o valor total do estoque.
    const valorTotal = produtos.reduce(function(acumulador, produto) {
        return acumulador + produto.preco * produto.quantidade;
    }, 0);

    total.textContent = `Valor total: ${formatarMoeda.format(valorTotal)}`;
}


// ============================================================
// ETAPA 7 - PESQUISA DE PRODUTOS
// ============================================================

// Filtra os produtos de acordo com o texto digitado.
function filtrarProdutos() {
    const textoBusca = inputBusca.value.trim().toLowerCase();

    const produtosFiltrados = produtos.filter(function(produto) {
        return produto.nome.toLowerCase().includes(textoBusca);
    });

    renderizarProdutos(produtosFiltrados);
}

// Centraliza a atualização das informações visuais.
function atualizarInterface() {
    filtrarProdutos();
    atualizarPainel();
}


// ============================================================
// ETAPA 8 - EVENTOS DO SISTEMA
// ============================================================

// Evento responsável pelo cadastro e pela edição.
formulario.addEventListener("submit", function(event) {
    // Impede que o formulário recarregue a página.
    event.preventDefault();

    // Obtém os dados preenchidos pelo usuário.
    const dados = obterDadosFormulario();

    // Interrompe a operação se os dados forem inválidos.
    if (!validarProduto(dados)) {
        return;
    }

    if (idEmEdicao !== null) {
        // Atualiza o produto que está sendo editado.
        const editadoComSucesso = editarProduto(dados);

        if (!editadoComSucesso) {
            return;
        }

    } else {
        // Adiciona um novo produto.
        cadastrarProduto(dados);
    }

    // Persiste os dados atualizados no navegador.
    salvarProdutos();

    // Atualiza tabela, painel e formulário.
    atualizarInterface();
    limparCampos();
    atualizarModoFormulario();
});

// Evento do botão Cancelar edição.
botaoCancelar.addEventListener("click", function() {
    cancelarEdicao();
});

// Evento executado quando o usuário digita na busca.
inputBusca.addEventListener("input", function() {
    filtrarProdutos();
});


// ============================================================
// ETAPA 9 - INICIALIZAÇÃO DO SISTEMA
// ============================================================

// Executa a primeira atualização quando a página é carregada.
function iniciarSistema() {
    atualizarInterface();
    atualizarModoFormulario();
}

// Inicia o sistema.
iniciarSistema();
