export class FoodShopPopover {
    constructor(game) {
        this.game = game;
        this.popover = document.getElementById("food-shop-popover-background-cover");
        this.closeButton = document.getElementById("food-shop-close-button");
        this.closeButton.onclick = () => {
            this.hide();
        }
        this.title = document.getElementById("food-shop-title");
    }
    show() {
        this.popover.style.display = "";
    }
    hide() {
        this.popover.style.display = "none";
    }
}