const WEAPON_PAPER_CARDBOARD_TUBE = {id:1, name: "Wrapping Paper Cardboard Tube", rating: 1, cost: 25};
const WEAPON_SERRATED_PLASTIC_SPORK = {id:2, name: "Serrated Plastic Spork", rating: 2, cost: 60};
const WEAPON_EXTREMELY_BAD_BREATH_GUM = {id:3, name: "Extremely Bad Breath Gum", rating: 3, cost: 140};
const WEAPON_HEALTHPOT_LAUNCHER = {id:4, name: "Healthpot Launcher", rating: 4, cost: 330};
const WEAPON_FROZEN_POPSICKLE_SHIV = {id:5, name: "Frozen Popsickle Shiv", rating: 5, cost: 470};
const WEAPON_A_DAMAGED_4K_TV = {id:6, name: "A Damaged 4K TV", rating: 6, cost: 820};
const WEAPON_THE_POWER_OF_IMAGINATION_AND_THIS_KNIFE = {id:7, name: "Power of Imagination... and this Knife", rating: 8, cost: 1210};
const WEAPON_BOW_THAT_SHOOTS_BULLETS = {id:8, name: "Bow that Shoots Bullets", rating: 10, cost: 1650};
const WEAPON_FART_GUN = {id:9, name: "Fart Gun", rating: 12, cost: 2150};
const WEAPON_ANGRY_ATTACK_FERRET = {id:10, name: "Angry Attack Ferret", rating: 14, cost: 3100};
const WEAPON_EXTREMELY_OVERSIZED_MASSIVE_ANIME_SWORD = {id:11, name: "Unnecessarily Massive Anime Sword", rating: 16, cost: 6400};
const WEAPONS = [WEAPON_PAPER_CARDBOARD_TUBE, WEAPON_SERRATED_PLASTIC_SPORK, WEAPON_EXTREMELY_BAD_BREATH_GUM, WEAPON_HEALTHPOT_LAUNCHER, WEAPON_FROZEN_POPSICKLE_SHIV, WEAPON_A_DAMAGED_4K_TV, WEAPON_THE_POWER_OF_IMAGINATION_AND_THIS_KNIFE, WEAPON_BOW_THAT_SHOOTS_BULLETS, WEAPON_FART_GUN, WEAPON_ANGRY_ATTACK_FERRET, WEAPON_EXTREMELY_OVERSIZED_MASSIVE_ANIME_SWORD];

export function ShowWeaponShop(game) {
    let currentGame = game.getCurrentGame();
    game.shopPopover.setShopType("Weapon");
    game.shopPopover.setItems(WEAPONS, currentGame.weapon);
    UpdateCurrentWeaponDisplay(game);
    game.shopPopover.updateGoldDisplay();
    game.shopPopover.setBuyButtonClick((buyItem) => {
        if (buyItem != null && buyItem !== currentGame.weapon) {
            let currentWeaponRating = 0;
            let currentWeaponCost = 0;
            if (currentGame.weapon != null) {
                currentWeaponCost = Math.floor(currentGame.weapon.cost / 2);
                currentWeaponRating = currentGame.weapon.rating;
            }
            if (currentGame.gold + currentWeaponCost >= buyItem.cost && buyItem.rating > currentWeaponRating) {
                // Sell current weapon first
                currentGame.gold += currentWeaponCost;
                // Buy new weapon
                currentGame.gold -= buyItem.cost;
                currentGame.weapon = buyItem;
                game.shopPopover.setItems(WEAPONS, currentGame.weapon);
                UpdateCurrentWeaponDisplay(game);
                game.shopPopover.updateGoldDisplay();
                game.mainWindow.updateDisplay();
            }
        }
    });
    game.shopPopover.show();
}

function UpdateCurrentWeaponDisplay(game) {
    let weapon = game.getCurrentGame().weapon;
    let weaponName = "No Weapon";
    let weaponRating = "0";
    let weaponWorth = "0";
    if (weapon !== null) {
        weaponName = weapon.name;
        weaponRating = weapon.rating;
        weaponWorth = Math.floor(weapon.cost / 2);
    }
    game.shopPopover.updateCurrentItemDisplay(weaponName, weaponRating, weaponWorth);
}