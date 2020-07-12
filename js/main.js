import {CharacterCreatorWindow} from "./character-creator-window.js";
import {NewGameWindow} from "./new-game-window.js";
import {MainWindow} from "./main-window.js";
import {ItemsPopover} from "./items-popover.js";
import {StatsPopover} from "./stats-popover.js";
import {EventPopover} from "./event-popover.js";
import {ShopPopover} from "./shop-popover.js";
import {AttackPopover} from "./attack-popover.js";

export class Game {
    constructor() {
        this.mainWindow = new MainWindow(this);
        this.newGameWindow = new NewGameWindow(this);
        this.characterCreatorWindow = new CharacterCreatorWindow(this);
        this.itemsPopover = new ItemsPopover(this);
        this.statsPopover = new StatsPopover(this);
        this.eventPopover = new EventPopover(this);
        this.shopPopover = new ShopPopover(this);
        this.attackPopover = new AttackPopover(this);
    }

    print(text) {
        this.mainWindow.mainTextDiv.insertBefore(document.createTextNode(text + "\n"), this.mainWindow.mainTextDiv.childNodes[0]);
    }
}

let game;
function main() {
    game = new Game();
    game.print("Welcome to the Adventure of Eek!")
}

window.addEventListener("load", main);