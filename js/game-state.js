export const game = {
    stardust: 0,
    totalStardust: 0,
    stardustPerSecond: 0,
    stardustPerClick: 1,
    
    starShards: 0,
    starShardsTotal: 0,
    starShardsPerSecond: 0,
    
    nebulaCores: 0,
    nebulaCoresTotal: 0,
    nebulaCoresPerSecond: 0,
    
     
    stellarFragments: 0,
    totalStellarFragments: 0,
    stellarFragmentMultiplier: 1,
    miniPrestigeCount: 0,
    
    cosmicEnergy: 0,
    totalCosmicEnergy: 0,
    prestigeMultiplier: 1,
    prestigeCount: 0,
    
     
    totalPlayTime: 0,
    sessionStartTime: Date.now(),
    
    buildings: {
         
        stardustCollector: { count: 0, baseCost: 15, baseProduction: 0.1, produces: 'stardust' },
        stardustExtractor: { count: 0, baseCost: 100, baseProduction: 1, produces: 'stardust' },
        stardustCondenser: { count: 0, baseCost: 750, baseProduction: 8, produces: 'stardust' },
        stardustProcessor: { count: 0, baseCost: 2000, baseProduction: 25, produces: 'stardust' },
        stardustEngine: { count: 0, baseCost: 15000, baseProduction: 150, produces: 'stardust' },
        stardustRefinery: { count: 0, baseCost: 90000, baseProduction: 800, produces: 'stardust' },
        stardustFactory: { count: 0, baseCost: 200000, baseProduction: 2000, produces: 'stardust' },
        stardustReactor: { count: 0, baseCost: 1000000, baseProduction: 12000, produces: 'stardust' },
        stardustPlant: { count: 0, baseCost: 5000000, baseProduction: 70000, produces: 'stardust' },
        stardustFoundry: { count: 0, baseCost: 25000000, baseProduction: 400000, produces: 'stardust' },
        stardustComplex: { count: 0, baseCost: 180000000, baseProduction: 2500000, produces: 'stardust' },
        stardustMegaforge: { count: 0, baseCost: 1000000000, baseProduction: 12000000, produces: 'stardust' },
        
         
        shardCollector: { count: 0, baseCost: 100000, baseProduction: 0.5, produces: 'starShards', costType: 'stardust' },
        shardPress: { count: 0, baseCost: 12000, baseProduction: 5, produces: 'starShards', costType: 'starShards' },
        shardCrystallizer: { count: 0, baseCost: 60000, baseProduction: 40, produces: 'starShards', costType: 'starShards' },
        shardFoundry: { count: 0, baseCost: 360000, baseProduction: 300, produces: 'starShards', costType: 'starShards' },
        shardPlant: { count: 0, baseCost: 1800000, baseProduction: 2000, produces: 'starShards', costType: 'starShardd' },
        shardReactor: { count: 0, baseCost: 12000000, baseProduction: 15000, produces: 'starShards', costType: 'starShards' },
        shardComplex: { count: 0, baseCost: 60000000, baseProduction: 100000, produces: 'starShards', costType: 'starShards' },
        shardSingularity: { count: 0, baseCost: 36000000, baseProduction: 800000, produces: 'starShards', costType: 'starShards' },
        
         
        coreExtractor: { count: 0, baseCost: 1000, baseProduction: 0.1, produces: 'nebulaCores', costType: 'starShards' },
        coreProcessor: { count: 0, baseCost: 10000, baseProduction: 1, produces: 'nebulaCores', costType: 'starShards' },
        coreCondenser: { count: 0, baseCost: 100000, baseProduction: 10, produces: 'nebulaCores', costType: 'starShards' },
        coreReactor: { count: 0, baseCost: 1000000, baseProduction: 80, produces: 'nebulaCores', costType: 'starShards' },
        corePlant: { count: 0, baseCost: 10000000, baseProduction: 600, produces: 'nebulaCores', costType: 'starShards' },
        coreAssembly: { count: 0, baseCost: 100000000, baseProduction: 5000, produces: 'nebulaCores', costType: 'starShards' },
        coreGenerator: { count: 0, baseCost: 1000000000, baseProduction: 40000, produces: 'nebulaCores', costType: 'starShards' },
        coreNexus: { count: 0, baseCost: 10000000000, baseProduction: 300000, produces: 'nebulaCores', costType: 'starShards' },
        
         
        stellarAmplifier: { count: 0, baseCost: 50, baseProduction: 0, produces: 'special', costType: 'stellarFragments' },
        cosmicHarvester: { count: 0, baseCost: 200, baseProduction: 1000, produces: 'all', costType: 'stellarFragments' },
        voidEngine: { count: 0, baseCost: 500, baseProduction: 10000, produces: 'stardust', costType: 'stellarFragments' }
    },
    
    upgrades: {
         
        clickPower1: { cost: 100, purchased: false, multiplier: 2 },
        clickPower2: { cost: 500, purchased: false, multiplier: 1.5 },
        clickPower3: { cost: 2000, purchased: false, multiplier: 2 },
        clickPower4: { cost: 10000, purchased: false, multiplier: 2.5 },
        clickPower5: { cost: 50000, purchased: false, multiplier: 3 },
        clickPower6: { cost: 500000, purchased: false, multiplier: 5 },
        clickPower7: { cost: 5000000, purchased: false, multiplier: 8 },
        
         
        efficiency1: { cost: 150, purchased: false, multiplier: 1.5 },
        efficiency2: { cost: 600, purchased: false, multiplier: 2 },
        efficiency3: { cost: 3000, purchased: false, multiplier: 1.5 },
        efficiency4: { cost: 15000, purchased: false, multiplier: 2 },
        efficiency5: { cost: 75000, purchased: false, multiplier: 2.5 },
        efficiency6: { cost: 750000, purchased: false, multiplier: 4 },
        efficiency7: { cost: 7500000, purchased: false, multiplier: 6 },
        
         
        cosmic1: { cost: 1000, purchased: false, bonus: 0.01 },
        cosmic2: { cost: 10000, purchased: false, bonus: 0.02 },
        cosmic3: { cost: 100000, purchased: false, bonus: 0.05 },
        cosmic4: { cost: 1000000, purchased: false, bonus: 0.10 },
        cosmic5: { cost: 10000000, purchased: false, bonus: 0.20 },
        
         
        collector1: { cost: 500, purchased: false, multiplier: 2, building: 'stardustCollector' },
        extractor1: { cost: 3000, purchased: false, multiplier: 2, building: 'stardustExtractor' },
        condenser1: { cost: 20000, purchased: false, multiplier: 2, building: 'stardustCondenser' },
        processor1: { cost: 50000, purchased: false, multiplier: 2, building: 'stardustProcessor' },
        engine1: { cost: 300000, purchased: false, multiplier: 2, building: 'stardustEngine' },
        refinery1: { cost: 2000000, purchased: false, multiplier: 2, building: 'stardustRefinery' },
        factory1: { cost: 5000000, purchased: false, multiplier: 2, building: 'stardustFactory' },
        
        stellar1: { cost: 2000000, purchased: false, multiplier: 2, building: 'stardustReactor' },
        stellar2: { cost: 10000000, purchased: false, multiplier: 2, building: 'stardustPlant' },
        stellar3: { cost: 50000000, purchased: false, multiplier: 2, building: 'stardustFoundry' },
        stellar4: { cost: 300000000, purchased: false, multiplier: 2, building: 'stardustComplex' },
        stellar5: { cost: 2000000000, purchased: false, multiplier: 2, building: 'stardustMegaforge' },
        stellar6: { cost: 10000000000, purchased: false, multiplier: 3, building: 'stardustReactor' },
        stellar7: { cost: 50000000000, purchased: false, multiplier: 3, building: 'stardustPlant' },
        stellar8: { cost: 250000000000, purchased: false, multiplier: 3, building: 'stardustFoundry' },
        stellar9: { cost: 1000000000000, purchased: false, multiplier: 3, building: 'stardustComplex' },
        stellar10: { cost: 5000000000000, purchased: false, multiplier: 3, building: 'stardustMegaforge' },
        
         
        synergy1: { cost: 25000, purchased: false, multiplier: 1.5, requiresBuildings: 5 },
        synergy2: { cost: 500000, purchased: false, multiplier: 2, requiresBuildings: 10 },
        synergy3: { cost: 10000000, purchased: false, multiplier: 3, requiresBuildings: 15 },
        synergy4: { cost: 500000000, purchased: false, multiplier: 4, requiresBuildings: 20 },
        
         
        shardBoost1: { cost: 100000000, purchased: false, multiplier: 2, resourceType: 'celestialShards' },
        shardBoost2: { cost: 1000000000, purchased: false, multiplier: 2.5, resourceType: 'celestialShards' },
        shardBoost3: { cost: 10000000000, purchased: false, multiplier: 3, resourceType: 'celestialShards' },
        shardBoost4: { cost: 100000000000, purchased: false, multiplier: 4, resourceType: 'celestialShards' },
        
         
        coreBoost1: { cost: 1000000, purchased: false, multiplier: 2, resourceType: 'nebulaCores' },
        coreBoost2: { cost: 10000000, purchased: false, multiplier: 2.5, resourceType: 'nebulaCores' },
        coreBoost3: { cost: 100000000, purchased: false, multiplier: 3, resourceType: 'nebulaCores' },
        coreBoost4: { cost: 1000000000, purchased: false, multiplier: 4, resourceType: 'nebulaCores' },
        
         
        shardToStardust: { cost: 500000000, purchased: false, crossBonus: { from: 'celestialShards', to: 'stardust', rate: 0.01 } },
        coreToShard: { cost: 50000000, purchased: false, crossBonus: { from: 'nebulaCores', to: 'celestialShards', rate: 0.01 } },
        coreToStardust: { cost: 1000000000, purchased: false, crossBonus: { from: 'nebulaCores', to: 'stardust', rate: 0.005 } },
        
         
        autoClick1: { cost: 5000, purchased: false, autoClickRate: 1 },
        autoClick2: { cost: 100000, purchased: false, autoClickRate: 2 },
        autoClick3: { cost: 5000000, purchased: false, autoClickRate: 5 },
        
         
        fragmentBoost1: { cost: 50000000000, purchased: false, fragmentPower: 0.01 },
        fragmentBoost2: { cost: 500000000000, purchased: false, fragmentPower: 0.02 },
        fragmentBoost3: { cost: 5000000000000, purchased: false, fragmentPower: 0.05 },
        
         
        timeBonus1: { cost: 2000000, purchased: false, timeMultiplier: 0.01, maxHours: 50 },
        timeBonus2: { cost: 50000000, purchased: false, timeMultiplier: 0.02, maxHours: 50 },
        
         
        pureClick: { cost: 50000000, purchased: false, pureClickBonus: 10 },
        pureIdle: { cost: 50000000, purchased: false, pureIdleBonus: 5 },
        
         
        prestigeEfficiency: { cost: 100000000, purchased: false, prestigeBonus: 0.1 },
        fragmentRetention: { cost: 1000000000, purchased: false, fragmentRetentionRate: 0.2 },
        
         
        ultimatePower: { cost: 10000000, purchased: false, multiplier: 5, clickMultiplier: 5 },
        ultimateSynergy2: { cost: 100000000000, purchased: false, multiplier: 3 },
        transcendence1: { cost: 1000000000000, purchased: false, multiplier: 2 },
        transcendence2: { cost: 10000000000000, purchased: false, multiplier: 3 },
        transcendence3: { cost: 100000000000000, purchased: false, multiplier: 5 }
    },
    
    achievements: {
         
        firstStar: { name: 'First Star', desc: 'Collect your first stardust', unlocked: false },
        hundred: { name: 'Hundred Stars', desc: 'Reach 100 total stardust', unlocked: false },
        thousand: { name: 'Thousand Stars', desc: 'Reach 1,000 total stardust', unlocked: false },
        tenThousand: { name: 'Ten Thousand Stars', desc: 'Reach 10,000 total stardust', unlocked: false },
        million: { name: 'Million Stars', desc: 'Reach 1,000,000 total stardust', unlocked: false },
        billion: { name: 'Billion Stars', desc: 'Reach 1 billion total stardust', unlocked: false },
        trillion: { name: 'Trillion Stars', desc: 'Reach 1 trillion total stardust', unlocked: false },
        quadrillion: { name: 'Quadrillion Stars', desc: 'Reach 1 quadrillion total stardust', unlocked: false },
        
         
        firstShard: { name: 'Shard Seeker', desc: 'Collect 10 star shards', unlocked: false },
        moreShard: { name: 'Shard Collector', desc: 'Collect 1,000 star shards', unlocked: false },
        evenmoreShard: { name: 'Shard Hoarder', desc: 'Collect 10,000 star shards', unlocked: false },
        tonsmoreShard: { name: 'Shard Master', desc: 'Collect 1,000,000 star shards', unlocked: false },
        hellmoreShard: { name: 'Shard Overlord', desc: 'Collect 1 billion star shards', unlocked: false },
        hellmore2Shard: { name: 'Shard God', desc: 'Collect 1 trillion star shards', unlocked: false },
        
         
        firstBuilding: { name: 'Builder', desc: 'Purchase your first building', unlocked: false },
        tenBuildings: { name: 'Constructor', desc: 'Own 10 buildings total', unlocked: false },
        hundredBuildings: { name: 'Industrialist', desc: 'Own 100 buildings total', unlocked: false },
        thousandBuildings: { name: 'Megacorp', desc: 'NEW: Own 1,000 buildings total', unlocked: false },
        
         
        firstUpgrade: { name: 'Upgrader', desc: 'Purchase your first upgrade', unlocked: false },
        allClickUpgrades: { name: 'Click Master', desc: 'Purchase all click power upgrades', unlocked: false },
        allEfficiencyUpgrades: { name: 'Efficiency Expert', desc: 'NEW: Purchase all efficiency upgrades', unlocked: false },
        halfUpgrades: { name: 'Halfway There', desc: 'NEW: Purchase 50% of all upgrades', unlocked: false },
        
         
        firstPrestige: { name: 'Ascended', desc: 'Prestige for the first time', unlocked: false },
        tenPrestige: { name: 'Veteran Ascender', desc: 'Prestige 10 times', unlocked: false },
        thousandPrestige: { name: 'Eternal Ascender', desc: 'Prestige 1,000 times', unlocked: false, brTrue: true },
        
         
        firstMiniPrestige: { name: 'Fragment Finder', desc: 'Perform your first Stellar Rebirth', unlocked: false },
        tenMiniPrestige: { name: 'Fragment Collector', desc: 'Perform 10 Stellar Rebirths', unlocked: false },
        hundredMiniPrestige: { name: 'Fragment Master', desc: 'Perform 100 Stellar Rebirths', unlocked: false, brTrue: true },
        
         
        passive100: { name: 'Passive Income', desc: 'Reach 100 stardust/s', unlocked: false },
        passive10k: { name: 'Idle Gains', desc: 'Reach 10,000 stardust/s', unlocked: false },
        passive1m: { name: 'Idle Empire', desc: 'Reach 1,000,000 stardust/s', unlocked: false },
        passive1b: { name: 'Idle Titan', desc: 'NEW: Reach 1 billion stardust/s', unlocked: false },
        
         
        speed1k: { name: 'Speed Runner', desc: 'Reach 1,000 stardust in under 5 minutes', unlocked: false },
        speed100k: { name: 'Speed Demon', desc: 'Reach 100,000 stardust in under 30 minutes', unlocked: false },
        
         
        allTypes: { name: 'Diverse Portfolio', desc: 'Own at least one of every building type', unlocked: false },
        maxSynergy: { name: 'Perfect Synergy', desc: 'Unlock all synergy upgrades', unlocked: false },
        
         
        clickOnly100k: { name: 'Clicker Hero', desc: 'Reach 100k with only click upgrades', unlocked: false },
        idleOnly100k: { name: 'True Idler', desc: 'Reach 100k with zero clicks', unlocked: false },
        noUpgrades1m: { name: 'Purist', desc: 'Reach 1M with no upgrades purchased', unlocked: false },
        
         
        allStardustBuildings: { name: 'Stardust Baron', desc: 'Own all stardust buildings', unlocked: false },
        allShardBuildings: { name: 'Shard Magnate', desc: 'Own all shard buildings', unlocked: false },
        allCoreBuildings: { name: 'Core Commander', desc: 'Own all core buildings', unlocked: false }
    },
    
    permanentUpgrades: {
        offlineProduction: { level: 0, maxLevel: 1, baseCost: 50, costType: 'cosmicEnergy' },
        autoClicker: { level: 0, maxLevel: 10, baseCost: 20, costType: 'cosmicEnergy' },
        productionBoost: { level: 0, maxLevel: 20, baseCost: 30, costType: 'cosmicEnergy' },
        startingResources: { level: 0, maxLevel: 50, baseCost: 10, costType: 'cosmicEnergy' },
        buildingDiscount: { level: 0, maxLevel: 10, baseCost: 40, costType: 'cosmicEnergy' },
        upgradeDiscount: { level: 0, maxLevel: 10, baseCost: 35, costType: 'cosmicEnergy' },
        fragmentKeeper: { level: 0, maxLevel: 5, baseCost: 100, costType: 'cosmicEnergy' },
        fasterTicks: { level: 0, maxLevel: 5, baseCost: 75, costType: 'cosmicEnergy' }
    }
};
