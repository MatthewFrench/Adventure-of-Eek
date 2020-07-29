//export const ITEM_NONE = {id: 0, itemName: "", itemImage: ""}
export const ITEM_SUSHI = {id: 1, itemName: "Sushi", itemImage: "sushi.png", useText: "It was delicious.", cost: 40}
export const ITEM_CORNED_BEEF_HASH = {id: 1, itemName: "Corned Beef Hash", itemImage: "corned-beef-hash.png", useText: "Todo.", cost: 200}
export const ITEM_SPINACH = {id: 1, itemName: "Spinach", itemImage: "spinach.png", useText: "Todo.", cost: 500}
export const ITEM_SPAGHETTI = {id: 1, itemName: "Spaghetti", itemImage: "spaghetti.png", useText: "Todo.", cost: 500}
export const ITEM_EARL_GREY_TEA = {id: 1, itemName: "Earl Grey Tea", itemImage: "earl-grey-tea.png", useText: "Todo.", cost: 1000}

export function UseItem(item, game) {
    const currentGame = game.getCurrentGame();
    if (item === ITEM_SUSHI) {
        let originalHealth = currentGame.currentHealth;
        currentGame.currentHealth += 50;
        if (currentGame.currentHealth > currentGame.health) {
            currentGame.currentHealth = currentGame.health;
        }
        let newHealth = currentGame.currentHealth - originalHealth;
        game.print("You ate " + item.itemName.toLowerCase() + ". " + newHealth + " health restored. " + item.useText);
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