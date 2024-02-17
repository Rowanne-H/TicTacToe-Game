document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let grids = document.querySelectorAll('#grid>div');
    let scoreDisplay1 = document.querySelector('#player1-score');
    let scoreDisplay2 = document.querySelector('#player2-score');
    let Xscore = 0;
    let Oscore = 0;
    const playerX = "X";
    const playerO = "O";
    let playerMove = ['','','','','','','','',''];
    let currentPlayer = playerX;
    let currentTurn = 0;
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
        let index = e.target.id;
        ++currentTurn;
        if(!playerMove[index]){
            playerMove [index] = currentPlayer;
            e.target.innerText = currentPlayer;
            if(winningCheck() == true){
                //alert(`${currentPlayer} has won`);
                displayWinnerFx(currentPlayer);
                addScore(currentPlayer);
                return;   
                } else{ //check for a draw if winner not achieved.
                    if(currentTurn === 9){
                        displayDraw()
                    }
                }
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        }
    };
    
    const displayWinnerFx = (player) => {
        let displayWinner = document.querySelector('#winner');
        displayWinner.style.visibility = 'visible'
        if(player) {
            displayWinner.innerHTML = `${player} wins!!! Press NEXT ROUND to Start again`
        } else {
            displayWinner.innerHTML = `Draw!!! Press NEXT ROUND to Start again`
        }
    };

    const displayDraw = () => {
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
        let hideDisplay = document.querySelector('#winner');
        hideDisplay.style.visibility = 'hidden';
        playerMove = ['','','','','','','','',''];
        currentTurn = 0;
        console.log(playerMove);
        grids.forEach(grid => {
            grid.innerText = "";
        });
    }
    
    const resetGame = function() {
        Oscore = 0;
        scoreDisplay1.innerHTML = Oscore;
        Xscore = 0;
        scoreDisplay2.innerHTML = Xscore;
        restartGame()
    }

    startBtn.addEventListener('click', restartGame)

    resetBtn.addEventListener('click', resetGame)
    grids.forEach(grid => {
      grid.addEventListener('click', gridClicked) //, {once: true}) <- this prevents grid listening to click after restart 
    })
})

