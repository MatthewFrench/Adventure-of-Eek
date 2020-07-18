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
    setItems(items) {
        // Clear items
        while(this.rowContainer.firstChild) {
            this.rowContainer.removeChild(this.rowContainer.firstChild);
        }
        for (const item of items) {
            this.addItem(item);
        }
    }
    addItem(item) {
        let name = item.name;
        let rating = item.rating;
        let cost = item.cost;
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
        // Track which item is active
        //todo
    }
}