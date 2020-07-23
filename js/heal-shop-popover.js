export class HealShopPopover {
    constructor(game) {
        this.game = game;
        this.popover = document.getElementById("heal-shop-popover-background-cover");
        this.closeButton = document.getElementById("heal-shop-close-button");
        this.closeButton.onclick = () => {
            this.hide();
        }
        this.title = document.getElementById("heal-shop-title");
    }
    show() {
        this.popover.style.display = "";
    }
    hide() {
        this.popover.style.display = "none";
    }
}