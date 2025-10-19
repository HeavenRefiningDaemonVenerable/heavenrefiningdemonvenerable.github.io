export const CONFIG = {
    SAVE_INTERVAL: 10500,
    GAME_LOOP_INTERVAL: 100,
    NOTIFICATION_DURATION: 3000,
    COST_MULTIPLIER: 1.20,  
    PRESTIGE_THRESHOLD: 1000000,
    PRESTIGE_MULTIPLIER_BASE: 0.1,
    MINI_PRESTIGE_THRESHOLD: 50000,  
    MINI_PRESTIGE_MULTIPLIER_BASE: 0.02  
};

export const buildingData = {
     
    stardustCollector: { name: 'Stardust Collector', desc: 'Basic unit that gathers loose stardust from surrounding space.' },
    stardustExtractor: { name: 'Stardust Extractor', desc: 'Pulls trace stardust from interstellar debris.' },
    stardustCondenser: { name: 'Stardust Condenser', desc: 'NEW: Compresses ambient stardust into collectible particles.' },
    stardustProcessor: { name: 'Stardust Processor', desc: 'Refines raw stardust into usable form.' },
    stardustEngine: { name: 'Stardust Engine', desc: 'Mechanized core that drives large-scale stardust output.' },
    stardustRefinery: { name: 'Stardust Refinery', desc: 'NEW: Advanced purification system for maximum efficiency.' },
    stardustFactory: { name: 'Stardust Factory', desc: 'Automated lines mass-produce refined stardust.' },
    stardustReactor: { name: 'Stardust Reactor', desc: 'Converts stored energy into a continuous stardust flow.' },
    stardustPlant: { name: 'Stardust Plant', desc: 'Industrial setup designed for heavy stardust production.' },
    stardustFoundry: { name: 'Stardust Foundry', desc: 'Melts and reshapes cosmic matter into concentrated stardust.' },
    stardustComplex: { name: 'Stardust Complex', desc: 'Massive facility coordinating large-scale stardust systems.' },
    stardustMegaforge: { name: 'Stardust Megaforge', desc: 'Ultimate production hub turning entire regions into stardust output zones.' },
    
     
    shardCollector: { name: 'Shard Collector', desc: 'Collects raw shard fragments from stardust processing units.' },
    shardPress: { name: 'Shard Press', desc: 'Compresses raw shard material into stable forms.' },
    shardCrystallizer: { name: 'Shard Crystallizer', desc: 'NEW: Forces shard formation through quantum pressure.' },
    shardFoundry: { name: 'Shard Foundry', desc: 'Fuses compressed material into full celestial shards.' },
    shardPlant: { name: 'Shard Plant', desc: 'Scaled-up facility for consistent shard creation.' },
    shardReactor: { name: 'Shard Reactor', desc: 'Uses contained power cycles to produce shards efficiently.' },
    shardComplex: { name: 'Shard Complex', desc: 'Centralized industrial site focused on large-volume shard output.' },
    shardSingularity: { name: 'Shard Singularity', desc: 'NEW: Warps space-time to multiply shard output.' },
    
     
    coreExtractor: { name: 'Core Extractor', desc: 'Pulls unstable cores from processed shards.' },
    coreProcessor: { name: 'Core Processor', desc: 'Stabilizes extracted cores into usable energy units.' },
    coreCondenser: { name: 'Core Condenser', desc: 'NEW: Compacts nebula matter into dense cores.' },
    coreReactor: { name: 'Core Reactor', desc: 'Recycles core energy to maintain steady core production.' },
    corePlant: { name: 'Core Plant', desc: 'High-capacity facility for generating multiple nebula cores at once.' },
    coreAssembly: { name: 'Core Assembly', desc: 'Automates advanced construction of nebula cores.' },
    coreGenerator: { name: 'Core Generator', desc: 'Final-tier machine capable of sustaining entire networks of core output.' },
    coreNexus: { name: 'Core Nexus', desc: 'NEW: Legendary structure channeling pure cosmic energy.' },
    
     
    stellarAmplifier: { name: 'Stellar Amplifier', desc: 'NEW: Boosts all stardust production by 5% per unit.' },
    cosmicHarvester: { name: 'Cosmic Harvester', desc: 'NEW: Produces all three resources simultaneously.' },
    voidEngine: { name: 'Void Engine', desc: 'NEW: Taps into void energy for massive production.' }
};

