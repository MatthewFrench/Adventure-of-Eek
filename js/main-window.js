import {AppendExperience} from "./models/LevelUpData.js";

export class MainWindow {
    constructor(game) {
        this.game = game;
        this.mainTextDiv = document.getElementById("mainTextDiv")
        this.itemsButton = document.getElementById("itemsButton")
        this.itemsButton.onclick = () => {
            this.game.itemsPopover.show();
        }
        this.statsButton = document.getElementById("statsButton")
        this.statsButton.onclick = () => {
            this.game.statsPopover.show();
        }
        this.window = document.getElementById("main-window")

        this.healthDiv = document.getElementById( "main-window-statview-stat-health")
        this.experienceDiv = document.getElementById( "main-window-statview-stat-experience")
        this.levelDiv = document.getElementById( "main-window-statview-stat-level")
        this.goldDiv = document.getElementById( "main-window-statview-stat-gold")

        document.getElementById("shopButton").onclick =  () => {
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
        }

        document.getElementById("levelUpButton").onclick = ()  => {
            AppendExperience(1000, this.game);
        }

        document.getElementById("attackButton").onclick = () => {
            this.game.attackPopover.set("baby-chicken.png", "Baby Chicken", 10, 13)
            this.game.attackPopover.show()
        }
    }
    show() {
        this.updateDisplay();
        this.window.style.display = "";
    }
    updateDisplay() {
        this.healthDiv.innerText = "Health: " + this.game.getCurrentGame().currentHealth + "/" + this.game.getCurrentGame().health;
        this.experienceDiv.innerText = "Experience: " + this.game.getCurrentGame().experience;
        this.levelDiv.innerText = "Level: " + this.game.getCurrentGame().level;
        this.goldDiv.innerText = "Gold: " + this.game.getCurrentGame().gold;
    }
}