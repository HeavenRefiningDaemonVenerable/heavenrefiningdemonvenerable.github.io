import { game } from './game-state.js';
import { showNotification } from './ui.js';
import { calculateProduction, calculateClickPower } from './calculations.js';
import { audioManager } from './audio-manager.js';

 
const achievementRewards = {
    firstStar: { type: 'clickPower', value: 1.05 },
    hundred: { type: 'production', value: 1.03 },
    thousand: { type: 'clickPower', value: 1.1 },
    tenThousand: { type: 'production', value: 1.05 },
    million: { type: 'both', clickValue: 1.15, prodValue: 1.1 },
    billion: { type: 'both', clickValue: 1.2, prodValue: 1.15 },
    trillion: { type: 'both', clickValue: 1.3, prodValue: 1.2 },
    quadrillion: { type: 'both', clickValue: 1.5, prodValue: 1.25 },
    
    firstShard: { type: 'production', value: 1.03 },
    moreShard: { type: 'production', value: 1.05 },
    evenmoreShard: { type: 'production', value: 1.1 },
    tonsmoreShard: { type: 'production', value: 1.15 },
    hellmoreShard: { type: 'production', value: 1.25 },
    hellmore2Shard: { type: 'production', value: 1.5 },
    
    firstBuilding: { type: 'production', value: 1.02 },
    tenBuildings: { type: 'production', value: 1.03 },
    hundredBuildings: { type: 'production', value: 1.05 },
    thousandBuildings: { type: 'production', value: 1.1 },
    
    firstUpgrade: { type: 'clickPower', value: 1.03 },
    allClickUpgrades: { type: 'clickPower', value: 1.15 },
    allEfficiencyUpgrades: { type: 'production', value: 1.15 },
    halfUpgrades: { type: 'both', clickValue: 1.1, prodValue: 1.1 },
    
    firstPrestige: { type: 'prestigeBonus', value: 0.05 },
    tenPrestige: { type: 'prestigeBonus', value: 0.1 },
    thousandPrestige: { type: 'prestigeBonus', value: 0.25 },
    
    firstMiniPrestige: { type: 'production', value: 1.05 },
    tenMiniPrestige: { type: 'production', value: 1.1 },
    hundredMiniPrestige: { type: 'both', clickValue: 1.2, prodValue: 1.2 },
    
    passive100: { type: 'production', value: 1.03 },
    passive10k: { type: 'production', value: 1.05 },
    passive1m: { type: 'production', value: 1.1 },
    passive1b: { type: 'production', value: 1.2 },
    
    speed1k: { type: 'clickPower', value: 1.1 },
    speed100k: { type: 'both', clickValue: 1.15, prodValue: 1.15 },
    
    allTypes: { type: 'production', value: 1.1 },
    maxSynergy: { type: 'production', value: 1.15 },
    
    clickOnly100k: { type: 'clickPower', value: 1.5 },
    idleOnly100k: { type: 'production', value: 1.5 },
    noUpgrades1m: { type: 'both', clickValue: 2, prodValue: 2 },
    
    allStardustBuildings: { type: 'production', value: 1.1 },
    allShardBuildings: { type: 'production', value: 1.15 },
    allCoreBuildings: { type: 'production', value: 1.2 }
};

export function checkAchievements() {
    const achievements = game.achievements;

     
    checkAchievement('firstStar', game.totalStardust >= 1);
    checkAchievement('hundred', game.totalStardust >= 100);
    checkAchievement('thousand', game.totalStardust >= 1000);
    checkAchievement('tenThousand', game.totalStardust >= 10000);
    checkAchievement('million', game.totalStardust >= 1000000);
    checkAchievement('billion', game.totalStardust >= 1000000000);
    checkAchievement('trillion', game.totalStardust >= 1000000000000);
    checkAchievement('quadrillion', game.totalStardust >= 1000000000000000);
    
     
    checkAchievement('firstShard', game.starShardsTotal >= 10);
    checkAchievement('moreShard', game.starShardsTotal >= 1000);
    checkAchievement('evenmoreShard', game.starShardsTotal >= 10000);
    checkAchievement('tonsmoreShard', game.starShardsTotal >= 1000000);
    checkAchievement('hellmoreShard', game.starShardsTotal >= 1000000000);
    checkAchievement('hellmore2Shard', game.starShardsTotal >= 1000000000000);

     
    let totalBuildings = 0;
    for (let key in game.buildings) {
        totalBuildings += game.buildings[key].count;
    }
    checkAchievement('firstBuilding', totalBuildings >= 1);
    checkAchievement('tenBuildings', totalBuildings >= 10);
    checkAchievement('hundredBuildings', totalBuildings >= 100);
    checkAchievement('thousandBuildings', totalBuildings >= 1000);

     
    let purchasedUpgrades = 0;
    let clickUpgrades = 0;
    let efficiencyUpgrades = 0;
    const totalUpgrades = Object.keys(game.upgrades).length;
    
    for (let key in game.upgrades) {
        if (game.upgrades[key].purchased) {
            purchasedUpgrades++;
            if (key.startsWith('clickPower')) clickUpgrades++;
            if (key.startsWith('efficiency')) efficiencyUpgrades++;
        }
    }
    checkAchievement('firstUpgrade', purchasedUpgrades >= 1);
    checkAchievement('allClickUpgrades', clickUpgrades >= 7);
    checkAchievement('allEfficiencyUpgrades', efficiencyUpgrades >= 7);
    checkAchievement('halfUpgrades', purchasedUpgrades >= Math.floor(totalUpgrades / 2));

     
    checkAchievement('firstPrestige', game.prestigeCount >= 1);
    checkAchievement('tenPrestige', game.prestigeCount >= 10);
    checkAchievement('thousandPrestige', game.prestigeCount >= 1000);
    
     
    checkAchievement('firstMiniPrestige', game.miniPrestigeCount >= 1);
    checkAchievement('tenMiniPrestige', game.miniPrestigeCount >= 10);
    checkAchievement('hundredMiniPrestige', game.miniPrestigeCount >= 100);

     
    checkAchievement('passive100', game.stardustPerSecond >= 100);
    checkAchievement('passive10k', game.stardustPerSecond >= 10000);
    checkAchievement('passive1m', game.stardustPerSecond >= 1000000);
    checkAchievement('passive1b', game.stardustPerSecond >= 1000000000);
    
     
    const uniqueBuildings = Object.values(game.buildings).filter(b => b.count > 0).length;
    checkAchievement('allTypes', uniqueBuildings >= Object.keys(game.buildings).length);
    
    const synergyUpgrades = ['synergy1', 'synergy2', 'synergy3', 'synergy4'];
    const allSynergy = synergyUpgrades.every(key => game.upgrades[key]?.purchased);
    checkAchievement('maxSynergy', allSynergy);
    
     
    const stardustBuildings = ['stardustCollector', 'stardustExtractor', 'stardustCondenser', 'stardustProcessor', 
                               'stardustEngine', 'stardustRefinery', 'stardustFactory', 'stardustReactor', 
                               'stardustPlant', 'stardustFoundry', 'stardustComplex', 'stardustMegaforge'];
    const allStardust = stardustBuildings.every(key => game.buildings[key].count > 0);
    checkAchievement('allStardustBuildings', allStardust);
    
    const shardBuildings = ['shardCollector', 'shardPress', 'shardCrystallizer', 'shardFoundry', 
                           'shardPlant', 'shardReactor', 'shardComplex', 'shardSingularity'];
    const allShard = shardBuildings.every(key => game.buildings[key].count > 0);
    checkAchievement('allShardBuildings', allShard);
    
    const coreBuildings = ['coreExtractor', 'coreProcessor', 'coreCondenser', 'coreReactor', 
                          'corePlant', 'coreAssembly', 'coreGenerator', 'coreNexus'];
    const allCore = coreBuildings.every(key => game.buildings[key].count > 0);
    checkAchievement('allCoreBuildings', allCore);
}

