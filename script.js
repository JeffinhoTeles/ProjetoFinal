// Evento que aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se há um item "produtos" no localStorage; se não houver, cria um item "produtos" como um array vazio
  if (!localStorage.getItem("produtos")) {
    localStorage.setItem("produtos", JSON.stringify([]));
  }

  // Seleciona todos os elementos com a classe "card" (provavelmente os produtos)
  // e adiciona um evento de clique ao botão "add-to-cart" de cada um
  const produtos = document.querySelectorAll(".card");
  produtos.forEach((produto) => {
    produto.querySelector(".add-to-cart").addEventListener("click", () => {
      handleAddToCart(produto); // Chama a função handleAddToCart passando o produto clicado
    });
  });

  // Seleciona todas as imagens com a classe "card-img-top" e adiciona um evento de clique a cada uma
  const imagens = document.querySelectorAll(".card-img-top");
  imagens.forEach((imagem) => {
    imagem.addEventListener("click", function () {
      handleImageClick(this); // Chama a função handleImageClick passando a imagem clicada
    });
  });

  // Adiciona um evento ao modal do carrinho para renderizar o carrinho quando o modal for exibido
  document
    .querySelector("#carrinhoModal")
    .addEventListener("shown.bs.modal", () => {
      renderCart(); // Chama a função renderCart para exibir os produtos no carrinho
    });

  // Adiciona um evento de clique ao botão de limpar carrinho
  document.querySelector("#limparCarrinho").addEventListener("click", () => {
    limparCarrinho(); // Chama a função limparCarrinho para esvaziar o carrinho
  });

  // Atualiza o contador do carrinho quando a página é carregada
  updateCartCount();
});

// Função para adicionar um produto ao carrinho
function handleAddToCart(produto) {
  // Obtém o nome do produto a partir do título do card
  const nomeProduto = produto.querySelector(".card-title").innerText;

  // Obtém a quantidade selecionada pelo usuário
  const quantidadeInput = produto.querySelector("input[type='number']");
  const quantidade = parseInt(quantidadeInput.value);

  // Se a quantidade não for válida ou for menor ou igual a 0, exibe uma mensagem de feedback e retorna
  if (!quantidade || quantidade <= 0) {
    showFeedbackMessage("Por favor, selecione uma quantidade válida.");
    return;
  }

  // Recupera o array de produtos do localStorage ou inicializa um array vazio
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Verifica se o produto já existe no carrinho
  const produtoExistente = produtos.find((p) => p.nome === nomeProduto);

  // Se o produto já existir, incrementa a quantidade; caso contrário, adiciona um novo produto ao array
  if (produtoExistente) {
    produtoExistente.quantidade += quantidade;
  } else {
    produtos.push({ nome: nomeProduto, quantidade });
  }

  // Atualiza o localStorage com o novo array de produtos
  localStorage.setItem("produtos", JSON.stringify(produtos));

  // Limpa o campo de quantidade
  quantidadeInput.value = "";

  // Exibe uma mensagem de feedback informando que o produto foi adicionado ao carrinho
  showFeedbackMessage(`Adicionado ${quantidade}x ${nomeProduto} ao carrinho!`);

  // Atualiza o contador do carrinho
  updateCartCount();
}

// Função para renderizar os produtos no carrinho
function renderCart() {
  // Seleciona o elemento do carrinho no DOM
  const carrinho = document.querySelector("#carrinho");

  // Limpa o conteúdo atual do carrinho
  carrinho.innerHTML = "";

  // Recupera o array de produtos do localStorage ou inicializa um array vazio
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Para cada produto no carrinho, cria um item de lista e o adiciona ao carrinho
  produtos.forEach((produto) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${produto.nome} <span class="badge bg-primary rounded-pill custom-badge">${produto.quantidade}</span>`;

    // Adiciona o item de lista ao carrinho
    carrinho.appendChild(li);
  });
}

// Função para limpar o carrinho
function limparCarrinho() {
  // Remove todos os produtos do carrinho no localStorage
  localStorage.setItem("produtos", JSON.stringify([]));

  // Re-renderiza o carrinho vazio
  renderCart();

  // Atualiza o contador do carrinho
  updateCartCount();

  // Exibe uma mensagem de feedback ao usuário informando que o carrinho foi esvaziado
  showFeedbackMessage("Carrinho esvaziado com sucesso!");
}

// Função para tratar o clique na imagem do produto
function handleImageClick(image) {
  // Seleciona o elemento da imagem no modal
  const imagemModal = document.querySelector("#imagemModalImg");

  // Define a fonte da imagem do modal com o dataset da imagem clicada
  imagemModal.src = image.dataset.imagem;
}

// Função para exibir uma mensagem de feedback ao usuário
function showFeedbackMessage(message) {
  // Seleciona o elemento de mensagem de feedback
  const feedbackMessage = document.querySelector(".feedback-message");

  // Define o texto da mensagem de feedback
  feedbackMessage.querySelector("#feedback-message-text").innerText = message;

  // Exibe a mensagem
  feedbackMessage.style.display = "block";
  feedbackMessage.classList.add("show");

  // Esconde a mensagem após 3 segundos
  setTimeout(() => {
    feedbackMessage.style.display = "none";
    feedbackMessage.classList.remove("show");
  }, 3000);
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
  // Recupera o array de produtos do localStorage ou inicializa um array vazio
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Calcula o total de itens no carrinho
  const totalCount = produtos.reduce(
    (total, produto) => total + produto.quantidade,
    0
  );

  // Seleciona os elementos do contador no desktop e mobile
  const cartCount = document.getElementById("cart-count");
  const cartCountMobile = document.getElementById("cart-count-mobile");

  // Atualiza o contador com o total de itens
  if (cartCount) cartCount.innerText = totalCount;
  if (cartCountMobile) cartCountMobile.innerText = totalCount;
}
