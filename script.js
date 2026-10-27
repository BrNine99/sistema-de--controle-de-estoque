
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
const inputBusca = obterElemento("buscar");

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

    // Atualiza Contador
    proximoId++;

    // Envia cadastro do produto para lista
    produtos.push(novoProduto);    
    
    filtrarProdutos();

    atualizarPainel();

    limparCampos();

});

renderizarProdutos(produtos);
atualizarPainel();

// Função Renderizar Produto no HTML
function renderizarProdutos(lista) {
    tbody.replaceChildren();

    if(lista.length === 0){
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;

        if(produtos.length === 0){
            celula.textContent = "Nenhum produto cadastrado."
        } 
        else {
            celula.textContent = "Nenhum produto encontrado.";
        }

        linha.appendChild(celula);
        tbody.appendChild(linha);

        return;
    }

    lista.forEach(function(produto) {
    const linha = document.createElement("tr");
    
    const celulaNome = document.createElement("td");
    const celulaPreco = document.createElement("td");
    const celulaQuantidade = document.createElement("td");
    const celulaTotal = document.createElement("td");
    const celulaAcoes = document.createElement("td");
    const botaoExcluir = document.createElement("button");

    botaoExcluir.addEventListener("click", function() {
        const indice = produtos.findIndex(function(item) {
            return item.id === produto.id;
        });

        if (indice !== -1) {
            produtos.splice(indice, 1);

            filtrarProdutos();
            atualizarPainel();
        }
    });

    celulaNome.textContent = produto.nome;
    celulaPreco.textContent = formatarMoeda.format(produto.preco);
    celulaQuantidade.textContent = produto.quantidade;
    celulaTotal.textContent = formatarMoeda.format((produto.preco) * (produto.quantidade));
    botaoExcluir.textContent = "Excluir";

    celulaAcoes.appendChild(botaoExcluir);
    
    linha.appendChild(celulaNome);
    linha.appendChild(celulaPreco);
    linha.appendChild(celulaQuantidade);
    linha.appendChild(celulaTotal);
    linha.appendChild(celulaAcoes);

    tbody.appendChild(linha);

    });

}

// Função de atualizar o painel com informações gerais
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

// Acessa um elemento HTML por meio do objeto de evento.
inputBusca.addEventListener("input", function() {
    filtrarProdutos();    

});

// Função para filtrar os produtos da lista
function filtrarProdutos() {
    const textoBusca = inputBusca.value;

    const textoTratado = textoBusca.trim().toLowerCase();   

    const produtosFiltrados = produtos.filter(function(produto) {
        return produto.nome.toLowerCase().includes(textoTratado);
    });

    renderizarProdutos(produtosFiltrados);
}






