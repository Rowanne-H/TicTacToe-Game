document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let grids = document.querySelectorAll('#grid>div');
    let scoreDisplay1 = document.querySelector('#player1-score');
    let scoreDisplay2 = document.querySelector('#player2-score');
    let displayWinner = document.querySelector('#winner');
    let onePlayerBtn = document.querySelector('#one-player');
    let twoPlayerBtn = document.querySelector('#two-player');
    let computer = false;

    let Xscore = 0;
    let Oscore = 0;
    let playerMove = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = "X";
    let gameOn = true
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winningCheck = function () {
        for (const condition of winningCombinations) {
            let [a, b, c] = condition
            if (playerMove[a] && (playerMove[a] === playerMove[b]) && playerMove[a] === playerMove[c]) {
                return true
            }
        }
    }

    const switchPlayer = (player) => {
        if (player === 'X') {
            currentPlayer = 'O';
            player1.className = '';
            player2.className = 'current-player'; 
        } else {
            currentPlayer = 'X';
            player1.className = 'current-player';
            player2.className = '';
        }
    }

    const gridClicked = function (e) {
        if (gameOn === false) {
            return
        }
        let index = e.target.id;
        if (!playerMove[index]) {
            playerMove[index] = currentPlayer;
            e.target.innerText = currentPlayer;
            if (winningCheck() === true) {
                displayWinnerFx(currentPlayer);
                addScore(currentPlayer);
                return;
            } else { //check for a draw if winner not achieved.
                if (playerMove.includes('') === false) {
                    displayWinnerFx();
                    return;
                }
            }
            switchPlayer(currentPlayer)
        }
    };

    const displayWinnerFx = (player) => {
        gameOn = false;
        displayWinner.style.visibility = 'visible';
        if (player) {
            displayWinner.innerHTML = `${player} wins!!! Press NEXT ROUND to Start again`
        } else {
            displayWinner.innerHTML = `Draw!!! Press NEXT ROUND to Start again`
        }
    };

    const addScore = (player) => {
        if (player === 'X') {
            scoreDisplay1.innerHTML = ++Xscore
        } else {
            scoreDisplay2.innerHTML = ++Oscore
        }
    };

    const restartGame = function () {
        gameOn = true;
        displayWinner.style.visibility = 'hidden';
        playerMove = ['', '', '', '', '', '', '', '', ''];
        grids.forEach(grid => {
            grid.innerText = "";
        });
    }

    const resetGame = function () {
        Oscore = 0;
        scoreDisplay1.innerHTML = Oscore;
        Xscore = 0;
        scoreDisplay2.innerHTML = Xscore;
        switchPlayer('O');
        restartGame()
    }

    startBtn.addEventListener('click', restartGame)

    resetBtn.addEventListener('click', resetGame)

    grids.forEach(grid => {
        grid.addEventListener('click', gridClicked) //, {once: true}) <- this prevents grid listening to click after restart 
    })
})