function checkAchievement(key, condition) {
    if (!game.achievements[key].unlocked && condition) {
        unlockAchievement(key);
    }
}

export function unlockAchievement(key) {
    game.achievements[key].unlocked = true;
    
    const reward = achievementRewards[key];
    let rewardText = '';
    
    if (reward) {
        if (reward.type === 'clickPower') {
            rewardText = `\n+${((reward.value - 1) * 100).toFixed(0)}% Click Power!`;
        } else if (reward.type === 'production') {
            rewardText = `\n+${((reward.value - 1) * 100).toFixed(0)}% Production!`;
        } else if (reward.type === 'both') {
            rewardText = `\n+${((reward.clickValue - 1) * 100).toFixed(0)}% Click, +${((reward.prodValue - 1) * 100).toFixed(0)}% Production!`;
        } else if (reward.type === 'prestigeBonus') {
            rewardText = `\n+${(reward.value * 100).toFixed(0)}% Prestige Multiplier!`;
        }
        
        calculateProduction();
        calculateClickPower();
    }
    
    audioManager.playSound("achievement")
    showNotification('🏆 Achievement Unlocked!\n' + game.achievements[key].name + rewardText);
}

 
export function getAchievementClickMultiplier() {
    let multiplier = 1;
    
    for (let key in game.achievements) {
        if (game.achievements[key].unlocked) {
            const reward = achievementRewards[key];
            if (reward) {
                if (reward.type === 'clickPower') {
                    multiplier *= reward.value;
                } else if (reward.type === 'both') {
                    multiplier *= reward.clickValue;
                }
            }
        }
    }
    
    return multiplier;
}

export function getAchievementProductionMultiplier() {
    let multiplier = 1;
    
    for (let key in game.achievements) {
        if (game.achievements[key].unlocked) {
            const reward = achievementRewards[key];
            if (reward) {
                if (reward.type === 'production') {
                    multiplier *= reward.value;
                } else if (reward.type === 'both') {
                    multiplier *= reward.prodValue;
                }
            }
        }
    }
    
    return multiplier;
}

export function getAchievementPrestigeBonus() {
    let bonus = 0;
    
    for (let key in game.achievements) {
        if (game.achievements[key].unlocked) {
            const reward = achievementRewards[key];
            if (reward && reward.type === 'prestigeBonus') {
                bonus += reward.value;
            }
        }
    }
    
    return bonus;
}

export function getAchievementPoints() {
    let points = 0;
    for (let key in game.achievements) {
        if (game.achievements[key].unlocked) {
            points++;
        }
    }
    return points;
}

export function getTotalAchievements() {
    return Object.keys(game.achievements).length;
}

export function getAchievementReward(key) {
    const reward = achievementRewards[key];
    if (!reward) return 'Bragging Rights';
    
    if (reward.type === 'clickPower') {
        return `+${((reward.value - 1) * 100).toFixed(0)}% Click Power`;
    } else if (reward.type === 'production') {
        return `+${((reward.value - 1) * 100).toFixed(0)}% Production`;
    } else if (reward.type === 'both') {
        return `+${((reward.clickValue - 1) * 100).toFixed(0)}% Click, +${((reward.prodValue - 1) * 100).toFixed(0)}% Production`;
    } else if (reward.type === 'prestigeBonus') {
        return `+${(reward.value * 100).toFixed(0)}% Prestige Effect`;
    }
    
    return 'Special Bonus';
}
