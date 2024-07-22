// Função para lidar com o clique no produto
function handleProductClick(produto) {
  // Obtém o nome do produto a partir do elemento com a classe 'card-title' dentro do produto clicado
  const nomeProduto = produto.querySelector(".card-title").innerText;
  // Exibe um prompt para o usuário inserir a quantidade desejada do produto
  const quantidade = prompt(`Quantas unidades do ${nomeProduto} você deseja?`);

  // Usa operador ternário para definir a mensagem de alerta
  const message = quantidade
    ? `Você adicionou ${quantidade} unidades do ${nomeProduto} ao carrinho.`
    : "Nenhuma quantidade foi adicionada.";
  // Exibe a mensagem de alerta apropriada
  alert(message);

  // Usa operador ternário para definir a mensagem de log
  const logMessage = quantidade
    ? `Produto: ${nomeProduto}, Quantidade: ${quantidade}`
    : `Nenhuma quantidade foi adicionada para o produto ${nomeProduto}.`;
  // Registra a mensagem de log no console
  console.log(logMessage);
}

// Seleciona todos os elementos com a classe 'card' e cria um array a partir do NodeList usando spread
const produtos = [...document.querySelectorAll(".card")];
// Adiciona um evento de clique a cada produto, chamando a função handleProductClick
produtos.forEach((produto) =>
  produto.addEventListener("click", () => handleProductClick(produto))
);

// Função para lidar com o clique na imagem
function handleImageClick(imagem) {
  // Usa desestruturação para obter o valor do atributo data-imagem
  const { imagem: src } = imagem.dataset;
  // Seleciona o elemento de imagem do modal
  const modalImagem = document.getElementById("imagemModalImg");
  // Cria uma nova instância do modal do Bootstrap
  const myModal = new bootstrap.Modal(document.getElementById("imagemModal"));
  // Define o src da imagem do modal e exibe o modal
  modalImagem.src = src;
  myModal.show();
}

// Seleciona todos os elementos com a classe 'card-img-top'
const imagens = document.querySelectorAll(".card-img-top");
// Adiciona um evento de clique a cada imagem, chamando a função handleImageClick
imagens.forEach((imagem) =>
  imagem.addEventListener("click", function () {
    handleImageClick(this);
  })
);
