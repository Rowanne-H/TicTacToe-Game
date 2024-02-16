document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let grids = document.querySelectorAll('#grid>div');
    let scoreDisplay1 = document.querySelector('#player1-score');
    let scoreDisplay2 = document.querySelector('#player2-score');

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
        grid.addEventListener('click', () => {
            alert('grid')
        })
    })  
})