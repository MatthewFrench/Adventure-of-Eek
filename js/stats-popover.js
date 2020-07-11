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
    show() {
        this.popover.style.display = ""
    }
    hide() {
        this.popover.style.display = "none"
    }
}