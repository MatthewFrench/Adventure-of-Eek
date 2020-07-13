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
            this.game.loadWindow.add("Eek", 1)
            this.game.loadWindow.add("Bob", 5)
            this.game.loadWindow.add("Ash Ketchum", 10)
            this.game.loadWindow.add("Gary", 3)
            this.game.loadWindow.add("I am awesome", 11)
            this.game.loadWindow.add("He who shall not be named", 8)
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