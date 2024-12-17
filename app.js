const startButton = document.getElementById("startGame");
const resetButton = document.getElementById("resetGame");
const gameBoard = document.getElementById("gameBoard");
const timerDisplay = document.getElementById("timeLeft");
const resultDisplay = document.getElementById("result");
const effectDisplay = document.getElementById("effect");

let cardsArray = ["🎅", "🎄", "🎁", "🔔", "🦌", "❄️"];
let gameCards = [...cardsArray, ...cardsArray];
let flippedCards = [];
let matchedCards = [];
let timer;
let timeLeft = 30;

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

function startGame() {
    startButton.classList.add("hidden");
    resetButton.classList.remove("hidden");
    gameBoard.classList.remove("hidden");
    resultDisplay.classList.add("hidden");
    effectDisplay.classList.add("hidden");
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;

    shuffle(gameCards);
    createGameBoard();

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            endGame("You Lose!");
        }
    }, 1000);
}

function createGameBoard() {
    gameBoard.innerHTML = "";
    gameCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.value = card;
        cardElement.innerHTML = `
            <div class="front">❓</div>
            <div class="back">${card}</div>
        `;
        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("matched")) {
        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === gameCards.length) {
            endGame("You Win!");
            effectDisplay.classList.remove("hidden");
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 500);
    }
}

function endGame(message) {
    clearInterval(timer);
    resultDisplay.textContent = message;
    resultDisplay.classList.remove("hidden");
}

function resetGame() {
    clearInterval(timer);
    matchedCards = [];
    flippedCards = [];
    startButton.classList.remove("hidden");
    resetButton.classList.add("hidden");
    gameBoard.classList.add("hidden");
    resultDisplay.classList.add("hidden");
    timerDisplay.textContent = "30";
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Snow Animation */
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");
let snowflakes = [];

function setupSnowCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createSnowflakes() {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random(),
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 3 + 1,
        radius: Math.random() * 4 + 1,
    });
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();
    });
}

function moveSnowflakes() {
    snowflakes.forEach((flake) => {
        flake.y += flake.speedY;
        flake.x += flake.speedX;

        if (flake.y > canvas.height) {
            flake.y = -flake.radius;
        }
    });
}

function animateSnow() {
    drawSnowflakes();
    moveSnowflakes();
    requestAnimationFrame(animateSnow);
}

window.addEventListener("resize", setupSnowCanvas);
setupSnowCanvas();
for (let i = 0; i < 100; i++) createSnowflakes();
animateSnow();
