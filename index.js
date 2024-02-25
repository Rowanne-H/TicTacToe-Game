document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let grid = document.querySelectorAll('#grid');
    let grids = document.querySelectorAll('#grid>div');
    let scoreDisplay1 = document.querySelector('#player1-score');
    let scoreDisplay2 = document.querySelector('#player2-score');

    let Xscore = 0;
    let Oscore = 0;

    let playerMove = ['','','','','','','','',''];
    let currentPlayer = "X";
    let gameOn = true
    let winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const winningCheck = function (){
        for (const condition of winningCombinations){
            let [a,b,c] = condition
            if (playerMove[a] && (playerMove[a] === playerMove[b]) && playerMove[a] === playerMove[c]){
                return true
            }
        }
    }

    const gridClicked = function(e){
        if(gameOn === false){
            return
        }
        let index = e.target.id;
        if(!playerMove[index]){
            playerMove[index] = currentPlayer;
            e.target.innerText = currentPlayer;
            if(winningCheck() === true){
                //alert(`${currentPlayer} has won`);
                gameOn = false;
                displayWinnerFx(currentPlayer);
                addScore(currentPlayer);
                return;   
                } else{ //check for a draw if winner not achieved.
                    if(playerMove.includes('') === false){
                        gameOn = false;
                        displayDraw()
                    }
                }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    };
    

    const displayWinnerFx = (player) => {
        let displayWinner = document.querySelector('#winner');
        gameOn = false;
        displayWinner.style.visibility = 'visible'
        if(player) {
            displayWinner.innerHTML = `${player} wins!!! Press NEXT ROUND to Start again`
        } else {
            displayWinner.innerHTML = `Draw!!! Press NEXT ROUND to Start again`
        }
    };

    const displayDraw = () => {
        gameOn = false;
        let displayWinner = document.querySelector('#winner');
        displayWinner.style.visibility = 'visible'
        displayWinner.innerHTML = `Draw!!! Press NEXT ROUND to Start again`

    };
    
   //we keep the score in Xscore and OScore instead of the
   //scoreDisplay1, scoreDisplay2 html element

    const addScore = (player) => {
        if(player === 'X'){
            scoreDisplay1.innerHTML = ++Xscore
        } else{
            scoreDisplay2.innerHTML = ++Oscore
        }
    };

    
    const restartGame = function() {
        gameOn = true;
        let hideDisplay = document.querySelector('#winner');
        hideDisplay.style.visibility = 'hidden';
        playerMove = ['','','','','','','','',''];
        grids.forEach(grid => {
            grid.innerText = "";
        });
    }
    
    
    const resetGame = function() {
        Oscore = 0;
        scoreDisplay1.innerHTML = Oscore;
        Xscore = 0;
        scoreDisplay2.innerHTML = Xscore;
        currentPlayer = "X";
        restartGame()
    }

    startBtn.addEventListener('click', restartGame)

    resetBtn.addEventListener('click', resetGame)

    grids.forEach(grid => {
      grid.addEventListener('click', gridClicked) //, {once: true}) <- this prevents grid listening to click after restart 
    })
})

