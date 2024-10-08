//===================| Elements |===================//
const btns = document.querySelectorAll('.game-condition button'),
    displayDiceSvg = document.querySelector('.dice svg'),
    screenIndicator = document.querySelector('.indicator')
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
    const globalScoreDivs = document.querySelectorAll('.player-global-score > div:last-child'),
        currentScoreSpans = document.querySelectorAll('.player-current-score span:last-child'),
        spanMarker = document.querySelectorAll('.span-mark')

    /**
     * Switch between the old active player and the new one.
     * @param {Number} num Current player id. 
     */
     const setActivePlayer = (num) => {
        spanMarker[num].classList.add('none')
        spanMarker[num].parentNode.parentNode.parentNode.classList.remove('active')
        
        switch(num) {
            case 0:
                this.player2.playing = true
                spanMarker[num + 1].classList.remove('none')
                spanMarker[num + 1].parentNode.parentNode.parentNode.classList.add('active')
                break
                
            case 1:
                this.player1.playing = true
                spanMarker[num - 1].classList.remove('none')
                spanMarker[num - 1].parentNode.parentNode.parentNode.classList.add('active')
                break
        }
    }

    /**
     * Check the `playing` property value of the current player.
     * @param {Function} fn Function that set the property player cibling. 
     */
    const switchPlayerTurn = (fn) => {
        switch(true) {
            case this.player1.playing:
                fn(this.player1)
                break

            case this.player2.playing:
                fn(this.player2)
                break
        }
    }

    /**
     * Set the content of the `SVG` and `Span` Elements.
     * @param {Object} player Current player.
     * @param {Number} num Ramdom number of the dice.
     */
    const setSVGandSpanContent = (player, num) => {
        displayDiceSvg.innerHTML = diceSvg[num]
        currentScoreSpans[player.id].textContent = player.round
    }

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
        /**
         * Set the current player round property.
         * @param {Object} player Current player.
         */
        const setPlayerRound = (player) => {
            if (player.global >= 100) return

            if (newRound > 1) {
                player.round += newRound
                setSVGandSpanContent(player, newRound)
            } else {
                player.round = 0
                player.playing = false
                setSVGandSpanContent(player, newRound)
                setActivePlayer(player.id)
            }
        }

        switchPlayerTurn(setPlayerRound)
    }

    this.setGlobal = function() {
        /**
         * Set the current player global property.
         * @param {Object} player Current player.
         */
        const setPlayerGlobal = (player) => {
            player.global += player.round
            player.playing = false

            if (player.global >= 100) {
                screenIndicator.innerHTML = `<b>Player ${player.id + 1}</b> win the game with <strong>${player.global}</strong> points.`
                globalScoreDivs[player.id].textContent = player.global
                screenIndicator.classList.remove('hidden')
                return
            }

            globalScoreDivs[player.id].textContent = player.global
            player.round = 0
            currentScoreSpans[player.id].textContent = player.round
            setActivePlayer(player.id)
        }

        switchPlayerTurn(setPlayerGlobal)
    }
}

/**
 * Creates a `ramdom number` between one and six. It set the svg dice inner html and the `round` property of the current player.
 */
function rollDice() {
    const num = Math.floor(((Math.random() * 6) + 1))
    players.setRound(num)
}

/**
 * Push the current score to the additionnal global score of the current player.
 */
function hold() {
    players.setGlobal()
}

/**
 * Reinitialisation of the game.
 */
function restart() {
    window.document.location.reload()
}