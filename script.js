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
});

function handleAddToCart(produto) {
  const nomeProduto = produto.querySelector(".card-title").innerText;
  const quantidadeInput = produto.querySelector("input[type='number']");
  const quantidade = quantidadeInput.value;

  if (!quantidade || quantidade <= 0) {
    showFeedbackMessage(
      "Por favor, insira uma quantidade válida.",
      "alert-danger"
    );
    return;
  }

  let produtos = JSON.parse(localStorage.getItem("produtos"));
  const produtoExistente = produtos.find((p) => p.nome === nomeProduto);

  if (produtoExistente) {
    produtoExistente.quantidade =
      parseInt(produtoExistente.quantidade) + parseInt(quantidade);
  } else {
    produtos.push({ nome: nomeProduto, quantidade });
  }

  localStorage.setItem("produtos", JSON.stringify(produtos));
  quantidadeInput.value = "";
  showFeedbackMessage(
    `Você adicionou ${quantidade} unidades do ${nomeProduto} ao carrinho.`,
    "alert-success"
  );
}

function handleImageClick(imagem) {
  const src = imagem.getAttribute("data-imagem");
  const modalImagem = document.getElementById("imagemModalImg");
  const myModal = new bootstrap.Modal(document.getElementById("imagemModal"));
  modalImagem.src = src;
  myModal.show();
}

function renderCart() {
  const cartList = document.getElementById("carrinho");
  cartList.innerHTML = "";

  const produtos = JSON.parse(localStorage.getItem("produtos"));

  if (produtos.length === 0) {
    cartList.innerHTML =
      '<li class="list-group-item">O carrinho está vazio.</li>';
    return;
  }

  produtos.forEach((produto) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerText = `${produto.nome} - Quantidade: ${produto.quantidade}`;
    cartList.appendChild(listItem);
  });
}

function limparCarrinho() {
  localStorage.setItem("produtos", JSON.stringify([]));
  renderCart();
  showFeedbackMessage("O carrinho foi limpo.", "alert-success");
}

function showFeedbackMessage(message, alertClass) {
  const feedbackMessage = document.querySelector(".feedback-message");
  feedbackMessage.className = `feedback-message alert ${alertClass}`;
  document.getElementById("feedback-message-text").innerText = message;
  feedbackMessage.style.display = "block";
  setTimeout(() => {
    feedbackMessage.style.display = "none";
  }, 3000);
}
