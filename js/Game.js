import {GlobalData} from "./models/GlobalData";
import {MainWindow} from "./ui/main-window";
import {NewGameWindow} from "./ui/new-game-window";
import {LoadGameWindow} from "./ui/load-game-window";
import {AboutWindow} from "./ui/about-window";
import {CharacterCreatorWindow} from "./ui/character-creator-window";
import {ItemsPopover} from "./ui/items-popover";
import {StatsPopover} from "./ui/stats-popover";
import {EventPopover} from "./ui/event-popover";
import {ShopPopover} from "./ui/shop-popover";
import {AttackPopover} from "./ui/attack-popover";
import {FoodShopPopover} from "./ui/food-shop-popover";
import {HealShopPopover} from "./ui/heal-shop-popover";
import {GameData} from "./models/GameData";
import {ITEM_SUSHI} from "./models/ItemData";

export class Game {
    constructor() {
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