
// #region Game Logic And Data


//DATA
let Clickcount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxsize = 300
let currentPopcount = 0
let highestpopcount = 0
let gameLength = 10000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}
let currentcolor = "red"
let possiblecolors = ["green", "blue", "purple", "pink", "red"]


function startgame() {
    document.getElementById("game-controls").classList.remove("hidden")
    document.getElementById("main-controls").classList.add("hidden")
    document.getElementById("scoreboard").classList.add("hidden")
    startClock()
    setTimeout(stopGame, gameLength)
}

function startClock() {
    timeRemaining = gameLength
    drawClock()
    clockId = setInterval(drawClock, 1000)

}
function stopClock() {
    clearInterval(clockId)
}
function drawClock() {
    let countdownElem = document.getElementById("countdown")
    countdownElem.innerText = (timeRemaining / 1000).toString()
    timeRemaining -= 1000
}


function inflate() {
    Clickcount++
    height += inflationRate
    width += inflationRate
    checkBalloonPop()
    draw()
}
function checkBalloonPop() {
    if (height >= maxsize) {
        console.log("pop the balloon")
        let balloonElement = document.getElementById("balloon")
        document.getElementById("pop-sound").play()
        currentPopcount++
        height = 40
        width = 0
    }
}

function getRandomcolor() {
    let i = math.floor(math.random() * possiblecolors.length);
    currentcolor = possiblecolors[i]
}

function draw() {
    let balloonElement = document.getElementById("balloon")
    let ClickcountElem = document.getElementById("Clickcount")
    let popcountElem = document.getElementById("pop count")
    let highpopcountElem = document.getElementById("high-pop-count")
    let playerNameElem = document.getElementById("player-name")


    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    ClickcountElem.innerText = Clickcount.toString()
    popcountElem.innerText = currentPopcount.toString()
    highpopcountElem.innerText = currentPlayer.topScore.toString()
    playerNameElem.innerText = currentPlayer.name
}




function stopGame() {
    console.log("Game Over")

    document.getElementById("main-controls").classList.remove("hidden")
    document.getElementById("game-controls").classList.add("hidden")
    document.getElementById("scoreboard").classList.remove("hidden")


    Clickcount = 0
    height = 120
    width = 100

    if (currentPopcount > currentPlayer.topScore) {
        currentPlayer.topScore = currentPopcount
        savePlayer()
    }
    currentPopcount = 0

    stopClock()
    draw()
    drawScoreboard()
}






// #endregion

let players = []
loadPlayers()


function setPlayer(event) {
    event.preventDefault()
    let form = event.target

    let playerName = form.playerName.value

    currentPlayer = players.find(player => player.name == playerName)

    if (!currentPlayer) {
        currentPlayer = { name: playerName, topScore: 0 }
        players.push(currentPlayer)
        savePlayer()
    }

    form.reset()
    document.getElementById("game").classList.remove("hidden")
    form.classList.add("hidden")
    draw()
    drawScoreboard()
}

function changePlayer() {
    document.getElementById("player-form").classList.remove("hidden")
    document.getElementById("game").classList.add("hidden")
}

function savePlayer() {
    window.localStorage.setItem("players", JSON.stringify(players))
}
function loadPlayers() {
    let playersData = JSON.parse(window.localStorage.getItem("players"))
    if (playersData) {
        players = playersData
    }
}

function drawScoreboard() {
    let template = ""

    players.sort((p1, p2) => p2.topScore - p1.topScore)

    players.forEach(player => {
        template += `
        <div class="d-flex space-between">
            <span> 
                <i class="fa fa-user-o" aria-hidden="true"></i>
                ${player.name}
            </span>
            <span>${player.topScore}</span>
         </div>  
        `
    })

    document.getElementById("players").innerHTML = template
}

drawScoreboard()