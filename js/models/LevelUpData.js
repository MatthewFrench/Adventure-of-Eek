const BASE = 15;
const INCREASE_MULTIPLIER = 0.25;
const LEVEL_EXPERIENCE_CACHE = [0, 0, BASE];
// This is a fibonacci-like algorithm
function GetExperienceForLevel(level) {
    // Cache to save a lot of CPU cycles later levels
    if (level < LEVEL_EXPERIENCE_CACHE.length) {
        let experience = LEVEL_EXPERIENCE_CACHE[level];
        if (experience !== undefined) {
            return experience;
        }
    }
    let experience = Math.floor(GetExperienceForLevel(level - 2) * INCREASE_MULTIPLIER + GetExperienceForLevel(level - 1));
    LEVEL_EXPERIENCE_CACHE[level] = experience;
    return experience;
}

// Increase experience, check level up
export function AppendExperience(experience, game) {
    game.getCurrentGame().experience += experience;
    CheckLevelUp(game);
    game.mainWindow.updateDisplay();
}

// Attempt to level up, increase stats, show popup
function CheckLevelUp(game) {
    let currentGame = game.getCurrentGame();
    const nextLevelExperience = GetExperienceForLevel(currentGame.level + 1);
    if (currentGame.experience >= nextLevelExperience) {
        // Level up
        currentGame.level += 1;
        // Determine random stat increase
        const STRENGTH_STAT = 1;
        const SPEED_STAT = 2;
        const HEALTH_STAT = 3;
        const STAT_ARRAY = shuffleArray([STRENGTH_STAT, SPEED_STAT, HEALTH_STAT]);
        let increaseStats = 0;
        let statMessage = "You  have leveled up to level " + currentGame.level + "!\n\n";
        // Give one free stat increase per level
        increaseStats += 1;
        // Randomly choose to increase other stats
        const baseRandomness = 0.5;
        for (let index = 1; index < STAT_ARRAY.length; index++) {
            if (Math.random() >= baseRandomness) {
                increaseStats += 1;
            }
        }
        for (let index = 0; index < STAT_ARRAY.length && index < increaseStats; index++) {
            let stat = STAT_ARRAY[index];
            if (stat === STRENGTH_STAT) {
                currentGame.strength += 1;
                statMessage += "Your strength has increased!\n";
            } else if (stat === SPEED_STAT) {
                currentGame.speed += 1;
                statMessage += "Your speed has increased!\n";
            } else if (stat === HEALTH_STAT) {
                let healthIncrease = Math.floor(Math.random() * 5 + 5);
                currentGame.health += healthIncrease;
                currentGame.currentHealth += healthIncrease;
                statMessage += "Your health has increased!\n";
            }
        }
        game.eventPopover.set("Level up!",
            statMessage,
            "Yay!",
            () => {
                game.eventPopover.hide()
                CheckLevelUp(game);
            })
        game.eventPopover.show()
        game.mainWindow.updateDisplay();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}