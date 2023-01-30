// store computer score and player score
let computerScore = 0;
let playerScore = 0;
let ties = 0;
let roundsPlayed = 0;
let page = document.querySelector(".page-container");

// take user input (rock-paper-scissors)
let userInput;
const buttonList = document.querySelectorAll(".button");
buttonList.forEach((button) =>
    button.addEventListener("click", (e) => playRound(e, button))
);

function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    let computerChoice = Math.floor(Math.random() * 3);
    return options[computerChoice];
}

function determineRoundWinner(playerChoice, computerChoice) {
    switch (playerChoice) {
        case "r":
            switch (computerChoice) {
                case "r":
                    ties++;
                    break;
                case "p":
                    computerScore++;
                    break;
                case "s":
                    playerScore++;
                    break;
            }
            break;
        case "p":
            switch (computerChoice) {
                case "r":
                    playerScore++;
                    break;
                case "p":
                    ties++;
                    break;
                case "s":
                    computerScore++;
                    break;
            }
            break;
        case "s":
            switch (computerChoice) {
                case "r":
                    computerScore++;
                    break;
                case "p":
                    playerScore++;
                    break;
                case "s":
                    ties++;
                    break;
            }
            break;
    }
}

async function playRound(e, button) {
    disableButtons();
    e.stopPropagation();
    roundsPlayed++;
    // let computer play
    let computerChoice = getComputerChoice();
    // determine winner
    determineRoundWinner(button.id.charAt(0), computerChoice.charAt(0));
    //update the scoreboard
    updateScoreBoard();
    //keep playing until 10 rounds are played
    if (roundsPlayed === 10) {
        await sleep(1000);
        computerScore > playerScore
            ? announceWinner("Computer")
            : playerScore > computerScore
            ? announceWinner("Player")
            : announceWinner("Tie");
        onGameEnd();
    } else {
        enableButtons();
    }
}

function announceWinner(winner) {
    let winnerFeedBack = document.createElement("h1");
    let classList = ["game-ended", "winner-feedback"];
    classList.forEach((_class) => {
        winnerFeedBack.classList.add(_class);
    });
    winnerFeedBack.textContent =
        winner !== "Tie" ? `${winner.toUpperCase()} WINS!` : "IT'S A TIE!";
    page.appendChild(winnerFeedBack);
}

function updateScoreBoard() {
    let scoreTexts = document.querySelectorAll(".score-text");
    let score;
    scoreTexts.forEach((scoreText) => {
        switch (scoreText.id) {
            case "player-score":
                score = playerScore;
                break;
            case "computer-score":
                score = computerScore;
                break;
            case "ties":
                score = ties;
                break;
        }
        scoreText.querySelector(".score").textContent = score;
    });
}

function disableButtons() {
    buttonList.forEach((button) => {
        button.disabled = true;
        button.classList.remove("working");
    });
}

function enableButtons() {
    buttonList.forEach((button) => {
        button.disabled = false;
        button.classList.add("working");
    });
}

function onGameEnd() {
    page.querySelectorAll("*").forEach((element) => {
        if (!element.classList.contains("game-ended")) {
            element.style.visibility = "hidden";
        }
    });
    let playAgainButton = document.createElement("button");
    playAgainButton.classList.add("game-ended");
    playAgainButton.textContent = "PLAY AGAIN";
    playAgainButton.addEventListener("click", (e) =>
        restartGame(e, playAgainButton)
    );
    page.appendChild(playAgainButton);
}

async function restartGame(e, playAgainButton) {
    e.stopPropagation();
    playAgainButton.style.transform = "translateY(4px) scale(1.1)";
    await sleep(100);
    computerScore = 0;
    playerScore = 0;
    ties = 0;
    roundsPlayed = 0;
    updateScoreBoard();
    enableButtons();
    page.querySelectorAll("*").forEach((element) => {
        if (!element.classList.contains("game-ended")) {
            element.style.visibility = "visible";
        } else {
            page.removeChild(element);
        }
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
