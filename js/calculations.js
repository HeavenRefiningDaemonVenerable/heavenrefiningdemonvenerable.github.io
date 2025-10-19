import { game } from './game-state.js';
import { CONFIG } from './config.js';
import { getAchievementClickMultiplier, getAchievementProductionMultiplier } from './achievements.js';

export function formatNumber(num) {
    const settings = JSON.parse(localStorage.getItem('starForgeSettings') || '{}');
    const format = settings.numberFormat || 'standard';
    if (!isFinite(num)) return '∞';
    if (num === 0) return '0.000';

    const suffixes = [
        '', 'K', 'M', 'B', 'T', 'Qu', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc',
        'Ud', 'Dd', 'Td', 'Qd', 'Qid', 'Sxd', 'Spd', 'Od', 'Nd', 'Vg', 'Googol'
    ];

    switch(format) {
        case 'scientific': {
            if (num < 1000) return num.toFixed(3);
            const exp = Math.floor(Math.log10(num));
            const mantissa = num / Math.pow(10, exp);
            return `${mantissa.toFixed(3)}e${exp}`;
        }

        case 'full':
            return num.toLocaleString('en-US', { 
                minimumFractionDigits: 3, 
                maximumFractionDigits: 3 
            });

        case 'engineering': {
            if (num < 1000) return num.toFixed(3);
            const engExp = Math.floor(Math.log10(num) / 3) * 3;
            const engMantissa = num / Math.pow(10, engExp);
            const suffixIndex = engExp / 3;
            if (suffixIndex < suffixes.length) {
                return `${engMantissa.toFixed(3)}${suffixes[suffixIndex]}`;
            }
            return `${engMantissa.toFixed(3)}e${engExp}`;
        }

        default: {
            if (num < 1000) return num.toFixed(3);
            let exp = Math.floor(Math.log10(num) / 3);
            if (exp < suffixes.length) {
                const mantissa = num / Math.pow(10, exp * 3);
                return `${mantissa.toFixed(3)}${suffixes[exp]}`;
            }
            const expMantissa = num / Math.pow(10, exp * 3);
            return `${expMantissa.toFixed(3)}e${(exp * 3)}`;
        }
    }
}

export function calculateCost(baseCost, count) {
    let cost = Math.floor(baseCost * Math.pow(CONFIG.COST_MULTIPLIER, count));
    
     
    if (game.permanentUpgrades?.buildingDiscount?.level > 0) {
        const discount = Math.min(game.permanentUpgrades.buildingDiscount.level * 0.02, 0.2);
        cost = Math.floor(cost * (1 - discount));
    }
    
    return cost;
}

