// store computer score and player score
let computerScore = 0;
let playerScore = 0;

game();

function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    let computerChoice = Math.floor(Math.random() * 3);
    return options[computerChoice].charAt(0).toLowerCase();
}

function playRound(playerChoice, computerChoice) {
    switch (playerChoice) {
        case "r":
            switch (computerChoice) {
                case "r":
                    console.log("It's a tie");
                    break;
                case "p":
                    console.log("Computer won the round");
                    computerScore++;
                    break;
                case "s":
                    console.log("You won the round");
                    playerScore++;
                    break;
            }
            break;
        case "p":
            switch (computerChoice) {
                case "r":
                    console.log("You won the round");
                    playerScore++;
                    break;
                case "p":
                    console.log("It's a tie");
                    break;
                case "s":
                    console.log("Computer won the round");
                    computerScore++;
                    break;
            }
            break;
        case "s":
            switch (computerChoice) {
                case "r":
                    console.log("Computer won the round");
                    computerScore++;
                    break;
                case "p":
                    console.log("You won the round");
                    playerScore++;
                    break;
                case "s":
                    console.log("It's a tie!");
                    break;
            }
            break;
        default:
            console.log(
                "Computer won the round because you've entered an invalid value."
            );
            computerScore++;
    }
}

function game() {
    for (let i = 0; i < 5; i++) {
        // take user input (rock-paper-scissors)
        let userInput = prompt("Rock, paper, or scissors? ")
            .charAt(0)
            .toLowerCase();
        // let computer play
        playRound(userInput, computerChoice);
        // determine winner
        // keep playing until score reaches 5
        if (playerScore === 5) {
            console.log("You won the game. Congrats!");
            return;
        } else if (computerScore === 5) {
            console.log(
                "Computer won the game. Pray for a better luck next time!"
            );
            return;
        }
    }
    if (playerScore > computerScore) {
        console.log("You won the game. Congrats!");
    } else {
        console.log("Computer won the game. Pray for a better luck next time!");
    }
}
