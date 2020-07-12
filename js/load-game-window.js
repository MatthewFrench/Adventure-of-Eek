export class LoadGameWindow {
    constructor(game) {
        this.game = game;
        this.window = document.getElementById("load-game-window")
        this.backButton = document.getElementById("load-game-back-button")
        this.backButton.onclick = () => {
            this.hide()
            this.game.newGameWindow.show()
        }
    }
    show() {
        this.window.style.display = ""
    }
    hide() {
        this.window.style.display = "none"
    }
}