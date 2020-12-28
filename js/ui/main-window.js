import {AppendExperience} from "../models/LevelUpData.js";
import {ShowArmorShop} from "../models/ArmorData.js";
import {ShowWeaponShop} from "../models/WeaponData.js";
import {CREATURE_BABY_CHICKEN} from "../models/CreatureData.js";

const TILE_DISPLAY_SIZE = 32;
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
        let bounds = this.canvas.getBoundingClientRect();
        let canvasWidth = bounds.width;
        let canvasHeight = bounds.height;
        let tilesHorizontalHalf = Math.ceil(canvasWidth / TILE_DISPLAY_SIZE / 2);
        let tilesVerticalHalf = Math.ceil(canvasHeight / TILE_DISPLAY_SIZE / 2);
        let minX = currentGame.x - tilesHorizontalHalf;
        let maxX = currentGame.x + tilesHorizontalHalf;
        let minY = currentGame.y - tilesVerticalHalf;
        let maxY = currentGame.y + tilesVerticalHalf;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(0, 0, canvasWidth, canvasHeight);
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
                            let drawX = x * TILE_DISPLAY_SIZE + (canvasWidth / 2);
                            let drawY = y * TILE_DISPLAY_SIZE + (canvasHeight / 2);
                            ctx.drawImage(tileImage, drawX, drawY, TILE_DISPLAY_SIZE, TILE_DISPLAY_SIZE);
                            ctx.fillText(x + "," + y, drawX, drawY);
                        }
                    }
                }
            }
        }
        /*
        function animate() {
  // call again next time we can draw
  requestAnimationFrame(animate);
  // clear canvas
  ctx.clearRect(0, 0, cvWidth, cvHeight);
  // draw everything
  everyObject.forEach(function(o) {
    ctx.fillStyle = o[4];
    ctx.fillRect(o[0], o[1], o[2], o[3]);
  });
  //
  ctx.fillStyle = '#000';
  ctx.fillText('click to add random rects', 10, 10);
}

animate();
         */
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