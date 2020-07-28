import {ITEM_CORNED_BEEF_HASH, ITEM_EARL_GREY_TEA, ITEM_SPAGHETTI, ITEM_SPINACH, ITEM_SUSHI} from "./models/ItemData.js";

export class FoodShopPopover {
    constructor(game) {
        this.game = game;
        this.popover = document.getElementById("food-shop-popover-background-cover");
        this.closeButton = document.getElementById("food-shop-close-button");
        this.closeButton.onclick = () => {
            this.hide();
        }
        this.title = document.getElementById("food-shop-title");
        this.buyFood0 = ITEM_SPINACH;
        this.buyFood1 = ITEM_SPAGHETTI;
        this.buyFood2 = ITEM_EARL_GREY_TEA;
        this.buyFood3 = ITEM_SUSHI;
        this.buyFood4 = ITEM_CORNED_BEEF_HASH;
        this.buyFood0Div = document.getElementById("food-shop-buy-item-0");
        this.buyFood1Div = document.getElementById("food-shop-buy-item-1");
        this.buyFood2Div = document.getElementById("food-shop-buy-item-2");
        this.buyFood3Div = document.getElementById("food-shop-buy-item-3");
        this.buyFood4Div = document.getElementById("food-shop-buy-item-4");
        this.buyFood0Div.style.backgroundImage = "url(\"./images/" + this.buyFood0.itemImage +"\")";
        this.buyFood1Div.style.backgroundImage = "url(\"./images/" + this.buyFood1.itemImage +"\")";
        this.buyFood2Div.style.backgroundImage = "url(\"./images/" + this.buyFood2.itemImage +"\")";
        this.buyFood3Div.style.backgroundImage = "url(\"./images/" + this.buyFood3.itemImage +"\")";
        this.buyFood4Div.style.backgroundImage = "url(\"./images/" + this.buyFood4.itemImage +"\")";

        this.itemDivs = [
            document.getElementById("food-shop-item-0"),
            document.getElementById("food-shop-item-1"),
            document.getElementById("food-shop-item-2"),
            document.getElementById("food-shop-item-3"),
            document.getElementById("food-shop-item-4")
        ];
        this.itemNameDivs = [
            document.getElementById("food-shop-item-name-0"),
            document.getElementById("food-shop-item-name-1"),
            document.getElementById("food-shop-item-name-2"),
            document.getElementById("food-shop-item-name-3"),
            document.getElementById("food-shop-item-name-4")
        ];
    }
    updateInventoryDisplay() {
        for (const itemIndex in this.itemDivs) {
            const itemDiv = this.itemDivs[itemIndex];
            const itemNameDiv = this.itemNameDivs[itemIndex];
            const item = itemIndex < this.game.getCurrentGame().items.length ? this.game.getCurrentGame().items[itemIndex] : null;
            if (item === null) {
                itemNameDiv.innerText = "";
                itemDiv.style.backgroundImage = "";
                itemDiv.style.cursor = "";;
            } else {
                itemNameDiv.innerText = item.itemName;
                itemDiv.style.cursor = "pointer";
                itemDiv.style.backgroundImage = "url(\"./images/" + item.itemImage +"\")";
            }
        }
    }
    show() {
        this.updateInventoryDisplay();
        this.popover.style.display = "";
    }
    hide() {
        this.popover.style.display = "none";
    }
}