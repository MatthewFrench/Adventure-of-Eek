export class GameData {
    constructor() {
        this.name = ""
        this.level = 0
        this.experience = 0
        this.strength = 0
        this.speed = 0
        this.health = 0
        this.currentHealth = 0
        this.gold = 0
        this.armor = ""
        this.armorCount = 0
        this.weapon = ""
        this.weaponCount = 0
        // Each item is an ItemData reference
        // Serializing and deserializing requires id lookup
        this.items = []
    }
}