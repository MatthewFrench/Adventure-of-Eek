export class NewGameWindow {
    constructor(game) {
        this.game = game;
        this.window = document.getElementById("new-game-window")
        this.newGameButton = document.getElementById("new-game-button")
        this.newGameButton.onclick = () => {
            this.hide()
            this.game.characterCreatorWindow.show()
        }
    }
    show() {
        this.window.style.display = ""
    }
    hide() {
        this.window.style.display = "none"
    }
}