export const upgradeData = {
     
    ultimatePower: { name: 'Ultimate Synergy', desc: '5x all production and click power' },  
    ultimateSynergy2: { name: 'Cosmic Apex', desc: '3x all production and unlock Transcendence path' },  
    transcendence1: { name: 'Transcendent State I', desc: '2x all production' },
    transcendence2: { name: 'Transcendent State II', desc: '3x all production' },
    transcendence3: { name: 'Transcendent State III', desc: '5x all production' },
    
     
    clickPower1: { name: 'Enhanced Forge I', desc: 'Double click power' },
    clickPower2: { name: 'Enhanced Forge II', desc: '1.5x click power' },  
    clickPower3: { name: 'Enhanced Forge III', desc: '2x click power' },  
    clickPower4: { name: 'Enhanced Forge IV', desc: '2.5x click power' },  
    clickPower5: { name: 'Enhanced Forge V', desc: '3x click power' },  
    clickPower6: { name: 'Enhanced Forge VI', desc: '5x click power' },  
    clickPower7: { name: 'Enhanced Forge VII', desc: '8x click power' },  
    
     
    efficiency1: { name: 'Stellar Efficiency I', desc: '50% more production' },
    efficiency2: { name: 'Stellar Efficiency II', desc: 'Double production' },
    efficiency3: { name: 'Stellar Efficiency III', desc: '1.5x production' },  
    efficiency4: { name: 'Stellar Efficiency IV', desc: '2x production' },  
    efficiency5: { name: 'Stellar Efficiency V', desc: '2.5x production' },  
    efficiency6: { name: 'Stellar Efficiency VI', desc: '4x production' },  
    efficiency7: { name: 'Stellar Efficiency VII', desc: '6x production' },  
    
     
    cosmic1: { name: 'Cosmic Resonance I', desc: '1% of stardust/s adds to click power' },
    cosmic2: { name: 'Cosmic Resonance II', desc: '2% of stardust/s adds to click power' },
    cosmic3: { name: 'Cosmic Resonance III', desc: '5% of stardust/s adds to click power' },
    cosmic4: { name: 'Cosmic Resonance IV', desc: '10% of stardust/s adds to click power' },
    cosmic5: { name: 'Cosmic Resonance V', desc: '20% of stardust/s adds to click power' },
    
     
    stellar1: { name: 'Reactor Boost I', desc: 'Double Stardust Reactor production' },
    stellar2: { name: 'Plant Boost I', desc: 'Double Stardust Plant production' },
    stellar3: { name: 'Foundry Boost I', desc: 'Double Stardust Foundry production' },
    stellar4: { name: 'Complex Boost I', desc: 'Double Stardust Complex production' },
    stellar5: { name: 'Megaforge Boost I', desc: 'Double Stardust Megaforge production' },
    stellar6: { name: 'Reactor Boost II', desc: 'Triple Stardust Reactor production' },
    stellar7: { name: 'Plant Boost II', desc: 'Triple Stardust Plant production' },
    stellar8: { name: 'Foundry Boost II', desc: 'Triple Stardust Foundry production' },
    stellar9: { name: 'Complex Boost II', desc: 'Triple Stardust Complex production' },
    stellar10: { name: 'Megaforge Boost II', desc: 'Triple Stardust Megaforge production' },
    
     
    collector1: { name: 'Collector Enhancement', desc: 'Double Stardust Collector production' },
    extractor1: { name: 'Extractor Enhancement', desc: 'Double Stardust Extractor production' },
    processor1: { name: 'Processor Enhancement', desc: 'Double Stardust Processor production' },
    engine1: { name: 'Engine Enhancement', desc: 'Double Stardust Engine production' },
    factory1: { name: 'Factory Enhancement', desc: 'Double Stardust Factory production' },
    
     
    condenser1: { name: 'Condenser Enhancement', desc: 'Double Stardust Condenser production' },
    refinery1: { name: 'Refinery Enhancement', desc: 'Double Stardust Refinery production' },
    
     
    synergy1: { name: 'Early Synergy', desc: '50% boost if you own 5+ different buildings' },
    synergy2: { name: 'Industrial Synergy', desc: '2x boost if you own 10+ different buildings' },
    synergy3: { name: 'Mega Synergy', desc: '3x boost if you own 15+ different buildings' },
    synergy4: { name: 'Ultra Synergy', desc: 'NEW: 4x boost if you own 20+ different buildings' },
    
     
    shardBoost1: { name: 'Shard Efficiency I', desc: '2x Celestial Shard production' },
    shardBoost2: { name: 'Shard Efficiency II', desc: '2.5x Celestial Shard production' },  
    shardBoost3: { name: 'Shard Efficiency III', desc: '3x Celestial Shard production' },  
    shardBoost4: { name: 'Shard Efficiency IV', desc: 'NEW: 4x Celestial Shard production' },
    
     
    coreBoost1: { name: 'Core Efficiency I', desc: '2x Nebula Core production' },
    coreBoost2: { name: 'Core Efficiency II', desc: '2.5x Nebula Core production' },  
    coreBoost3: { name: 'Core Efficiency III', desc: '3x Nebula Core production' },  
    coreBoost4: { name: 'Core Efficiency IV', desc: 'NEW: 4x Nebula Core production' },
    
     
    shardToStardust: { name: 'Shard Converter', desc: '1% of Shard/s adds to Stardust/s' },
    coreToShard: { name: 'Core Infusion', desc: '1% of Core/s adds to Shard/s' },
    coreToStardust: { name: 'Core Amplifier', desc: '0.5% of Core/s adds to Stardust/s' },
    
     
    autoClick1: { name: 'Auto-Forge I', desc: 'Automatically click 1 time per second' },
    autoClick2: { name: 'Auto-Forge II', desc: 'Increase auto-clicks to 2 per second' },
    autoClick3: { name: 'Auto-Forge III', desc: 'Increase auto-clicks to 5 per second' },
    
     
    fragmentBoost1: { name: 'Fragment Resonance I', desc: 'Stellar Fragments boost production by 1% each' },
    fragmentBoost2: { name: 'Fragment Resonance II', desc: 'Stellar Fragments boost production by 2% each' },
    fragmentBoost3: { name: 'Fragment Resonance III', desc: 'Stellar Fragments boost production by 5% each' },
    
     
    timeBonus1: { name: 'Temporal Accumulation I', desc: '+1% production per hour played (max 50%)' },
    timeBonus2: { name: 'Temporal Accumulation II', desc: '+2% production per hour played (max 100%)' },
    
     
    pureClick: { name: 'Pure Clicker', desc: '10x click if you have 0 buildings' },
    pureIdle: { name: 'Pure Idler', desc: '5x production if you have 0 click upgrades' },
    
     
    prestigeEfficiency: { name: 'Prestige Mastery', desc: 'Gain 10% more Cosmic Energy on prestige' },
    fragmentRetention: { name: 'Fragment Memory', desc: 'Keep 20% of Stellar Fragments on prestige' }
};

