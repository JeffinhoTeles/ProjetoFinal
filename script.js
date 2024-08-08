document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("produtos")) {
    localStorage.setItem("produtos", JSON.stringify([]));
  }

  const produtos = document.querySelectorAll(".card");
  produtos.forEach((produto) => {
    produto.querySelector(".add-to-cart").addEventListener("click", () => {
      handleAddToCart(produto);
    });
  });

  const imagens = document.querySelectorAll(".card-img-top");
  imagens.forEach((imagem) => {
    imagem.addEventListener("click", function () {
      handleImageClick(this);
    });
  });

  document
    .querySelector("#carrinhoModal")
    .addEventListener("shown.bs.modal", () => {
      renderCart();
    });

  document.querySelector("#limparCarrinho").addEventListener("click", () => {
    limparCarrinho();
  });

  updateCartCount(); // Atualize o contador quando a página carregar
});

function handleAddToCart(produto) {
  const nomeProduto = produto.querySelector(".card-title").innerText;
  const quantidadeInput = produto.querySelector("input[type='number']");
  const quantidade = parseInt(quantidadeInput.value) || 1;

  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const produtoExistente = produtos.find((p) => p.nome === nomeProduto);

  if (produtoExistente) {
    produtoExistente.quantidade += quantidade;
  } else {
    produtos.push({ nome: nomeProduto, quantidade });
  }

  localStorage.setItem("produtos", JSON.stringify(produtos));
  quantidadeInput.value = "";
  showFeedbackMessage(`Adicionado ${quantidade}x ${nomeProduto} ao carrinho!`);
  updateCartCount(); // Atualize o contador quando um produto for adicionado
}

function renderCart() {
  const carrinho = document.querySelector("#carrinho");
  carrinho.innerHTML = "";
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  produtos.forEach((produto) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${produto.nome} <span class="badge bg-primary rounded-pill">${produto.quantidade}</span>`;
    carrinho.appendChild(li);
  });
}

function limparCarrinho() {
  localStorage.setItem("produtos", JSON.stringify([]));
  renderCart();
  updateCartCount(); // Atualize o contador quando o carrinho for limpo
}

function handleImageClick(image) {
  const imagemModal = document.querySelector("#imagemModalImg");
  imagemModal.src = image.dataset.imagem;
}

function showFeedbackMessage(message) {
  const feedbackMessage = document.querySelector(".feedback-message");
  feedbackMessage.querySelector("#feedback-message-text").innerText = message;
  feedbackMessage.style.display = "block";
  feedbackMessage.classList.add("show");

  setTimeout(() => {
    feedbackMessage.style.display = "none";
    feedbackMessage.classList.remove("show");
  }, 3000);
}

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
