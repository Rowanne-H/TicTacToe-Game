document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let grids = document.querySelectorAll('#grid>div');
     let scoreDisplay1 = document.querySelector('#player1-score');
    let scoreDisplay2 = document.querySelector('#player2-score');
  

    let playerMove = ['','','','','','','','','']
    const playerX = "X";
    const playerO = "O";
    let currentPlayer = playerX;
    let winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    const winningCheck = function (){
        for (const condition of winningCombinations){
            let [a,b,c] = condition
            if (playerMove[a] && (playerMove[a] === playerMove[b]) && playerMove[a] === playerMove[c]){
                return true
            }
        }
    }
    const gridClicked = function(e){
        let index = e.target.id
        if(!playerMove[index]){
            playerMove [index] = currentPlayer;
            e.target.innerText = currentPlayer;
            if(winningCheck() == true){
                alert(`${currentPlayer} has won`)
                return;   
        }
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        }
    }
    


    let displayWinnerOrDraw = (player) => {
        let displayWinner = document.querySelector('#winner');
        displayWinner.style.visibility = 'visible'
        if(player) {
            displayWinner.innerHTML = `${player} wins!!!`
        } else {
            displayWinner.innerHTML = `Draw!!!`
        }    
    }
    
    let addScore = (player) => {
        let scoreDisplay = scoreDisplay1;
        if (player === 'X') { scoreDisplay = scoreDisplay2}
        let score = parseInt(scoreDisplay.innerHTML);
        score+=10;
        scoreDisplay.innerHTML = score;
    }


    startBtn.addEventListener('click', ()=>{
        alert('start')
    })

    resetBtn.addEventListener('click', ()=>{
        alert('reset')
    })
    grids.forEach(grid => {
      grid.addEventListener('click', gridClicked, {once: true})
    })
})

