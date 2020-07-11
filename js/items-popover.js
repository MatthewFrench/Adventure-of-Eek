const ITEM_NONE = {itemName: "", itemImage: ""}
const ITEM_SUSHI = {itemName: "Sushi", itemImage: "sushi.png"}
export class ItemsPopover {
    constructor(game) {
        this.game = game
        this.popover = document.getElementById("items-popover-background-cover")
        this.closeButton = document.getElementById("items-close-button")
        this.closeButton.onclick = () => {
            this.hide()
        }
        this.itemDivs = [
            document.getElementById("item-0"),
            document.getElementById("item-1"),
            document.getElementById("item-2"),
            document.getElementById("item-3"),
            document.getElementById("item-4")
        ];
        this.items = [];
        for (const itemIndex in this.itemDivs) {
            if (this.itemDivs.hasOwnProperty(itemIndex)) {
                this.items.push(ITEM_NONE);
                const item = this.itemDivs[itemIndex]
                item.onclick = () => {
                    this.itemClicked(itemIndex)
                }
            }
        }
        this.setItem(0, ITEM_SUSHI)
        this.setItem(1, ITEM_SUSHI)
        this.setItem(2, ITEM_SUSHI)
        this.setItem(3, ITEM_SUSHI)
    }
    itemClicked(itemNumber) {
        const item = this.items[itemNumber]
        if (item.itemName === "") {
            return;
        }
        this.game.print("You ate " + item.itemName.toLowerCase() + ". It was delicious.")
        this.setItem(itemNumber, ITEM_NONE)
    }
    setItem(itemNumber, itemInfo) {
        this.items[itemNumber] = itemInfo
        const itemDiv = this.itemDivs[itemNumber]
        if (itemInfo.itemImage === "") {
            itemDiv.style.backgroundImage = ""
            itemDiv.style.cursor = "";
        } else {
            itemDiv.style.cursor = "pointer";
            itemDiv.style.backgroundImage = "url(\"./images/" + itemInfo.itemImage +"\")"
        }
    }
    show() {
        this.popover.style.display = ""
    }
    hide() {
        this.popover.style.display = "none"
    }
}