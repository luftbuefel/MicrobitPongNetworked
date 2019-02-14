let ballXSpeed = 0
let paddleB: game.LedSprite = null
let lastTimeChecked = 0
let paddleA: game.LedSprite = null
let ballMoveTimer = 0
let ball: game.LedSprite = null
let IStart = 0
let gameIsPlaying = false
function youWin() {
    radio.sendString("youWin")
    game.removeLife(1)
}
input.onButtonPressed(Button.A, function () {
    if (paddleA.get(LedSpriteProperty.X) > 0) {
        paddleA.change(LedSpriteProperty.X, -1)
        paddleB.change(LedSpriteProperty.X, -1)
    }
})
function passBall() {
    radio.sendValue("pass", ball.get(LedSpriteProperty.X))
}
input.onButtonPressed(Button.B, function () {
    if (paddleA.get(LedSpriteProperty.X) < 3) {
        paddleA.change(LedSpriteProperty.X, 1)
        paddleB.change(LedSpriteProperty.X, 1)
    }
})
function IStart2() {
    IStart = Math.randomRange(0, 1)
    radio.sendValue("IStart", IStart)
    if (IStart == 1) {
        startBall()
    }
}
function startBall() {
    gameIsPlaying = true
    basic.showIcon(IconNames.Heart)
}
radio.onReceivedValue(function (name, value) {
    if (name == "IStart") {
        if (value == 0) {
            startBall()
        } else {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            gameIsPlaying = false
        }
    } else {
    	
    }
})
gameIsPlaying = false
radio.setGroup(1)
radio.setTransmitPower(7)
IStart2()
basic.forever(function () {
    if (gameIsPlaying) {
    	
    }
})
