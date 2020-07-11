/*
Armor
        this.game.shopPopover.setTitle("Armor Shop")
        this.game.shopPopover.addItem("Cardboard Underwear", 1, 25)
        this.game.shopPopover.addItem("Crocheted Crocs", 2, 60)
        this.game.shopPopover.addItem("Carpet T-Shirt", 3, 140)
        this.game.shopPopover.addItem("Wood Pants", 4, 330)
        this.game.shopPopover.addItem("Shiny Nightgown", 5, 470)
        this.game.shopPopover.addItem("Christmas Light Up Socks", 6, 820)
        this.game.shopPopover.addItem("Adamantium Nose-ring", 8, 1210)
        this.game.shopPopover.addItem("Dried Dog-turd Suit", 10, 1650)
        this.game.shopPopover.addItem("Towel of Indecency", 12, 2150)
        this.game.shopPopover.addItem("Yellow Polka-dot Bikini", 14, 3100)
        this.game.shopPopover.addItem("Dragon Scale Full Body Armor", 16, 6400)
        this.game.shopPopover.show()
 */
export class ShopPopover {
    constructor(game) {
        this.game = game
        this.selectedItemDiv = null;
        this.popover = document.getElementById("shop-popover-background-cover")
        this.closeButton = document.getElementById("shop-close-button")
        this.closeButton.onclick = () => {
            this.hide()
        }
        this.title = document.getElementById("shop-title")
        this.rowContainer = document.getElementById("shop-table-row-container")
    }
    show() {
        this.popover.style.display = "";
    }
    hide() {
        this.popover.style.display = "none"
    }
    setTitle(title) {
        this.title.innerText = title
    }
    addItem(name, rating, cost) {
        let rowDiv = document.createElement("div")
        rowDiv.className = "shop-table-row"
        let ratingDiv = document.createElement("div")
        ratingDiv.innerText = rating
        ratingDiv.className = "shop-table-rating-column"
        let itemDiv = document.createElement("div")
        itemDiv.innerText = name
        itemDiv.className = "shop-table-item-column"
        let costDiv = document.createElement("div")
        costDiv.innerText = cost
        costDiv.className = "shop-table-cost-column"
        rowDiv.append(ratingDiv)
        rowDiv.append(itemDiv)
        rowDiv.append(costDiv)
        this.rowContainer.append(rowDiv)
        rowDiv.onclick = () => {
            this.itemClicked(rowDiv)
        }
    }
    itemClicked(rowDiv) {
        if (this.selectedItemDiv != null) {
            this.selectedItemDiv.classList.remove("selected");
        }
        this.selectedItemDiv = rowDiv
        this.selectedItemDiv.classList.add("selected");
    }
}