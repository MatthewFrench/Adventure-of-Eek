import {GlobalData} from "./models/GlobalData.js";
import {MainWindow} from "./ui/main-window.js";
import {NewGameWindow} from "./ui/new-game-window.js";
import {LoadGameWindow} from "./ui/load-game-window.js";
import {AboutWindow} from "./ui/about-window.js";
import {CharacterCreatorWindow} from "./ui/character-creator-window.js";
import {ItemsPopover} from "./ui/items-popover.js";
import {StatsPopover} from "./ui/stats-popover.js";
import {EventPopover} from "./ui/event-popover.js";
import {ShopPopover} from "./ui/shop-popover.js";
import {AttackPopover} from "./ui/attack-popover.js";
import {FoodShopPopover} from "./ui/food-shop-popover.js";
import {HealShopPopover} from "./ui/heal-shop-popover.js";
import {GameData} from "./models/GameData.js";
import {ITEM_SUSHI} from "./models/ItemData.js";

export class Game {
    constructor(world) {
        this.world = world;
        this.globalData = new GlobalData();
        this.mainWindow = new MainWindow(this);
        this.newGameWindow = new NewGameWindow(this);
        this.loadWindow = new LoadGameWindow(this);
        this.aboutWindow = new AboutWindow(this);
        this.characterCreatorWindow = new CharacterCreatorWindow(this);
        this.itemsPopover = new ItemsPopover(this);
        this.statsPopover = new StatsPopover(this);
        this.eventPopover = new EventPopover(this);
        this.shopPopover = new ShopPopover(this);
        this.attackPopover = new AttackPopover(this);
        this.foodShopPopover = new FoodShopPopover(this);
        this.healShopPopover = new HealShopPopover(this);
    }

    createNewGame(name, strength, speed, health) {
        let newGame = new GameData();
        newGame.name = name;
        newGame.strength = parseInt(strength);
        newGame.speed = parseInt(speed);
        newGame.health = parseInt(health);
        newGame.currentHealth = parseInt(health);
        newGame.level = 1;
        newGame.gold = 100;
        newGame.items.push(ITEM_SUSHI);
        newGame.items.push(ITEM_SUSHI);
        // Starting map is hardcoded
        newGame.currentMap = "Map 1";
        // Should set starting position from the map property
        newGame.x = 0;
        newGame.y = 0;
        this.globalData.currentGame = newGame;
        this.globalData.games.push(newGame);
    }

    getCurrentGame() {
        return this.globalData.currentGame;
    }

    print(text) {
        let textDiv = document.createElement("div");
        textDiv.classList.add("main-window-text-line");
        textDiv.innerText = text;
        this.mainWindow.mainTextDiv.insertBefore(textDiv, this.mainWindow.mainTextDiv.childNodes[0]);
    }
}