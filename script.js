
// Capturar os Elementos
const obterElemento = (id) => document.getElementById(id);

// Cria lista produtos e formulário
const produtos = [];
let proximoId = 1;

// Formatar moeda
const formatarMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

// Elementos HTML
const formulario = obterElemento("form-cadastro");
const tbody = obterElemento("lista-produtos");
const quantidadeProdutos = obterElemento("quantProduto");
const unidades = obterElemento("unidade");
const total = obterElemento("total");

// Limpar Campos
const limparCampos = () => {
    obterElemento("nome").value = "";
    obterElemento("preco").value = "";
    obterElemento("quantCadastro").value = "";
}


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

    atualizarPainel();

    limparCampos();

});

// Função Renderizar Produto no HTML
function renderizarProdutos() {
    tbody.replaceChildren();

    produtos.forEach(function(produto) {
    const linha = document.createElement("tr");
    
    const celulaNome = document.createElement("td");
    const celulaPreco = document.createElement("td");
    const celulaQuantidade = document.createElement("td");
    const celulaTotal = document.createElement("td");

    celulaNome.textContent = produto.nome;
    celulaPreco.textContent = formatarMoeda.format(produto.preco);
    celulaQuantidade.textContent = produto.quantidade;
    celulaTotal.textContent = formatarMoeda.format((produto.preco) * (produto.quantidade));

    linha.appendChild(celulaNome);
    linha.appendChild(celulaPreco);
    linha.appendChild(celulaQuantidade);
    linha.appendChild(celulaTotal);

    tbody.appendChild(linha);

    });

}

function atualizarPainel() {
   
   quantidadeProdutos.textContent = `Produtos: ${produtos.length}`;

   const totalUnidades = produtos.reduce(function(acumulador, produto) {
        return acumulador + produto.quantidade;        
    }, 0);
    
    unidades.textContent = `Unidades: ${totalUnidades}`;

    const valorTotal = produtos.reduce(function(acumulador, produto) {
        return acumulador + (produto.preco * produto.quantidade);
    }, 0);

    total.textContent = `Valor total: ${formatarMoeda.format(valorTotal)}`;     
}





