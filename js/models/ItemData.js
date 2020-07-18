//export const ITEM_NONE = {id: 0, itemName: "", itemImage: ""}
export const ITEM_SUSHI = {id: 1, itemName: "Sushi", itemImage: "sushi.png"}

export function UseItem(item, game) {
    const currentGame = game.getCurrentGame();
    if (item === ITEM_SUSHI) {
        currentGame.currentHealth += 50;
        if (currentGame.currentHealth > currentGame.health) {
            currentGame.currentHealth = currentGame.health;
        }
        game.print("You ate " + item.itemName.toLowerCase() + ". It was delicious.");
    }
}

//const ITEMS = [ITEM_NONE, ITEM_SUSHI];
/*
export function GetItemFromName(itemName) {
    for (const item of ITEMS) {
        if (item.itemName === itemName) {
            return item;
        }
    }
}
*/