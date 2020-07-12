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
    }
    set(enemyImage, enemyName, enemyHp, yourHp) {
        this.enemyImage.style.backgroundImage = "url(\"./images/" + enemyImage +"\")"
        this.enemyNameDiv.innerText = enemyName
        this.updateEnemyHealth(enemyHp, enemyHp)
        this.updateSelfHealth(yourHp, yourHp)
    }
    updateEnemyHealth(currentHealth, maximumHealth) {
        this.enemyHealthDiv.innerText = "HP: " + currentHealth + " / " + maximumHealth
    }
    updateSelfHealth(currentHealth, maximumHealth) {
        this.selfHealthDiv.innerText = "You:   HP: " + currentHealth +" / " + maximumHealth
    }
    attackClicked() {

    }
    itemClicked() {

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