export const upgradeTree = {
     
    clickPower1: { prereqs: [], unlocks: ['clickPower2', 'cosmic1'], position: { x: 0, y: 0 } },
    clickPower2: { prereqs: ['clickPower1'], unlocks: ['clickPower3', 'collector1'], position: { x: 0, y: 2 } },
    clickPower3: { prereqs: ['clickPower2'], unlocks: ['clickPower4', 'autoClick1'], position: { x: 0, y: 4 } },
    clickPower4: { prereqs: ['clickPower3'], unlocks: ['clickPower5'], position: { x: 0, y: 6 } },
    clickPower5: { prereqs: ['clickPower4'], unlocks: ['clickPower6', 'ultimatePower'], position: { x: 0, y: 8 } },
    clickPower6: { prereqs: ['clickPower5'], unlocks: ['clickPower7'], position: { x: 0, y: 10 } },
    clickPower7: { prereqs: ['clickPower6'], unlocks: ['pureClick'], position: { x: 0, y: 12 } },

     
    efficiency1: { prereqs: [], unlocks: ['efficiency2', 'stellar1'], position: { x: 8, y: 0 } },
    efficiency2: { prereqs: ['efficiency1'], unlocks: ['efficiency3', 'extractor1'], position: { x: 8, y: 2 } },
    efficiency3: { prereqs: ['efficiency2'], unlocks: ['efficiency4', 'condenser1'], position: { x: 8, y: 4 } },
    efficiency4: { prereqs: ['efficiency3'], unlocks: ['efficiency5', 'synergy1'], position: { x: 8, y: 6 } },
    efficiency5: { prereqs: ['efficiency4'], unlocks: ['efficiency6', 'timeBonus1'], position: { x: 8, y: 8 } },
    efficiency6: { prereqs: ['efficiency5'], unlocks: ['efficiency7', 'ultimatePower'], position: { x: 8, y: 10 } },
    efficiency7: { prereqs: ['efficiency6'], unlocks: ['pureIdle'], position: { x: 8, y: 12 } },

     
    cosmic1: { prereqs: ['clickPower1'], unlocks: ['cosmic2'], position: { x: 2, y: 2 } },
    cosmic2: { prereqs: ['cosmic1'], unlocks: ['cosmic3'], position: { x: 2, y: 4 } },
    cosmic3: { prereqs: ['cosmic2'], unlocks: ['cosmic4'], position: { x: 2, y: 6 } },
    cosmic4: { prereqs: ['cosmic3'], unlocks: ['cosmic5'], position: { x: 2, y: 8 } },
    cosmic5: { prereqs: ['cosmic4'], unlocks: [], position: { x: 2, y: 10 } },

     
    stellar1: { prereqs: ['efficiency1'], unlocks: ['stellar2'], position: { x: 10, y: 2 } },
    stellar2: { prereqs: ['stellar1'], unlocks: ['stellar3'], position: { x: 10, y: 4 } },
    stellar3: { prereqs: ['stellar2'], unlocks: ['stellar4'], position: { x: 10, y: 6 } },
    stellar4: { prereqs: ['stellar3'], unlocks: ['stellar5'], position: { x: 10, y: 8 } },
    stellar5: { prereqs: ['stellar4'], unlocks: ['stellar6'], position: { x: 10, y: 10 } },
    stellar6: { prereqs: ['stellar5'], unlocks: ['stellar7'], position: { x: 12, y: 2 } },
    stellar7: { prereqs: ['stellar6'], unlocks: ['stellar8'], position: { x: 12, y: 4 } },
    stellar8: { prereqs: ['stellar7'], unlocks: ['stellar9'], position: { x: 12, y: 6 } },
    stellar9: { prereqs: ['stellar8'], unlocks: ['stellar10'], position: { x: 12, y: 8 } },
    stellar10: { prereqs: ['stellar9'], unlocks: [], position: { x: 12, y: 10 } },

     
    collector1: { prereqs: ['clickPower2'], unlocks: ['processor1'], position: { x: 1, y: 3 } },
    extractor1: { prereqs: ['efficiency2'], unlocks: ['engine1'], position: { x: 7, y: 3 } },
    processor1: { prereqs: ['collector1'], unlocks: [], position: { x: 1, y: 5 } },
    engine1: { prereqs: ['extractor1'], unlocks: ['factory1'], position: { x: 7, y: 5 } },
    factory1: { prereqs: ['engine1'], unlocks: ['refinery1'], position: { x: 7, y: 7 } },
    condenser1: { prereqs: ['efficiency3'], unlocks: [], position: { x: 9, y: 5 } },
    refinery1: { prereqs: ['factory1'], unlocks: [], position: { x: 7, y: 9 } },

     
    synergy1: { prereqs: ['efficiency4'], unlocks: ['synergy2'], position: { x: 6, y: 7 } },
    synergy2: { prereqs: ['synergy1'], unlocks: ['synergy3'], position: { x: 6, y: 9 } },
    synergy3: { prereqs: ['synergy2'], unlocks: ['synergy4'], position: { x: 6, y: 11 } },
    synergy4: { prereqs: ['synergy3'], unlocks: [], position: { x: 6, y: 13 } },

     
    autoClick1: { prereqs: ['clickPower3'], unlocks: ['autoClick2'], position: { x: 1, y: 6 } },
    autoClick2: { prereqs: ['autoClick1'], unlocks: ['autoClick3'], position: { x: 1, y: 8 } },
    autoClick3: { prereqs: ['autoClick2'], unlocks: [], position: { x: 1, y: 10 } },

     
    timeBonus1: { prereqs: ['efficiency5'], unlocks: ['timeBonus2'], position: { x: 9, y: 9 } },
    timeBonus2: { prereqs: ['timeBonus1'], unlocks: [], position: { x: 9, y: 11 } },

     
    shardBoost1: { prereqs: ['ultimatePower'], unlocks: ['shardBoost2', 'shardToStardust'], position: { x: 3, y: 13 } },
    shardBoost2: { prereqs: ['shardBoost1'], unlocks: ['shardBoost3'], position: { x: 3, y: 15 } },
    shardBoost3: { prereqs: ['shardBoost2'], unlocks: ['shardBoost4', 'ultimateSynergy2'], position: { x: 3, y: 17 } },
    shardBoost4: { prereqs: ['shardBoost3'], unlocks: ['fragmentBoost1'], position: { x: 3, y: 19 } },

     
    coreBoost1: { prereqs: ['ultimatePower'], unlocks: ['coreBoost2', 'coreToShard'], position: { x: 5, y: 13 } },
    coreBoost2: { prereqs: ['coreBoost1'], unlocks: ['coreBoost3'], position: { x: 5, y: 15 } },
    coreBoost3: { prereqs: ['coreBoost2'], unlocks: ['coreBoost4', 'ultimateSynergy2'], position: { x: 5, y: 17 } },
    coreBoost4: { prereqs: ['coreBoost3'], unlocks: ['fragmentBoost1'], position: { x: 5, y: 19 } },

     
    shardToStardust: { prereqs: ['shardBoost1'], unlocks: ['coreToStardust'], position: { x: 2, y: 14 } },
    coreToShard: { prereqs: ['coreBoost1'], unlocks: ['coreToStardust'], position: { x: 6, y: 14 } },
    coreToStardust: { prereqs: ['shardToStardust', 'coreToShard'], unlocks: [], position: { x: 4, y: 16 } },

     
    fragmentBoost1: { prereqs: ['shardBoost4', 'coreBoost4'], unlocks: ['fragmentBoost2'], position: { x: 4, y: 20 } },
    fragmentBoost2: { prereqs: ['fragmentBoost1'], unlocks: ['fragmentBoost3'], position: { x: 4, y: 22 } },
    fragmentBoost3: { prereqs: ['fragmentBoost2'], unlocks: [], position: { x: 4, y: 24 } },

     
    ultimatePower: { prereqs: ['clickPower5', 'efficiency6'], unlocks: ['shardBoost1', 'coreBoost1', 'prestigeEfficiency'], position: { x: 4, y: 11 } },
    ultimateSynergy2: { prereqs: ['shardBoost3', 'coreBoost3'], unlocks: ['transcendence1'], position: { x: 4, y: 18 } },
    
     
    prestigeEfficiency: { prereqs: ['ultimatePower'], unlocks: ['fragmentRetention'], position: { x: 2, y: 12 } },
    fragmentRetention: { prereqs: ['prestigeEfficiency'], unlocks: [], position: { x: 2, y: 14 } },
    
     
    pureClick: { prereqs: ['clickPower7'], unlocks: [], position: { x: 0, y: 14 } },
    pureIdle: { prereqs: ['efficiency7'], unlocks: [], position: { x: 8, y: 14 } },
    
     
    transcendence1: { prereqs: ['ultimateSynergy2'], unlocks: ['transcendence2'], position: { x: 4, y: 26 } },
    transcendence2: { prereqs: ['transcendence1'], unlocks: ['transcendence3'], position: { x: 4, y: 28 } },
    transcendence3: { prereqs: ['transcendence2'], unlocks: [], position: { x: 4, y: 30 } }
};

