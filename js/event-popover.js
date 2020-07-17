export class EventPopover {
    constructor(game) {
        this.game = game
        this.popover = document.getElementById("event-popover-background-cover")
        this.closeButton = document.getElementById("event-close-button")
        this.closeButton.onclick = () => {
            this.hide()
        }
        this.titleDiv = document.getElementById("event-title")
        this.textDiv = document.getElementById("event-text")
    }

    /**
     * Example:
     * "Level up!"
        "You have leveled up to level " + 5 + "!" + "\n\n" +
        "Your strength has increased!"
     */
    set(title, text, buttonText, onClick) {
        this.titleDiv.innerText = title;
        this.textDiv.innerText = text;
        this.closeButton.innerText = buttonText;
        this.closeButton.onclick = onClick;
    }
    show() {
        this.popover.style.display = "";
    }
    hide() {
        this.popover.style.display = "none"
    }
}