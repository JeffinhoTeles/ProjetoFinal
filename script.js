// Seleciona todos os elementos com a classe 'card', que representam os produtos na página
const produtos = document.querySelectorAll(".card");

// Para cada produto encontrado, adiciona um evento de clique
produtos.forEach((produto) => {
  produto.addEventListener("click", () => {
    // Obtém o nome do produto a partir do elemento com a classe 'card-title' dentro do produto clicado
    const nomeProduto = produto.querySelector(".card-title").innerText;

    // Exibe um prompt para o usuário inserir a quantidade desejada do produto
    const quantidade = prompt(
      `Quantas unidades do ${nomeProduto} você deseja?`
    );

    // Verifica se o usuário inseriu uma quantidade
    if (quantidade) {
      // Se uma quantidade foi inserida, exibe um alerta confirmando a adição ao carrinho
      alert(
        `Você adicionou ${quantidade} unidades do ${nomeProduto} ao carrinho.`
      );
      // Registra no console a quantidade e o nome do produto adicionado
      console.log(`Produto: ${nomeProduto}, Quantidade: ${quantidade}`);
    } else {
      // Se nenhuma quantidade foi inserida, exibe um alerta informando que nada foi adicionado
      alert("Nenhuma quantidade foi adicionada.");
      // Registra no console que nenhuma quantidade foi adicionada para o produto clicado
      console.log(
        `Nenhuma quantidade foi adicionada para o produto ${nomeProduto}.`
      );
    }
  });
});
