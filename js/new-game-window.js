export class NewGameWindow {
    constructor(game) {
        this.game = game;
        this.window = document.getElementById("new-game-window")
        this.newGameButton = document.getElementById("new-game-button")
        this.newGameButton.onclick = () => {
            this.hide()
            this.game.characterCreatorWindow.show()
        }
        this.loadGameButton = document.getElementById("load-game-button")
        this.loadGameButton.onclick = () => {
            this.hide()
            this.game.loadWindow.show()
        }
        this.aboutButton = document.getElementById("about-game-button")
        this.aboutButton.onclick = () => {
            this.hide()
            this.game.aboutWindow.show()
        }
    }
    show() {
        this.window.style.display = ""
    }
    hide() {
        this.window.style.display = "none"
    }
}