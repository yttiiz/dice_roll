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

const players = new Players()

//===================| Functions |===================//
/**
 * Constructor function of the players management.
 */
function Players() {
    const globalScoreDivs = document.querySelectorAll('.player-global-score div'), currentScoreSpans = document.querySelectorAll('.player-current-score span:last-child')

    this.player1 = {
        id: 0,
        round: 0,
        global: 0,
        playing: true
    }
    this.player2 = {
        id: 1,
        round: 0,
        global: 0,
        playing: false
    }

    this.setRound = function(newRound) {
        const setPlayer = (player) => {
            if (newRound > 1) {
                player.round += newRound
                currentScoreSpans[player.id].textContent = player.round
            } else {
                player.round = 0
                player.playing = false

                if (player.id === 0) {
                    this.player2.playing = true
                } else if (player.id === 1) {
                    this.player1.playing = true
                }
            }
        }

        switch(true) {
            case this.player1.playing:
                setPlayer(this.player1)
                break

            case this.player2.playing:
                setPlayer(this.player2)
                break
        }
    }

    this.setGlobal = function(newGlobal) {
        this.global = newGlobal
    }
}

/**
 * Function that creates a `ramdom number` between one and six. Its set the svg dice inner html and the `round` property of the current player.
 */
function rollDice() {
    const num = Math.floor(((Math.random() * 6) + 1))
    displayDiceSvg.innerHTML = diceSvg[num]
    players.setRound(num)
}

function hold() {
}

function restart() {
}