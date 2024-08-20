// Função para adicionar um produto ao carrinho
function handleAddToCart(produto) {
  const nomeProduto = produto.querySelector(".card-title").innerText;
  const precoProduto = parseFloat(
    produto.querySelector(".card-price").innerText.replace("R$", "").trim()
  );

  const quantidadeInput = produto.querySelector("input[type='number']");
  const quantidade = parseInt(quantidadeInput.value);

  if (!quantidade || quantidade <= 0) {
    showFeedbackMessage("Por favor, selecione uma quantidade válida.");
    return;
  }

  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const produtoExistente = produtos.find((p) => p.nome === nomeProduto);

  if (produtoExistente) {
    produtoExistente.quantidade += quantidade;
  } else {
    produtos.push({ nome: nomeProduto, preco: precoProduto, quantidade });
  }

  localStorage.setItem("produtos", JSON.stringify(produtos));
  quantidadeInput.value = "";
  showFeedbackMessage(`Adicionado ${quantidade}x ${nomeProduto} ao carrinho!`);
  updateCartCount();
}

// Função para renderizar os produtos no carrinho
function renderCart() {
  const carrinho = document.querySelector("#carrinho");
  carrinho.innerHTML = "";
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  produtos.forEach((produto, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${produto.nome} - R$${produto.preco.toFixed(2)} x ${
      produto.quantidade
    } 
            <span class="badge bg-primary rounded-pill custom-badge">R$${(
              produto.preco * produto.quantidade
            ).toFixed(2)}</span>
            <button class="btn btn-danger btn-sm" onclick="removerProduto(${index})">
                <i class="fas fa-trash-alt"></i>
            </button>`;
    carrinho.appendChild(li);
  });

  updateTotalCarrinho();
}

// Função para remover um produto do carrinho
function removerProduto(index) {
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  produtos.splice(index, 1);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  renderCart();
  updateCartCount();
}

// Função para limpar o carrinho
function limparCarrinho(exibirMensagem = true) {
  localStorage.setItem("produtos", JSON.stringify([]));
  renderCart();
  updateCartCount();

  if (exibirMensagem) {
    showFeedbackMessage("Carrinho esvaziado com sucesso!");
  }
}

// Função para calcular e atualizar o total do carrinho
function updateTotalCarrinho() {
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const total = produtos.reduce(
    (acc, produto) => acc + produto.preco * produto.quantidade,
    0
  );
  document.querySelector(
    "#totalCarrinho"
  ).innerText = `Total: R$${total.toFixed(2)}`;
}

// Função para finalizar a compra
function finalizarCompra() {
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  if (produtos.length === 0) {
    showFeedbackMessage("Seu carrinho está vazio!");
    return;
  }

  showFeedbackMessage("Compra efetuada com sucesso!");

  // Limpa o carrinho sem exibir a mensagem de "Carrinho esvaziado com sucesso!"
  limparCarrinho(false);
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const totalCount = produtos.reduce(
    (total, produto) => total + produto.quantidade,
    0
  );

  const cartCount = document.getElementById("cart-count");
  const cartCountMobile = document.getElementById("cart-count-mobile");

  if (cartCount) cartCount.innerText = totalCount;
  if (cartCountMobile) cartCountMobile.innerText = totalCount;
}