export function calculateProduction() {
    let stardustTotal = 0;
    let celestialShardsTotal = 0;
    let nebulaCoresTotal = 0;

    let efficiencyMult = 1;
    let shardMult = 1;
    let coreMult = 1;

     
    for (let key in game.upgrades) {
        const upgrade = game.upgrades[key];
        if (upgrade.purchased && key.startsWith('efficiency')) {
            efficiencyMult *= upgrade.multiplier;
        }
        if (upgrade.purchased && key.startsWith('transcendence')) {
            efficiencyMult *= upgrade.multiplier;
        }
    }

     
    let synergyMult = 1;
    for (let key in game.upgrades) {
        const upgrade = game.upgrades[key];
        if (upgrade.purchased && key.startsWith('synergy')) {
            const uniqueBuildings = Object.values(game.buildings).filter(b => b.count > 0).length;
            if (uniqueBuildings >= upgrade.requiresBuildings) {
                synergyMult *= upgrade.multiplier;
            }
        }
    }

     
    for (let key in game.upgrades) {
        const upgrade = game.upgrades[key];
        if (upgrade.purchased && upgrade.resourceType === 'celestialShards') {
            shardMult *= upgrade.multiplier;
        }
        if (upgrade.purchased && upgrade.resourceType === 'nebulaCores') {
            coreMult *= upgrade.multiplier;
        }
    }

    const achievementMult = getAchievementProductionMultiplier();

     
    let fragmentMult = 1;
    for (let key in game.upgrades) {
        const upgrade = game.upgrades[key];
        if (upgrade.purchased && upgrade.fragmentPower) {
            fragmentMult += game.stellarFragments * upgrade.fragmentPower;
        }
    }

     
    let timeMult = 1;
    const hoursPlayed = game.totalPlayTime / 3600;
    for (let key in game.upgrades) {
        const upgrade = game.upgrades[key];
        if (upgrade.purchased && upgrade.timeMultiplier) {
            const bonusHours = Math.min(hoursPlayed, upgrade.maxHours);
            timeMult += bonusHours * upgrade.timeMultiplier;
        }
    }

     
    let challengeMult = 1;
    const totalBuildings = Object.values(game.buildings).reduce((sum, b) => sum + b.count, 0);
    const clickUpgrades = Object.keys(game.upgrades).filter(k => k.startsWith('clickPower') && game.upgrades[k].purchased).length;
    
     
    if (game.upgrades.pureIdle?.purchased && clickUpgrades === 0) {
        challengeMult *= 5;
    }

     
    for (let key in game.buildings) {
        const building = game.buildings[key];
        
         
        if (building.produces === 'special') {
             
            stardustTotal *= (1 + building.count * 0.05);
            continue;
        }
        
        if (building.produces === 'all') {
             
            const production = building.baseProduction * building.count;
            stardustTotal += production;
            celestialShardsTotal += production * 0.01;
            nebulaCoresTotal += production * 0.001;
            continue;
        }
        
        let production = building.baseProduction * building.count;

         
        for (let upKey in game.upgrades) {
            const upgrade = game.upgrades[upKey];
            if (upgrade.purchased && upgrade.building === key) {
                production *= upgrade.multiplier;
            }
        }

        let permanentMult = 1;
        if (game.permanentUpgrades && game.permanentUpgrades.productionBoost) {
            const boost = game.permanentUpgrades.productionBoost.level;
            permanentMult = 1 + (boost * 0.10);
        }

         
        let resourceMult = 1;
        if (building.produces === 'celestialShards') {
            resourceMult = shardMult;
        } else if (building.produces === 'nebulaCores') {
            resourceMult = coreMult;
        }

         
        production *= efficiencyMult * synergyMult * game.prestigeMultiplier * game.stellarFragmentMultiplier * 
                      permanentMult * achievementMult * resourceMult * fragmentMult * timeMult * challengeMult;

        if (building.produces === 'stardust') {
            stardustTotal += production;
        } else if (building.produces === 'celestialShards') {
            celestialShardsTotal += production;
        } else if (building.produces === 'nebulaCores') {
            nebulaCoresTotal += production;
        }
    }

     
    for (let key in game.upgrades) {
        const upgrade = game.upgrades[key];
        if (upgrade.purchased && upgrade.crossBonus) {
            const bonus = upgrade.crossBonus;
            if (bonus.from === 'celestialShards' && bonus.to === 'stardust') {
                stardustTotal += celestialShardsTotal * bonus.rate;
            } else if (bonus.from === 'nebulaCores' && bonus.to === 'celestialShards') {
                celestialShardsTotal += nebulaCoresTotal * bonus.rate;
            } else if (bonus.from === 'nebulaCores' && bonus.to === 'stardust') {
                stardustTotal += nebulaCoresTotal * bonus.rate;
            }
        }
    }

    game.stardustPerSecond = stardustTotal;
    game.celestialShardsPerSecond = celestialShardsTotal;
    game.nebulaCoresPerSecond = nebulaCoresTotal;
}

export function calculateClickPower() {
    let power = 1;

     
    for (let key in game.upgrades) {
        const upgrade = game.upgrades[key];
        if (upgrade.purchased && key.startsWith('clickPower')) {
            power *= upgrade.multiplier;
        }
    }

     
    for (let key in game.upgrades) {
        const upgrade = game.upgrades[key];
        if (upgrade.purchased && upgrade.bonus) {
            power += game.stardustPerSecond * upgrade.bonus;
        }
    }

    if (game.upgrades.ultimatePower?.purchased) {
        power *= game.upgrades.ultimatePower.clickMultiplier || 1;
    }

    const totalBuildings = Object.values(game.buildings).reduce((sum, b) => sum + b.count, 0);
    if (game.upgrades.pureClick?.purchased && totalBuildings === 0) {
        power *= 10;
    }

     
    const achievementMult = getAchievementClickMultiplier();

     
    power *= game.prestigeMultiplier * game.stellarFragmentMultiplier * achievementMult;
    
    game.stardustPerClick = power;
    return power;
}