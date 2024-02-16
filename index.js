document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let grids = document.querySelectorAll('#grid>div');
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
