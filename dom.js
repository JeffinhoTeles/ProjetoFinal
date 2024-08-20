// Função para exibir uma mensagem de feedback ao usuário
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

// Função para tratar o clique na imagem do produto
function handleImageClick(image) {
  const imagemModal = document.querySelector("#imagemModalImg");
  imagemModal.src = image.dataset.imagem;
}
