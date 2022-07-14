//===================| Elements |===================//
const btns = document.querySelectorAll('.game-condition button'), displayDiceSvg = document.querySelector('.dice svg')
const diceSvg = {
    1: `<circle cx="25" cy="25" r="4"/>`,
    2: `<circle cx="9" cy="25" r="4"/><circle cx="41" cy="25" r="4"/>`,
    3: `<circle cx="9" cy="9" r="4"/><circle cx="25" cy="25" r="4"/><circle cx="41" cy="41" r="4"/>`,
    4: `<circle cx="9" cy="9" r="4"/><circle cx="41" cy="9" r="4"/><circle cx="9" cy="41" r="4"/><circle cx="41" cy="41" r="4"/>`,
    5: `<circle cx="9" cy="9" r="4"/><circle cx="41" cy="9" r="4"/><circle cx="25" cy="25" r="4"/><circle cx="9" cy="41" r="4"/><circle cx="41" cy="41" r="4"/>`,
    6: `<circle cx="9" cy="9" r="4"/><circle cx="41" cy="9" r="4"/><circle cx="9" cy="41" r="4"/><circle cx="41" cy="41" r="4"/><circle cx="9" cy="25" r="4"/><circle cx="41" cy="25" r="4"/>`,
}

//===================| Events |===================//
btns.forEach((btn, key) => {
    switch(key) {
        case 1:
            btn.onclick = rollDice
            break

        case 2:
            btn.onclick = hold
            break

        default:
            btn.onclick = restart
    }
})

//===================| Functions |===================//
/**
 * Constructor function of a player.
 */
function Player() {
    this.round = 0
    this.global = 0
    this.getRound = function() {
        return this.round
    }
    this.setRound = function(newRound) {
        this.round = newRound
    }
}

/**
 * Function that creates a `ramdom number` between one and six. Its set the svg dice inner html and the `round` property of the current player.
 */
function rollDice() {
    const num = Math.floor(((Math.random() * 6) + 1))
    displayDiceSvg.innerHTML = diceSvg[num]
}

function hold() {
}

function restart() {
}