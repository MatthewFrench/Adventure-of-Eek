export class Enemy {
    constructor(creatureData, x, y, isStatic) {
        this.x = x;
        this.y = y;
        this.creatureData = creatureData;
        this.isStatic = isStatic;
    }
}