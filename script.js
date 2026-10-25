
// Capturar os Elementos
const obterElemento = (id) => document.getElementById(id);

// Cria lista produtos e formulário
const produtos = [];
let proximoId = 1;

const formulario = obterElemento("form-cadastro");

// Cria elemento HTML
const tbody = obterElemento("lista-produtos");


// Cria Evento Submit do Formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const inputNome = () => {
        return obterElemento("nome").value;
    }

    const inputPreco = () => {
        return parseFloat(obterElemento("preco").value);
    }

    const inputQuantidade = () => {
        return Number(obterElemento("quantCadastro").value);
    }
    
    const novoProduto = {
        id: proximoId,
        nome: inputNome(),
        preco: inputPreco(),
        quantidade: inputQuantidade()
    };
    
    // Validação dos Valores
    if(novoProduto.nome.trim() === ""){
        console.log("Nome inválido");
        alert("Adicione um nome de produto.")
        return;
    }
    if(!Number.isFinite(novoProduto.preco) || novoProduto.preco <= 0){
        console.log("Valor inválido");
        alert("Adicione um valor válido");
        return;
    }
    if( !Number.isInteger(novoProduto.quantidade) || novoProduto.quantidade < 0){
        console.log("Quantidade invalida.");
        alert("Adicione uma quantidade válida.")
        return;
    }

    proximoId++;

    produtos.push(novoProduto);
    
    renderizarProdutos();

});

function renderizarProdutos() {
    tbody.replaceChildren();
    
    produtos.forEach(function(produto) {
    const linha = document.createElement("tr");
    const celula = document.createElement("td");

    celula.textContent = produto.nome;

    linha.appendChild(celula);
    tbody.appendChild(linha);

    });

}





