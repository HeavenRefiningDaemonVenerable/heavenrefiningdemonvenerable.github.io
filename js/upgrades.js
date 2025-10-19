import { game } from './game-state.js';
import { upgradeTree } from './config.js';
import { calculateProduction, calculateClickPower } from './calculations.js';
import { checkAchievements } from './achievements.js';
import { render } from './ui.js';

export function isUpgradeVisible(upgradeKey) {
    const node = upgradeTree[upgradeKey];
    if (!node) return false;
    
     
    if (node.prereqs.length === 0) return true;
    
     
    return node.prereqs.some(prereq => game.upgrades[prereq]?.purchased);
}

export function isUpgradeUnlocked(upgradeKey) {
    const node = upgradeTree[upgradeKey];
    if (!node) return false;
    
     
    if (node.prereqs.length === 0) return true;
    
     
    return node.prereqs.every(prereq => game.upgrades[prereq]?.purchased);
}

export function getUpgradeCost(upgradeKey) {
    const upgrade = game.upgrades[upgradeKey];
    let cost = upgrade.cost;
    
     
    if (game.permanentUpgrades?.upgradeDiscount?.level > 0) {
        const discount = Math.min(game.permanentUpgrades.upgradeDiscount.level * 0.03, 0.3);
        cost = Math.floor(cost * (1 - discount));
    }
    
    return cost;
}

export function buyUpgrade(upgradeKey) {
    const upgrade = game.upgrades[upgradeKey];
    const cost = getUpgradeCost(upgradeKey);
    
    if (!upgrade.purchased && game.stardust >= cost && isUpgradeUnlocked(upgradeKey)) {
        game.stardust -= cost;
        upgrade.purchased = true;
        calculateProduction();
        calculateClickPower();
        checkAchievements();
        render();
    }
}