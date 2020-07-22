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

        let turnDamage = AttackPopover.getTurnDamage(
            {strength: this.enemy.strength, speed: this.enemy.speed, weaponCount: this.enemy.weaponCount, armorCount: this.enemy.armorCount},
            {strength: currentGame.strength, speed: currentGame.speed, weaponCount: currentGame.getWeaponCount(), armorCount: currentGame.getArmorCount()})

        if (this.enemy.speed > currentGame.speed) {
            if (this.dealDamageToPlayer(turnDamage[1])) {
                this.dealDamageToEnemy(turnDamage[0]);
            }
        } else {
            if (this.dealDamageToEnemy(turnDamage[0])) {
                this.dealDamageToPlayer(turnDamage[1]);
            }
        }

        this.updateHealthDisplays();
    }
    dealDamageToEnemy(damage) {
        if (damage === 0) {
            return true;
        }
        this.enemyCurrentHealth -= damage;
        if (this.enemyCurrentHealth <= 0) {
            let earnedExperience = this.enemy.experience;
            let earnedGold = this.enemy.gold;
            this.game.getCurrentGame().gold += earnedGold;
            // Killed enemy
            this.showVictory(earnedGold, earnedExperience, () => {
                this.hide();
                this.game.mainWindow.updateDisplay();
                AppendExperience(earnedExperience, this.game);
            });
            // Return if still alive
            return false;
        }
        return true;
    }
    dealDamageToPlayer(damage) {
        if (damage === 0) {
            return true;
        }
        let currentGame = this.game.getCurrentGame();
        currentGame.currentHealth -= damage;
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
            // Return if still alive
            return false;
        }
        return true;
    }
    /*
    Creature object: strength, speed, weaponCount, armorCount

    Strength increases damage and increases chance of doing damage and change of not taking damage.
    Speed increases damage by normalized speed amount.
    Weapon Count increases damage and increases chance of doing damage.
    Armor Count reduces self damage and decreases chance of taking damage.

    Returns array of damage done to each creature.
     */
    static getTurnDamage(creature1, creature2) {
        let damageArray = [0, 0];
        let creature1Strength = creature1.strength;
        let creature1Speed = creature1.speed;
        let creature1WeaponCount = creature1.weaponCount;
        let creature1ArmorCount = creature1.armorCount;
        let creature2Strength = creature2.strength;
        let creature2Speed = creature2.speed;
        let creature2WeaponCount = creature2.weaponCount;
        let creature2ArmorCount = creature2.armorCount;

        let speedWeight = 0.5;

        let normalizedCreature1Speed = Math.max(creature1Speed * speedWeight, 1);
        let normalizedCreature2Speed = Math.max(creature2Speed * speedWeight, 1);
        if (normalizedCreature1Speed < normalizedCreature2Speed) {
            normalizedCreature2Speed = normalizedCreature2Speed / normalizedCreature1Speed;
            normalizedCreature1Speed = 1;
        } else {
            normalizedCreature1Speed = normalizedCreature1Speed / normalizedCreature2Speed;
            normalizedCreature2Speed = 1;
        }

        let strengthWeight = 0.25;
        let weaponWeight = 1.00;
        let armorWeight = 1.00;
        let damageWeight = 0.5;

        // Damage values fluctuate from 0.75x to 1.25x damage based on random
        let creature1Damage = normalizedCreature2Speed * (creature2Strength * strengthWeight + creature2WeaponCount * weaponWeight - creature1ArmorCount * armorWeight) * (Math.random() * 0.5 + 0.75) * damageWeight;
        let creature2Damage = normalizedCreature1Speed * (creature1Strength * strengthWeight + creature1WeaponCount * weaponWeight - creature2ArmorCount * armorWeight) * (Math.random() * 0.5 + 0.75) * damageWeight;

        damageArray[0] = Math.round(Math.max(creature1Damage, 1));
        damageArray[1] = Math.round(Math.max(creature2Damage, 1));

        // Calculate dodge/block
        let dodgeSuppression = 0.05;
        let normalizedCreature1Dodge = (creature1ArmorCount - creature2WeaponCount + creature1Strength - creature2Strength) * dodgeSuppression;
        let normalizedCreature2Dodge = (creature2ArmorCount - creature1WeaponCount + creature2Strength - creature1Strength) * dodgeSuppression;
        if (normalizedCreature1Dodge < normalizedCreature2Dodge) {
            let difference = 1 - normalizedCreature1Dodge;
            normalizedCreature1Dodge += difference;
            normalizedCreature2Dodge += difference;
            normalizedCreature1Dodge = normalizedCreature1Dodge / normalizedCreature2Dodge;
            normalizedCreature2Dodge = 2.0 - normalizedCreature1Dodge;
        } else {
            let difference = 1 - normalizedCreature2Dodge;
            normalizedCreature1Dodge += difference;
            normalizedCreature2Dodge += difference;
            normalizedCreature2Dodge = normalizedCreature2Dodge / normalizedCreature1Dodge;
            normalizedCreature1Dodge = 2.0 - normalizedCreature2Dodge;
        }
        let baseDodge = 0.5;
        let creature1DodgeNumber = 1.0 - (1 - baseDodge) * normalizedCreature1Dodge;
        let creature2DodgeNumber = 1.0 - (1 - baseDodge) * normalizedCreature2Dodge;
        let dodge1 = true;
        let dodge2 = true;
        while (dodge1 && dodge2) {
            dodge1 = Math.random() >= creature1DodgeNumber;
            dodge2 = Math.random() >= creature2DodgeNumber;
        }
        let criticalStrike1 = Math.random() >= 0.95;
        let criticalStrike2 = Math.random() >= 0.95;
        if (dodge1 && !criticalStrike1) {
            damageArray[0] = 0;
        }
        if (dodge2 && !criticalStrike2) {
            damageArray[1] = 0;
        }

        // Give a rare equal chance to critical strike
        if (criticalStrike1) {
            damageArray[0] *= 2;
        }
        if (criticalStrike2) {
            damageArray[1] *= 2;
        }

        return damageArray;
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