document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let grids = document.querySelectorAll('#grid>div');
    let scoreDisplay1 = document.querySelector('#player1-score');
    let scoreDisplay2 = document.querySelector('#player2-score');
    let displayWinner = document.querySelector('#winner');
    let onePlayerBtn = document.querySelector('#one-player');
    let twoPlayerBtn = document.querySelector('#two-player');
    let player1 = document.querySelector('#player1');
    let player2 = document.querySelector('#player2');
    let gameOn = false;
    let computer = false;

    let Xscore = 0;
    let Oscore = 0;
    let playerMove = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = "X";
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

    const placeO = (i) => {//please update if there is a simpler way to get element by ID using a variable with index stored in it
        playerMove[i] = 'O';
        if (i == 0) {
            document.getElementById('0').innerHTML = 'O';
        } else if (i == 1) {
            document.getElementById('1').innerHTML = 'O';
        } else if (i == 2) {
            document.getElementById('2').innerHTML = 'O';
        } else if (i == 3) {
            document.getElementById('3').innerHTML = 'O';
        } else if (i == 4) {
            document.getElementById('4').innerHTML = 'O';
        } else if (i == 5) {
            document.getElementById('5').innerHTML = 'O';
        } else if (i == 6) {
            document.getElementById('6').innerHTML = 'O';
        } else if (i == 7) {
            document.getElementById('7').innerHTML = 'O';
        } else {
            document.getElementById('8').innerHTML = 'O';
        }  
    }

    const computerTurn = () => {
        let count;
        let iToUse;
        let checkAgain = true;

        //if there are 2 'O', place O in the index of ''
        for (let i = 0; i < winningCombinations.length; i++) {
            count = 0;
            iToUse = -1;
            for (let j = 0; j < winningCombinations[i].length; j++) {
                let index = winningCombinations[i][j];
                if (playerMove[index] === 'O') { count++ }
                if (playerMove[index] === '') { iToUse = index }
                console.log(winningCombinations[i]+ 'count    '+ count+ ' i   '+   index + ' p   '+playerMove[index])
            }
            if (count === 2 && iToUse != -1) {
                placeO(iToUse);
                displayWinnerFx('O');
                return;
            }
            
        } 
        console.log('f')   

        //if there are 2 'X', place O in the index of ''
        if (checkAgain === true) {
            for (let i = 0; i < winningCombinations.length; i++) {
                count = 0;
                iToUse = -1;
                for (let j = 0; j < winningCombinations[i].length; j++) {
                    let index = winningCombinations[i][j];
                    if (playerMove[index] === 'X') { count++ }//count X
                    if (playerMove[index] === '') { iToUse = index; }//find index of ''
                }
                if (count === 2 && iToUse != -1) {
                    placeO(iToUse)
                    checkAgain = false;
                    break;
                }
            }
        }

        //if there is no 'O', place O in the middle or if middle has 'X', place O in the first index of ''
        if (checkAgain === true) {
            if (playerMove[4] === '') {
                iToUse = 4;
            } else {
                iToUse = playerMove.indexOf('');
            }
            placeO(iToUse);
        }

        gameOn = true;
        switchPlayer(currentPlayer);
    }

    const gridClicked = function (e) {
        if (gameOn === true) {
            let index = e.target.id;
            if (!playerMove[index]) {
                playerMove[index] = currentPlayer;
                e.target.innerText = currentPlayer;
                if (winningCheck() === true) {
                    displayWinnerFx(currentPlayer);
                } else if (playerMove.includes('') === false) { //check for a draw if winner not achieved.
                    displayWinnerFx();
                } else {
                    if (computer === 'O') {//whether the next player is computer
                        gameOn = false;
                        switchPlayer(currentPlayer);
                        setTimeout(computerTurn, 500);
                    } else {
                        switchPlayer(currentPlayer)
                    }
                }
            }
        }
    }

    const displayWinnerFx = (player) => {
        gameOn = false;
        displayWinner.style.visibility = 'visible';
        if (player) {
            displayWinner.innerHTML = `${player} wins!!! Press NEXT ROUND to Start again`
            addScore(currentPlayer)
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
        setTimeout(() => {
            if (currentPlayer === 'O' && computer === 'O') {
                placeO(4);
                switchPlayer(currentPlayer)
            }
            gameOn = true;
        }, 500)
    }

    onePlayerBtn.addEventListener('click', () => {
        if (gameOn === false && computer === false) {
            gameOn = true;
            computer = 'O';
            switchPlayer('O');
            player2.innerHTML = 'Computer';
            onePlayerBtn.style.color = 'gray';
        }
    })

    twoPlayerBtn.addEventListener('click', () => {
        if (gameOn === false && computer === false) {
            gameOn = true;
            switchPlayer('O');
            twoPlayerBtn.style.color = 'gray';
        }
    })

    const resetGame = function () {
        Oscore = 0;
        scoreDisplay1.innerHTML = Oscore;
        Xscore = 0;
        scoreDisplay2.innerHTML = Xscore;
        onePlayerBtn.style.color = '';
        twoPlayerBtn.style.color = '';
        player1.className = '';
        player2.className = '';
        player2.innerHTML = 'player 2';
        restartGame();
        gameOn = false;
        computer = false;
    }

    startBtn.addEventListener('click', restartGame)

    resetBtn.addEventListener('click', resetGame)

    grids.forEach(grid => {
        grid.addEventListener('click', gridClicked) //, {once: true}) <- this prevents grid listening to click after restart 
    })
})

