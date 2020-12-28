import {AppendExperience} from "../models/LevelUpData.js";
import {ShowArmorShop} from "../models/ArmorData.js";
import {ShowWeaponShop} from "../models/WeaponData.js";
import {CREATURE_BABY_CHICKEN} from "../models/CreatureData.js";

const TILE_DISPLAY_SIZE = 32;
const MAP_TILE_WIDTH = 10;
const MAP_TILE_HEIGHT = 10;
export class MainWindow {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById("gameview-canvas");
        this.mainTextDiv = document.getElementById("mainTextDiv")
        this.itemsButton = document.getElementById("itemsButton")
        this.itemsButton.onclick = () => {
            this.game.itemsPopover.show(() => {
                this.updateDisplay();
            });
        }
        this.statsButton = document.getElementById("statsButton")
        this.statsButton.onclick = () => {
            this.game.statsPopover.show();
        }
        this.window = document.getElementById("main-window")
        this.healthDiv = document.getElementById( "main-window-statview-stat-health")
        this.experienceDiv = document.getElementById( "main-window-statview-stat-experience")
        this.levelDiv = document.getElementById( "main-window-statview-stat-level")
        this.goldDiv = document.getElementById( "main-window-statview-stat-gold")
        document.getElementById("armorShopButton").onclick = () => {
            ShowArmorShop(this.game);
        }
        document.getElementById("weaponShopButton").onclick = () => {
            ShowWeaponShop(this.game);
        }
        document.getElementById("levelUpButton").onclick = ()  => {
            AppendExperience(10000, this.game);
        }
        document.getElementById("attackButton").onclick = () => {
            this.game.attackPopover.show(CREATURE_BABY_CHICKEN);
        }
        document.getElementById("healShopButton").onclick = () =>  {
            this.game.healShopPopover.show();
        }
        document.getElementById("foodShopButton").onclick = () =>  {
            this.game.foodShopPopover.show();
        }
        this.isShowing = false;
        // Should make a better place for this, game resources
        this.mainCharacterImage = new Image();
        this.mainCharacterImage.src = "images/main-character.png";
    }

    getContext() {
        let canvas = this.canvas;
        // Get the device pixel ratio, falling back to 1.
        let dpr = window.devicePixelRatio || 1;
        // Get the size of the canvas in CSS pixels.
        let rect = canvas.getBoundingClientRect();
        // Give the canvas pixel dimensions of their CSS
        // size * the device pixel ratio.
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        let ctx = canvas.getContext('2d');
        // Scale all drawing operations by the dpr, so you
        // don't have to worry about the difference.
        ctx.scale(dpr, dpr);
        return ctx;
    }

    updateCanvas() {
        if (!this.isShowing) {
            return;
        }
        requestAnimationFrame(() => this.updateCanvas());
        let currentGame = this.game.getCurrentGame();
        let ctx = this.getContext();
        // Scale the display to show 10 tiles no matter screen size
        let bounds = this.canvas.getBoundingClientRect();
        let canvasWidth = bounds.width;
        let canvasHeight = bounds.height;
        // Limit view to 10 tiles
        let targetWidth = MAP_TILE_WIDTH * TILE_DISPLAY_SIZE;
        let targetHeight = MAP_TILE_HEIGHT * TILE_DISPLAY_SIZE;
        ctx.scale(canvasWidth / targetWidth, canvasHeight / targetHeight);
        let mapX = Math.floor(currentGame.x / MAP_TILE_WIDTH);
        let mapY = Math.floor(currentGame.x / MAP_TILE_HEIGHT);
        let cameraX = mapX * MAP_TILE_WIDTH;
        let cameraY = mapY * MAP_TILE_HEIGHT;
        let minX = cameraX;
        let maxX = cameraX + MAP_TILE_WIDTH;
        let minY = cameraY;
        let maxY = cameraY + MAP_TILE_HEIGHT;
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(0, 0, targetWidth, targetHeight);
        ctx.fill();
        ctx.fillStyle = "red";
        // Draw world
        let world = this.game.world;
        let map = world.maps[currentGame.currentMap];
        for (const tileLayer of map.tileLayers) {
            for (let x = minX; x <= maxX; x++) {
                if (x in tileLayer.tiles) {
                    let tileX = tileLayer.tiles[x];
                    for (let y = minY; y <= maxY; y++) {
                        if (y in tileX) {
                            let tileId = tileX[y];
                            // Get the tile image and draw it
                            let tileImage = world.getTileForMap(map, tileId);
                            let drawX = (x + cameraX) * TILE_DISPLAY_SIZE;
                            let drawY = (y + cameraY) * TILE_DISPLAY_SIZE;
                            ctx.drawImage(tileImage, drawX, drawY, TILE_DISPLAY_SIZE, TILE_DISPLAY_SIZE);
                        }
                    }
                }
            }
        }
        // Draw main character
        let drawX = (currentGame.x + cameraX) * TILE_DISPLAY_SIZE;
        let drawY = (currentGame.y + cameraY) * TILE_DISPLAY_SIZE;
        ctx.drawImage(this.mainCharacterImage, drawX, drawY, TILE_DISPLAY_SIZE, TILE_DISPLAY_SIZE);
    }
    show() {
        this.updateDisplay();
        this.window.style.display = "";
        // Start redraw loop
        this.isShowing = true;
        this.updateCanvas();
    }
    hide() {
        this.isShowing = false;
        this.window.style.display = "display: none";
    }
    updateDisplay() {
        this.healthDiv.innerText = "Health: " + this.game.getCurrentGame().currentHealth + "/" + this.game.getCurrentGame().health;
        this.experienceDiv.innerText = "Experience: " + this.game.getCurrentGame().experience;
        this.levelDiv.innerText = "Level: " + this.game.getCurrentGame().level;
        this.goldDiv.innerText = "Gold: " + this.game.getCurrentGame().gold;
    }
}