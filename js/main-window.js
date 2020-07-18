import {AppendExperience} from "./models/LevelUpData.js";
import {ShowArmorShop} from "./models/ArmorData.js";

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

        document.getElementById("shopButton").onclick = () => {
            ShowArmorShop(this.game);
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