import {AppendExperience} from "./models/LevelUpData.js";

export class AttackPopover {
    constructor(game) {
        this.game = game;
        this.popover = document.getElementById("attack-popover-background-cover");
        document.getElementById("attack-run-button").onclick = () => {
            this.runClicked();
        }
        this.attackButton = document.getElementById("attack-attack-button");
        this.attackButton.onclick = () => {
            this.attackClicked();
        }
        document.getElementById("attack-items-button").onclick = () => {
            this.itemClicked();
        }
        this.enemyImage = document.getElementById("attack-enemy-image");
        this.enemyNameDiv = document.getElementById("attack-enemy-name");
        this.enemyHealthDiv = document.getElementById("attack-enemy-health");
        this.selfHealthDiv = document.getElementById("attack-self-information-container");
        this.controlsContainer = document.getElementById("attack-controls-container");
        this.victoryDiv = document.getElementById("attack-victory-container");
        this.victoryGoldDiv = document.getElementById("attack-rewards-gold");
        this.victoryExperienceDiv = document.getElementById("attack-rewards-experience");
        this.victoryCloseButton = document.getElementById("attack-victory-close-button");
        this.deathDiv = document.getElementById("attack-death-container");
        this.deathGoldDiv = document.getElementById("attack-death-gold");
        this.deathCloseButton = document.getElementById("attack-death-close-button");
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
        this.victoryDiv.style.display = "none";
        this.deathDiv.style.display = "none";
        this.controlsContainer.style.display = "";
        this.attackButton.focus();
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
            this.showVictory(earnedGold, earnedExperience, () => {
                this.hide();
                this.game.mainWindow.updateDisplay();
                AppendExperience(earnedExperience, this.game);
            });
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
                this.showDeath(actualLostGold, () => {
                    currentGame.currentHealth = 1;
                    this.game.mainWindow.updateDisplay();
                    this.hide();
                });
                this.game.eventPopover.set("You Died",
                    "Lost Gold: " + actualLostGold + "\n\nYou were revived back in town.",
                    "Okay",
                    () => {
                        this.game.eventPopover.hide();
                        currentGame.currentHealth = 1;
                        this.game.mainWindow.updateDisplay();
                    })
            }
        }
        this.updateHealthDisplays();
    }
    showVictory(gold, experience, closeCallback) {
        this.victoryGoldDiv.innerText = "Gold: " + gold;
        this.victoryExperienceDiv.innerText = "Experience: " + experience;
        this.victoryCloseButton.onclick = closeCallback;
        this.victoryDiv.style.display = "";
        this.controlsContainer.style.display = "none";
        this.victoryCloseButton.focus();
    }
    showDeath(lostGold, closeCallback) {
        this.deathGoldDiv.innerText = "You lost " + lostGold + " gold.";
        this.deathCloseButton.onclick = closeCallback;
        this.deathDiv.style.display = "";
        this.controlsContainer.style.display = "none";
        this.deathCloseButton.focus();
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