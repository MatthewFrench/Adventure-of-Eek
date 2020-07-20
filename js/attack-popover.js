import {AppendExperience} from "./models/LevelUpData.js";

export class AttackPopover {
    constructor(game) {
        this.game = game
        this.popover = document.getElementById("attack-popover-background-cover")
        document.getElementById("attack-run-button").onclick = () => {
            this.runClicked()
        }
        document.getElementById("attack-attack-button").onclick = () => {
            this.attackClicked()
        }
        document.getElementById("attack-items-button").onclick = () => {
            this.itemClicked()
        }
        this.enemyImage = document.getElementById("attack-enemy-image")
        this.enemyNameDiv = document.getElementById("attack-enemy-name")
        this.enemyHealthDiv = document.getElementById("attack-enemy-health")
        this.selfHealthDiv = document.getElementById("attack-self-information-container")
        // Enemy creature data
        this.enemy = null;
        // Enemy modifiable stats
        this.enemyHealth = 0;
        this.enemyCurrentHealth = 0;
    }
    prepareBattle(enemyCreatureData) {
        this.enemy = enemyCreatureData;
        this.enemyHealth = enemyCreatureData.health;
        this.enemyCurrentHealth = enemyCreatureData.health;
        this.enemyImage.style.backgroundImage = "url(\"./images/" + enemyCreatureData.image +"\")";
        this.enemyNameDiv.innerText = enemyCreatureData.name;
        this.updateHealthDisplays();
    }
    updateHealthDisplays() {
        let currentGame = this.game.getCurrentGame();
        this.enemyHealthDiv.innerText = "HP: " + this.enemyCurrentHealth + " / " + this.enemyHealth;
        this.selfHealthDiv.innerText = "You:   HP: " + currentGame.currentHealth +" / " + currentGame.health;
    }
    attackClicked() {
        let currentGame = this.game.getCurrentGame();
        this.enemyCurrentHealth -= 2;
        if (this.enemyCurrentHealth <= 0) {
            let earnedExperience = this.enemy.experience;
            let earnedGold = this.enemy.gold;
            currentGame.gold += earnedGold;
            // Killed enemy
            this.game.eventPopover.set("Discovered Valuables!",
                "Gold: " + earnedGold + "\nExperience: " + earnedExperience,
                "Yes!",
                () => {
                    this.game.eventPopover.hide();
                    AppendExperience(earnedExperience, this.game);
                })
            this.hide();
            this.game.eventPopover.show();
            this.game.mainWindow.updateDisplay();
        } else {
            currentGame.currentHealth -= 1;
            if (currentGame.currentHealth <= 0) {
                // Dead self
                let lostGold = this.enemy.gold * 2;
                let currentGold = currentGame.gold;
                let newGold = currentGold - lostGold;
                if (newGold < 0) {
                    newGold = 0;
                }
                let actualLostGold = currentGold - newGold;
                currentGame.gold = newGold;
                this.game.eventPopover.set("You Died",
                    "Lost Gold: " + actualLostGold + "\n\nYou were revived back in town.",
                    "Okay",
                    () => {
                        this.game.eventPopover.hide();
                        currentGame.currentHealth = 1;
                        this.game.mainWindow.updateDisplay();
                    })
                this.hide();
                this.game.eventPopover.show()
                this.game.mainWindow.updateDisplay();
            }
        }
        this.updateHealthDisplays();
    }
    itemClicked() {
        this.game.itemsPopover.show(() => this.usedItem());
    }
    usedItem() {
        this.updateHealthDisplays();
    }
    runClicked() {
        this.hide()
    }
    show() {
        this.popover.style.display = "";
    }
    hide() {
        this.popover.style.display = "none"
    }
}