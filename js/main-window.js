export class MainWindow {
    constructor(game) {
        this.game = game;
        this.mainTextDiv = document.getElementById("mainTextDiv")
        this.itemsButton = document.getElementById("itemsButton")
        this.itemsButton.onclick = () => {
            this.game.itemsPopover.popover.style.display = "";
        }
        this.statsButton = document.getElementById("statsButton")
        this.statsButton.onclick = () => {
            this.game.statsPopover.show();
        }
        this.window = document.getElementById("main-window")
    }
    show() {
        this.window.style.display = "";
    }
}