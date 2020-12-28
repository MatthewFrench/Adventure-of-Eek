export class Map {
    constructor(name, mapJson) {
        this.name = name;
        this.height = mapJson.height;
        this.width = mapJson.width;
        // We don't pull in the images at this size but we need
        // to know the size to properly scale objects that are
        // recorded as pixel values instead of tile values
        this.tileWidth = mapJson.tilewidth;
        this.tileHeight = mapJson.tileheight;

        // [{id, name}]
        this.tileSets = [];
        for (const tileSet of mapJson.tilesets){
            // This helps identify corresponding tiles in the map
            let firstGid = tileSet.firstgid;
            let nameSplit = tileSet.source.split("\/");
            let name = nameSplit[nameSplit.length - 1].split(".tsx")[0];
            this.tileSets.push({firstGid: firstGid, name: name});
        }

        // Load layers, tiles in layers
        this.tileLayers = [];
        // Collision map
        this.collisionLayer = null;
        // These are specific enemy existence points
        this.staticEnemies = [];
        // These are enemy spawn zones
        this.enemySpawnAreas = [];
        // These are special properties, player location, shop locations
        this.properties = [];
        for (const layer of mapJson.layers) {
            if (layer.type === "tilelayer" && layer.name !== "Collision Layer") {
                this.tileLayers.push(new TileLayer(layer));
            } else if (layer.type === "tilelayer" && layer.name === "Collision Layer") {
                this.collisionLayer = new CollisionLayer(layer);
            } else if (layer.type === "objectgroup" && layer.name === "Enemy Layer") {

            } else if (layer.type === "objectgroup" && layer.name === "Enemy Spawn Layer") {

            } else if (layer.type === "objectgroup" && layer.name === "Properties Layer") {

            } else {
                console.log("Unknown layer: " + layer.name);
            }
        }
    }
}
class TileLayer {
    constructor(layer) {
        this.name = layer.name;
        this.minX = layer.startx;
        this.minY = layer.starty;
        this.maxX = layer.startx + layer.width;
        this.maxY = layer.starty + layer.height;
        // [x][y] = id
        this.tiles = {};
        for (const chunk of layer.chunks) {
            let chunkStartingX = chunk.x;
            let chunkStartingY = chunk.y;
            let chunkWidth = chunk.width;
            let x = 0;
            let y = 0;
            for (const tileId of chunk.data) {
                // tileId is 6 for collision
                // other tileIds may exist in the future for
                // special cases
                if (tileId > 0) {
                    this.putTile(x + chunkStartingX, y + chunkStartingY, tileId)
                }
                x += 1;
                if (x >= chunkWidth) {
                    x -= chunkWidth;
                    y += 1;
                }
            }
        }
    }
    putTile(x, y, id) {
        if (!(x in this.tiles)) {
            this.tiles[x] = {};
        }
        this.tiles[x][y] = id;
    }
}
class CollisionLayer {
    constructor(layer) {
        this.name = layer.name;
        this.minX = layer.startx;
        this.minY = layer.starty;
        this.maxX = layer.startx + layer.width;
        this.maxY = layer.starty + layer.height;
        // [x][y] = boolean
        this.tiles = {};
        for (const chunk of layer.chunks) {
            let chunkStartingX = chunk.x;
            let chunkStartingY = chunk.y;
            let chunkWidth = chunk.width;
            let x = 0;
            let y = 0;
            for (const tileId of chunk.data) {
                if (tileId > 0) {
                    this.putCollision(x + chunkStartingX, y + chunkStartingY, tileId);
                }
                x += 1;
                if (x >= chunkWidth) {
                    x -= chunkWidth;
                }
            }
        }
    }
    putCollision(x, y) {
        if (!(x in this.tiles)) {
            this.tiles[x] = {};
        }
        this.tiles[x][y] = true;
    }
}