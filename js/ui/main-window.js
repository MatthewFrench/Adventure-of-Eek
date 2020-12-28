import {AppendExperience} from "../models/LevelUpData.js";
import {ShowArmorShop} from "../models/ArmorData.js";
import {ShowWeaponShop} from "../models/WeaponData.js";
import {CREATURE_BABY_CHICKEN} from "../models/CreatureData.js";

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
    updateCanvas() {
        if (!this.isShowing) {
            return;
        }
        requestAnimationFrame(() => this.updateCanvas());
        let ctx = this.canvas.getContext("2d");
        this.canvas.width  = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;
        //let minX = this.game.x
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(0, 0, canvasWidth, canvasHeight);
        ctx.fill();
        ctx.fillStyle = "red";
        // Draw world
        let world = this.game.world;
        let currentGame = this.game.getCurrentGame();
        let map = world.maps[currentGame.currentMap];
        for (const tileLayer of map.tileLayers) {
            for (let x = tileLayer.minX; x <= tileLayer.maxX; x++) {
                if (x in tileLayer.tiles) {
                    let tileX = tileLayer.tiles[x];
                    for (let y = tileLayer.minY; y <= tileLayer.maxY; y++) {
                        if (y in tileX) {
                            let tileId = tileX[y];
                            // Get the tile image and draw it
                            let tileImage = world.getTileForMap(map, tileId);
                            ctx.drawImage(tileImage, x * 32, (map.height - y) * 32, 32, 32);
                            ctx.fillText(x + "," + y, x * 32, (map.height - y) * 32);
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