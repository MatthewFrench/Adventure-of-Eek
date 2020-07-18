const ARMOR_CARDBOARD_UNDERWEAR = {name: "Cardboard Underwear", rating: 1, cost: 25};
const ARMOR_CROCHETED_CROCS = {name: "Crocheted Crocs", rating: 2, cost: 60};
const ARMOR_CARPET_TSHIRT = {name: "Carpet T-Shirt", rating: 3, cost: 140};
const ARMOR_WOOD_PANTS = {name: "Wood Pants", rating: 4, cost: 330};
const ARMOR_SHINY_NIGHTGOWN = {name: "Shiny Nightgown", rating: 5, cost: 470};
const ARMOR_CHRISTMAS_LIGHT_UP_SOCKS = {name: "Christmas Light Up Socks", rating: 6, cost: 820};
const ARMOR_ADAMANTIUM_NOSE_RING = {name: "Adamantium Nose-ring", rating: 8, cost: 1210};
const ARMOR_DRID_DOG_TURD_SUIT = {name: "Dried Dog-turd Suit", rating: 10, cost: 1650};
const ARMOR_TOWEL_OF_INDECENCY = {name: "Towel of Indecency", rating: 12, cost: 2150};
const ARMOR_YELLOW_POLKA_DOT_BIKINI = {name: "Yellow Polka-dot Bikini", rating: 14, cost: 3100};
const ARMOR_DRAGON_SCALE_FULL_BODY_ARMOR = {name: "Dragon Scale Full Body Armor", rating: 16, cost: 6400};
const ARMORS = [ARMOR_CARDBOARD_UNDERWEAR, ARMOR_CROCHETED_CROCS, ARMOR_CARPET_TSHIRT, ARMOR_WOOD_PANTS, ARMOR_SHINY_NIGHTGOWN, ARMOR_CHRISTMAS_LIGHT_UP_SOCKS, ARMOR_ADAMANTIUM_NOSE_RING, ARMOR_DRID_DOG_TURD_SUIT, ARMOR_TOWEL_OF_INDECENCY, ARMOR_YELLOW_POLKA_DOT_BIKINI, ARMOR_DRAGON_SCALE_FULL_BODY_ARMOR];

export function ShowArmorShop(game) {
    game.shopPopover.setTitle("Armor Shop");
    game.shopPopover.setItems(ARMORS);
    game.shopPopover.show();
}