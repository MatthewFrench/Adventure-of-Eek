export class StatsPopover {
    constructor(game) {
        this.game = game
        this.popover = document.getElementById("stats-popover-background-cover")
        this.closeButton = document.getElementById("stats-close-button")
        this.closeButton.onclick = () => {
            this.hide()
        }
        this.nameDiv = document.getElementById("stats-name")
        this.levelDiv = document.getElementById("stats-level")
        this.experienceDiv = document.getElementById("stats-experience")
        this.strengthDiv = document.getElementById("stats-strength")
        this.speedDiv = document.getElementById("stats-speed")
        this.healthDiv = document.getElementById("stats-health")
        this.armorDiv = document.getElementById("stats-armor")
        this.armorCountDiv = document.getElementById("stats-armor-count")
        this.weaponDiv = document.getElementById("stats-weapon")
        this.weaponCountDiv = document.getElementById("stats-weapon-count")
    }
    updateDisplay() {
        const currentGame = this.game.getCurrentGame();
        this.nameDiv.innerText = "Name: " + currentGame.name;
        this.levelDiv.innerText = "Level: " + currentGame.level;
        this.experienceDiv.innerText = "Experience: " + currentGame.experience;
        this.strengthDiv.innerText = "Strength: " + currentGame.strength;
        this.speedDiv.innerText = "Speed: " + currentGame.speed;
        this.healthDiv.innerText = "Health: " + currentGame.health;
        this.armorDiv.innerText = "Armor: " + (currentGame.armor === "" ? "No Armor" : currentGame.armor);
        this.armorCountDiv.innerText = "Armor Count: " + currentGame.armorCount;
        this.weaponDiv.innerText = "Weapon: " + (currentGame.weapon === "" ? "No Weapon" : currentGame.weapon);
        this.weaponCountDiv.innerText = "Weapon Count: " + currentGame.weaponCount;
    }
    show() {
        this.updateDisplay();
        this.popover.style.display = ""
    }
    hide() {
        this.popover.style.display = "none"
    }
}