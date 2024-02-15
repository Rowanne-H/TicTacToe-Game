document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');
    let grids = document.querySelectorAll('#grid>div');
    console.log(grids)

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