let paddleRightPosition = 0
let ballXSpeed = 0
let paddleB: game.LedSprite = null
let ball: game.LedSprite = null
let paddleA: game.LedSprite = null
let ballMoveTimer = 0
let lastTimeChecked = 0
let IStart = 0
let gameIsPlaying = false
input.onButtonPressed(Button.AB, function () {
    StartMatch()
})
input.onButtonPressed(Button.A, function () {
    if (paddleA.get(LedSpriteProperty.X) > 0) {
        paddleA.change(LedSpriteProperty.X, -1)
        paddleB.change(LedSpriteProperty.X, -1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (paddleA.get(LedSpriteProperty.X) < 3) {
        paddleA.change(LedSpriteProperty.X, 1)
        paddleB.change(LedSpriteProperty.X, 1)
    }
})
function StartMatch() {
    gameIsPlaying = false
    IStart = Math.randomRange(0, 1)
    radio.sendValue("IStart", IStart)
    if (IStart == 1) {
        startBall()
    }
}
function startBall() {
    music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
    gameIsPlaying = true
}
radio.onReceivedValue(function (name, value) {
    if (name == "IStart") {
        if (value == 0) {
            startBall()
        } else {
            gameIsPlaying = false
        }
    }
    if (name == "pass") {
        startBall()
    }
    if (name == "youWin") {
        game.addScore(1)
        IWin()
    }
})
function youWin() {
    radio.sendString("youWin")
    game.removeLife(1)
    basic.showIcon(IconNames.Skull)
}
function passBall() {
    radio.sendValue("pass", ball.get(LedSpriteProperty.X))
}
function playIdle() {
    basic.showIcon(IconNames.SmallSquare)
    basic.showIcon(IconNames.Square)
}
function IWin() {
    gameIsPlaying = false
    basic.showIcon(IconNames.Happy)
    music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once)
}
function updateBall() {
    if (input.runningTime() - lastTimeChecked >= ballMoveTimer) {
        lastTimeChecked = input.runningTime()
        ball.move(1)
    }
}
radio.setGroup(1)
radio.setTransmitPower(7)
ballMoveTimer = 0
lastTimeChecked = 0
ballXSpeed = 0
paddleRightPosition = 2
ball = game.createSprite(2, 2)
ball.turn(Direction.Right, 90)
paddleA = game.createSprite(2, 4)
paddleB = game.createSprite(3, 4)
basic.forever(function () {
    if (gameIsPlaying) {
        updateBall()
    } else {
        playIdle()
    }
})