export const permanentUpgradeData = {
    offlineProduction: {
        name: 'Offline Production',
        desc: 'Earn 50% of production while offline',
        getEffect: (level) => level > 0 ? '50% offline earnings' : 'Locked'
    },
    autoClicker: {
        name: 'Auto-Clicker',
        desc: 'Automatically clicks the forge',
        getEffect: (level) => level > 0 ? `${level} click${level > 1 ? 's' : ''} per second` : 'Locked'
    },
    productionBoost: {
        name: 'Production Amplifier',
        desc: 'Permanent boost to all production',
        getEffect: (level) => level > 0 ? `+${level * 10}% all production` : 'Locked'
    },
    startingResources: {
        name: 'Prestige Starter Pack',
        desc: 'Start each prestige with bonus stardust',
        getEffect: (level) => level > 0 ? `Start with ${level * 1000} stardust` : 'Locked'
    },
    buildingDiscount: {
        name: 'Bulk Buyer',
        desc: 'Reduce building costs permanently',
        getEffect: (level) => level > 0 ? `-${level * 2}% building costs (max 20%)` : 'Locked'
    },
    upgradeDiscount: {
        name: 'Savvy Shopper',
        desc: 'Reduce upgrade costs permanently',
        getEffect: (level) => level > 0 ? `-${level * 3}% upgrade costs (max 30%)` : 'Locked'
    },
    fragmentKeeper: {
        name: 'Fragment Vault',
        desc: 'Keep Stellar Fragments through full prestige',
        getEffect: (level) => level > 0 ? `Keep ${level * 10}% of fragments (max 50%)` : 'Locked'
    },
    fasterTicks: {
        name: 'Time Dilation',
        desc: 'Game calculates more frequently',
        getEffect: (level) => level > 0 ? `+${level * 10}% calculation speed` : 'Locked'
    }
};