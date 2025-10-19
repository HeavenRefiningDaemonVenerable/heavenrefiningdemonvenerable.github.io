import { game } from './game-state.js';
import { calculateProduction } from './calculations.js';
import { showNotification, render } from './ui.js';

export function calculatePermanentUpgradeCost(upgrade) {
    return Math.floor(upgrade.baseCost * Math.pow(2, upgrade.level));
}

export function canBuyPermanentUpgrade(upgradeKey) {
    const upgrade = game.permanentUpgrades[upgradeKey];
    if (upgrade.level >= upgrade.maxLevel) return false;
    
    const cost = calculatePermanentUpgradeCost(upgrade);
    const costType = upgrade.costType;
    
    return game[costType] >= cost;
}

export function buyPermanentUpgrade(upgradeKey) {
    const upgrade = game.permanentUpgrades[upgradeKey];
    
    if (upgrade.level >= upgrade.maxLevel) {
        showNotification('Already at max level!', 'warning');
        return;
    }
    
    const cost = calculatePermanentUpgradeCost(upgrade);
    const costType = upgrade.costType;
    
    if (game[costType] >= cost) {
        game[costType] -= cost;
        upgrade.level++;
        calculateProduction();
        showNotification(`Upgraded ${upgradeKey}!`, 'achievement');
        render();
    }
}

export function getPermanentProductionMultiplier() {
    const boost = game.permanentUpgrades.productionBoost.level;
    return 1 + (boost * 0.10);  
}