const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  const scrollPosition = window.scrollY;

  const scrollPercentage = (scrollPosition / scrollHeight) * 100;

  progressBar.style.width = scrollPercentage + '%';
}

window.addEventListener('scroll', updateProgressBar);

updateProgressBar();

const cards = document.querySelectorAll('.memory-card');
const shuffleButton = document.getElementById('shuffle-btn');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Função para virar a carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Função para verificar se as cartas viradas são iguais
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

// Função para desabilitar as cartas após encontrar um par
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Função para desvirar as cartas se não houver correspondência
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

// Função para resetar o estado do tabuleiro
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Função para embaralhar as cartas e também desvirá-las
function shuffleCards() {
  // Desvira todas as cartas
  cards.forEach(card => card.classList.remove('flip'));

  // Embaralha as cartas
  let array = Array.from(cards);
  array = array.sort(() => Math.random() - 0.5);

  array.forEach((card, index) => {
    card.style.order = index;
    // Adiciona o evento de clique de volta após o embaralhamento
    card.addEventListener('click', flipCard);
  });

  resetBoard();
}

// Adiciona o evento de embaralhamento no botão
shuffleButton.addEventListener('click', shuffleCards);

// Embaralha as cartas automaticamente ao carregar a página
(function shuffleOnLoad() {
  shuffleCards();
})();

// Adiciona o evento de clique nas cartas
cards.forEach(card => card.addEventListener('click', flipCard));
