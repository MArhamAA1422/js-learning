const score = {
    wins: 0,
    losses: 0,
    ties: 0
};

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    printScore();
}

function computerMove() {
    const move = Math.random();
    if (move <= 1 / 3) return 'rock'
    if (move <= 2 / 3) return 'paper';
    return 'scissors';
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            if (isAutoPlaying) updateScore(computerMove());
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    updateScore('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    updateScore('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    updateScore('scissors');
});

function updateScore(move) {
    const computer = computerMove();
    // console.log(move, computer);
    updateMoveIcons(move, computer);

    let result = '';

    if (computer === move) {
        result = 'Tie.';
        score.ties += 1;
    } else if (move === 'rock') {
        if (computer === 'scissors') {
            result = 'You win.';
            score.wins += 1;
        } else {  // paper
            result = 'You lose.';
            score.losses += 1;
        }
    } else if (move === 'paper') {
        if (computer === 'scissors') {
            result = 'You lose.';
            score.losses += 1;
        } else {  // rock
            result = 'You win.';
            score.wins += 1;
        }
    } else {  // scissors
        if (computer === 'paper') {
            result = 'You win.';
            score.wins += 1;
        } else {  // rock
            result = 'You lose.';
            score.losses += 1;
        }
    }

    updateResult(result);
}

function updateMoveIcons(move, computer) {
    if (move === 'rock') {
        document.querySelector('.move-update').innerHTML = 'You <img src = "../img/rock-emoji.png" class="move-emoji">';
    } else if (move === 'paper') {
        document.querySelector('.move-update').innerHTML = 'You <img src = "../img/paper-emoji.png" class="move-emoji">';
    } else if (move === 'scissors') {
        document.querySelector('.move-update').innerHTML = 'You <img src = "../img/scissors-emoji.png" class="move-emoji">';
    }

    if (computer === 'rock') {
        document.querySelector('.computer-move-update').innerHTML = '<img src="../img/rock-emoji.png" class="move-emoji"> Computer';
    } else if (computer === 'paper') {
        document.querySelector('.computer-move-update').innerHTML = '<img src="../img/paper-emoji.png" class="move-emoji"> Computer';
    } else if (computer === 'scissors') {
        document.querySelector('.computer-move-update').innerHTML = '<img src="../img/scissors-emoji.png" class="move-emoji"> Computer';
    }
}

function updateResult(result) {
    // console.log(typeof result);
    document.querySelector('.result').innerHTML = result;

    printScore();
}

function printScore() {
    document.querySelector('.score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};