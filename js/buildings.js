import { game } from './game-state.js';
import { calculateCost, calculateProduction } from './calculations.js';
import { checkAchievements } from './achievements.js';
import { render, showNotification } from './ui.js';

export let bulkBuyAmount = 1;

export function setBulkBuyAmount(amount) {
    bulkBuyAmount = amount;
    render();
}

export function buyBuilding(buildingKey) {
    const building = game.buildings[buildingKey];
    const costType = building.costType || 'stardust';
    
    let amountToBuy = 0;
    let totalCost = 0;

    if (bulkBuyAmount === 'max') {
         
        while (true) {
            const nextCost = calculateCost(building.baseCost, building.count + amountToBuy);
            if (game[costType] >= totalCost + nextCost) {
                totalCost += nextCost;
                amountToBuy++;
            } else {
                break;
            }
             
            if (amountToBuy > 10000) break;
        }
    } else {
         
        for (let i = 0; i < bulkBuyAmount; i++) {
            const cost = calculateCost(building.baseCost, building.count + i);
            if (game[costType] >= totalCost + cost) {
                totalCost += cost;
                amountToBuy++;
            } else {
                break;
            }
        }
    }

    if (amountToBuy > 0) {
        game[costType] -= totalCost;
        building.count += amountToBuy;
        calculateProduction();
        checkAchievements();
        
        if (amountToBuy > 1) {
            showNotification(`Bought ${amountToBuy}x ${building.name || buildingKey}!`);
        }
        
        render();
    }
}