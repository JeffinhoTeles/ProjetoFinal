// Evento que aguarda o carregamento completo do DOM antes de executar o código
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

  document.querySelector("#finalizarCompra").addEventListener("click", () => {
    finalizarCompra();
  });

  updateCartCount();
});
