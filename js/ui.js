import { game } from './game-state.js';
import { buildingData, upgradeData, upgradeTree, permanentUpgradeData } from './config.js';
import { formatNumber, calculateCost, calculateClickPower } from './calculations.js';
import { checkAchievements, getAchievementPoints, getTotalAchievements, getAchievementReward } from './achievements.js';
import { buyBuilding } from './buildings.js';
import { buyUpgrade, isUpgradeVisible, isUpgradeUnlocked, getUpgradeCost } from './upgrades.js';
import { canPrestige, calculatePrestigeGain, prestige, canMiniPrestige, calculateMiniPrestigeGain, miniPrestige } from './prestige.js';
import { saveGame, loadGame, exportGame, importGame, resetGame } from './save-load.js';
import { calculatePermanentUpgradeCost, canBuyPermanentUpgrade } from './permanent-upgrades.js';
import { bulkBuyAmount, setBulkBuyAmount } from './buildings.js';
import { audioManager } from './audio-manager.js';
import { settingsMenu } from "./settings.js"

var currentZoom = 1;
let collapsedCategories = new Set();

let notifContainer = document.querySelector('.notification-container');

if (!notifContainer) {
    notifContainer = document.createElement('div');
    notifContainer.className = 'notification-container';
    document.body.appendChild(notifContainer);
}

export function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;

    notifContainer.prepend(notif);

    setTimeout(() => {
        notif.remove();
    }, 3000);
}

let scrollPositions = {
    buildings: 0,
    upgrades: { left: 0, top: 0 },
    prestige: 0,
    achievements: 0,
    shop: 0
};

export function updateBuildingButtons() {
    Object.keys(game.buildings).forEach(key => {
        const building = game.buildings[key];
        const cost = calculateCost(building.baseCost, building.count);
        const costType = building.costType || 'stardust';
        const canBuy = game[costType] >= cost;

        const button = document.querySelector(`.buy-button[data-building="${key}"]`);
        if (!button) return;

        if (button.disabled && canBuy) {
            button.disabled = false;
        } else if (!button.disabled && !canBuy) {
            button.disabled = true;
        }
    });
}

let currentTab = 'buildings';

export function switchTab(tab) {
    const activePanel = document.querySelector('.content-panel.active');
    if (activePanel) {
        if (currentTab === 'upgrades') {
            const treeContainer = activePanel.querySelector('.upgrade-tree-container');
            if (treeContainer) {
                scrollPositions.upgrades.left = treeContainer.scrollLeft;
                scrollPositions.upgrades.top = treeContainer.scrollTop;
            }
        } else {
            scrollPositions[currentTab] = activePanel.scrollTop;
        }
    }
    
    currentTab = tab;
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${tab}"]`).classList.add('active');
    
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    const panels = document.querySelectorAll('.content-panel');
    const tabOrder = ['buildings', 'upgrades', 'prestige', 'achievements', 'shop'];
    const index = tabOrder.indexOf(tab);
    panels[index].classList.add('active');
    
    const newActivePanel = document.querySelector('.content-panel.active');
    if (newActivePanel) {
        if (tab === 'upgrades') {
            const treeContainer = newActivePanel.querySelector('.upgrade-tree-container');
            if (treeContainer) {
                treeContainer.scrollLeft = scrollPositions.upgrades.left;
                treeContainer.scrollTop = scrollPositions.upgrades.top;
            }
            applyZoom();
        } else {
            newActivePanel.scrollTop = scrollPositions[tab];
        }
    }
}

export function clickForge() {
    const power = calculateClickPower();
    game.stardust += power;
    game.totalStardust += power;
    checkAchievements();
}

let x = false;

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        x = true;
    }, 1000);
});

export function updateStats() {
    if (!x) return;
    
    const stardustEl = document.querySelector('[data-stat="stardust"]');
    if (stardustEl) {
        stardustEl.textContent = `${formatNumber(game.stardust)} (+${formatNumber(game.stardustPerSecond)}/s)`;
    }
    
    const perClickEl = document.querySelector('[data-stat="perClick"]');
    if (perClickEl) {
        perClickEl.textContent = formatNumber(game.stardustPerClick);
    }
    
    const cosmicEnergyEl = document.querySelector('[data-stat="cosmicEnergy"]');
    if (cosmicEnergyEl) {
        cosmicEnergyEl.textContent = formatNumber(game.cosmicEnergy);
    }
    
    const stellarFragmentsEl = document.querySelector('[data-stat="stellarFragments"]');
    if (stellarFragmentsEl) {
        stellarFragmentsEl.textContent = formatNumber(game.stellarFragments);
    }
    
    const celestialShardsEl = document.querySelector('[data-stat="celestialShards"]');
    if (celestialShardsEl) {
        celestialShardsEl.textContent = `${formatNumber(game.celestialShards)} (+${formatNumber(game.celestialShardsPerSecond)}/s)`;
    }
    
    const nebulaCoresEl = document.querySelector('[data-stat="nebulaCores"]');
    if (nebulaCoresEl) {
        nebulaCoresEl.textContent = `${formatNumber(game.nebulaCores)} (+${formatNumber(game.nebulaCoresPerSecond)}/s)`;
    }
    
    const prestigeMultiplierEl = document.querySelector('[data-stat="prestigeMultiplier"]');
    if (prestigeMultiplierEl) {
        prestigeMultiplierEl.textContent = formatNumber(game.prestigeMultiplier) + 'X';
    }
}
let lastAffordabilityState = {};

export function updateCurrentTab() {
    if (!x) return;
    
    if (currentTab !== 'buildings' && currentTab !== 'upgrades' && currentTab !== 'shop') {
        return;
    }
    
    const newState = {};
    
    if (currentTab === 'buildings') {
        Object.keys(game.buildings).forEach(key => {
            const building = game.buildings[key];
            const cost = calculateCost(building.baseCost, building.count);
            const costType = building.costType || 'stardust';
            newState[key] = game[costType] >= cost;
        });
    } else if (currentTab === 'upgrades') {
        Object.keys(game.upgrades).forEach(key => {
            const upgrade = game.upgrades[key];
            const cost = getUpgradeCost(key);
            const isUnlocked = isUpgradeUnlocked(key);
            newState[key] = !upgrade.purchased && game.stardust >= cost && isUnlocked;
        });
    } else if (currentTab === 'shop') {
        Object.keys(game.permanentUpgrades).forEach(key => {
            newState[key] = canBuyPermanentUpgrade(key);
        });
    }
    
    const stateChanged = Object.keys(newState).some(key => 
        lastAffordabilityState[key] !== newState[key]
    );
    
    if (!stateChanged) return;
    
    lastAffordabilityState = newState;
    
    const activePanel = document.querySelector('.content-panel.active');
    if (!activePanel) {
         return
       }
    if (currentTab === 'upgrades') {
            const treeContainer = activePanel.querySelector('.upgrade-tree-container');
            if (treeContainer) {
                scrollPositions.upgrades.left = treeContainer.scrollLeft;
                scrollPositions.upgrades.top = treeContainer.scrollTop;
            }
        } else {
            scrollPositions[currentTab] = activePanel.scrollTop;
        }
    
    if (currentTab === 'buildings') {
       
        activePanel.innerHTML = renderBuildings();
        collapsedCategories.forEach(cat => {
            const content = activePanel.querySelector(`[data-category-content="${cat}"]`);
            const header = activePanel.querySelector(`[data-action="toggleCategory"][data-category="${cat}"]`);
            if (content) content.classList.add('collapsed');
            if (header) header.classList.add('collapsed');
        });
    } else if (currentTab === 'upgrades') {
        activePanel.innerHTML = renderUpgrades();
    } else if (currentTab === 'shop') {
        activePanel.innerHTML = renderShop();
    }
    
    if (activePanel) {
        if (currentTab === 'upgrades') {
            const treeContainer = activePanel.querySelector('.upgrade-tree-container');
            if (treeContainer) {
                treeContainer.scrollLeft = scrollPositions.upgrades.left;
                treeContainer.scrollTop = scrollPositions.upgrades.top;
            }
        } else {
            activePanel.scrollTop = scrollPositions[currentTab];
        }
    }
}

export function render() {
    const activePanel = document.querySelector('.content-panel.active');
    if (activePanel) {
        if (currentTab === 'upgrades') {
            const treeContainer = activePanel.querySelector('.upgrade-tree-container');
            if (treeContainer) {
                scrollPositions.upgrades.left = treeContainer.scrollLeft;
                scrollPositions.upgrades.top = treeContainer.scrollTop;
            }
        } else {
            scrollPositions[currentTab] = activePanel.scrollTop;
        }
    }
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="container">
              <div class="utility-bar">
                  <button class="utility-btn" data-action="openSettings">
                      ⚙️ <span class="btn-label">Settings</span>
                  </button>
                  <button class="utility-btn" data-action="toggleMenu">
                      ☰ <span class="btn-label">Menu</span>
                  </button>
              </div>
              
              
              <div class="dropdown-menu" id="gameMenu" style="display: none;">
                  <div class="menu-section">
                      <div class="menu-section-title">Game Management</div>
                      <button data-action="saveGame">💾 Save Game</button>
                      <button data-action="exportGame">📤 Export Save</button>
                      <button data-action="importGame">📥 Import Save</button>
                  </div>
                
                  <div class="menu-section">
                      <div class="menu-section-title">Danger Zone</div>
                      <button data-action="returnToMenu" class="danger-btn">🏠 Main Menu</button>
                      <button data-action="resetGame" class="danger-btn">🗑️ Reset Game</button>
                  </div>
              </div>
              <div class="stats-panel">
                  <div class="stat-row">
                      <span class="stat-label">Stardust:</span>
                      <span class="stat-value" data-stat="stardust">${formatNumber(game.stardust)} (+${formatNumber(game.stardustPerSecond)}/s)</span>
                  </div>
                  <div class="stat-row">
                      <span class="stat-label">Per Click:</span>
                      <span class="stat-value" data-stat="perClick">${formatNumber(game.stardustPerClick)}</span>
                  </div>
                  <div class="stat-row">
                      <span class="stat-label">Cosmic Energy:</span>
                      <span class="stat-value" data-stat="cosmicEnergy">${formatNumber(game.cosmicEnergy)}</span>
                  </div>
                  <div class="stat-row">
                      <span class="stat-label">Celestial Shards:</span>
                      <span class="stat-value" data-stat="celestialShards">${formatNumber(game.celestialShards)} (+${formatNumber(game.celestialShardsPerSecond)}/s)</span>
                  </div>
                  <div class="stat-row">
                      <span class="stat-label">Stellar Fragments:</span>
                      <span class="stat-value" data-stat="stellarFragments">${formatNumber(game.stellarFragments)}</span>
                  </div>
                  <div class="stat-row">
                      <span class="stat-label">Prestige Multiplier:</span>
                      <span class="stat-value" data-stat="prestigeMultiplier">${formatNumber(game.prestigeMultiplier)}X</span>
                  </div>
              </div>

              <div class="forge-section">
                  <button class="forge-button" data-action="clickForge">
                      FORGE STAR
                  </button>
              </div>
              <hr class="solid" style="border: 1px solid #1f1f2a">
              <br>
              <div class="tabs">
                  <div class="tab ${currentTab === 'buildings' ? 'active' : ''}" data-action="switchTab" data-tab="buildings">
                      Buildings
                  </div>
                  <div class="tab ${currentTab === 'upgrades' ? 'active' : ''}" data-action="switchTab" data-tab="upgrades">
                      Upgrades
                  </div>
                  <div class="tab ${currentTab === 'prestige' ? 'active' : ''}" data-action="switchTab" data-tab="prestige">
                      Prestige
                  </div>
                  <div class="tab ${currentTab === 'achievements' ? 'active' : ''}" data-action="switchTab" data-tab="achievements">
                      Achievements (${getAchievementPoints()}/${getTotalAchievements()})
                  </div>
                  <div class="tab ${currentTab === 'shop' ? 'active' : ''}" data-action="switchTab" data-tab="shop">
                      Shop
                  </div>
              </div>
  
              <div class="content-panel ${currentTab === 'buildings' ? 'active' : ''}">
                  ${renderBuildings()}
              </div>
  
              <div class="content-panel ${currentTab === 'upgrades' ? 'active' : ''}">
                  ${renderUpgrades()}
              </div>
  
              <div class="content-panel ${currentTab === 'prestige' ? 'active' : ''}">
                  ${renderPrestige()}
              </div>
  
              <div class="content-panel ${currentTab === 'achievements' ? 'active' : ''}">
                  ${renderAchievements()}
              </div>
              <div class="content-panel ${currentTab === 'shop' ? 'active' : ''}">
                  ${renderShop()}
              </div>
              <br>
              <hr class="solid" style="border: 1px solid #1f1f2a">
              <br>
              

          </div>
        </div>
    `;
    if (currentTab === 'buildings') {
        collapsedCategories.forEach(cat => {
            const content = document.querySelector(`[data-category-content="${cat}"]`);
            const header = document.querySelector(`[data-action="toggleCategory"][data-category="${cat}"]`);
            if (content) content.classList.add('collapsed');
            if (header) header.classList.add('collapsed');
        });
    }
    restoreScrollPosition();
    attachEventListeners();
}

function restoreScrollPosition() {
    const activePanel = document.querySelector('.content-panel.active');
    if (activePanel) {
        if (currentTab === 'upgrades') {
            const treeContainer = activePanel.querySelector('.upgrade-tree-container');
            if (treeContainer) {
                requestAnimationFrame(() => {
                    treeContainer.scrollLeft = scrollPositions.upgrades.left;
                    treeContainer.scrollTop = scrollPositions.upgrades.top;
                });
            }
            applyZoom();
        } else {
            activePanel.scrollTop = scrollPositions[currentTab];
        }
    }
}

function renderBuildings() {
    const categories = {
        stardust: {
            title: 'Stardust Production',
            icon: '',
            buildings: ['stardustCollector', 'stardustExtractor', 'stardustCondenser', 'stardustProcessor', 
                       'stardustEngine', 'stardustRefinery', 'stardustFactory', 'stardustReactor', 
                       'stardustPlant', 'stardustFoundry', 'stardustComplex', 'stardustMegaforge']
        },
        shards: {
            title: 'Celestial Shards Production',
            icon: '',
            buildings: ['shardCollector', 'shardPress', 'shardCrystallizer', 'shardFoundry', 
                       'shardPlant', 'shardReactor', 'shardComplex', 'shardSingularity']
        },
        cores: {
            title: 'Nebula Cores Production',
            icon: '',
            buildings: ['coreExtractor', 'coreProcessor', 'coreCondenser', 'coreReactor', 
                       'corePlant', 'coreAssembly', 'coreGenerator', 'coreNexus']
        },
        special: {
            title: 'Special Buildings',
            icon: '',
            buildings: ['stellarAmplifier', 'cosmicHarvester', 'voidEngine']
        }
    };

    let html = `
        <div class="buildings-header">
            <div class="buildings-title">Buildings</div>
            <div class="bulk-buy-container">
                <button class="bulk-buy-toggle" data-action="toggleBulkMenu">⋮</button>
                <div class="bulk-buy-menu" data-menu="bulkBuy">
                    <div class="bulk-buy-option ${bulkBuyAmount === 1 ? 'active' : ''}" data-action="setBulkBuy" data-amount="1">Buy x1</div>
                    <div class="bulk-buy-option ${bulkBuyAmount === 5 ? 'active' : ''}" data-action="setBulkBuy" data-amount="5">Buy x5</div>
                    <div class="bulk-buy-option ${bulkBuyAmount === 50 ? 'active' : ''}" data-action="setBulkBuy" data-amount="50">Buy x50</div>
                    <div class="bulk-buy-option ${bulkBuyAmount === 'max' ? 'active' : ''}" data-action="setBulkBuy" data-amount="max">Buy Max</div>
                </div>
            </div>
        </div>
    `;

    Object.entries(categories).forEach(([key, category]) => {
        const categoryBuildings = category.buildings.filter(bKey => {
            const building = game.buildings[bKey];
            if (!building) return false;
            
            if (building.produces === 'celestialShards') {
                return game.achievements.quadrillion.unlocked && game.achievements.firstPrestige.unlocked;
            }
            if (building.produces === 'nebulaCores') {
                return game.achievements.quadrillion.unlocked && game.achievements.tenPrestige.unlocked;
            }
            if (building.costType === 'stellarFragments') {
                return game.miniPrestigeCount > 0;
            }
            return true;
        });

        if (categoryBuildings.length === 0) return;

        const totalOwned = categoryBuildings.reduce((sum, bKey) => sum + game.buildings[bKey].count, 0);
        const totalProduction = categoryBuildings.reduce((sum, bKey) => {
            const building = game.buildings[bKey];
            return sum + (building.baseProduction * building.count);
        }, 0);

        html += `
            <div class="building-category">
                <div class="category-header" data-action="toggleCategory" data-category="${key}">
                    <div class="category-title">
                        <span class="category-icon">${category.icon}</span>
                        ${category.title}
                    </div>
                    <div class="category-stats">
                        <span class="category-total">${totalOwned}</span> owned
                        ${totalProduction > 0 ? `· <span style="color: #6edb99">${formatNumber(totalProduction)}/s</span>` : ''}
                    </div>
                    <span class="category-collapse-icon">▼</span>
                </div>
                <div class="category-buildings" data-category-content="${key}">
                    ${categoryBuildings.map(bKey => {
                        const building = game.buildings[bKey];
                        const data = buildingData[bKey];
                        const costType = building.costType || 'stardust';
                        
                        let cost, amountCanBuy;
                        if (bulkBuyAmount === 'max') {
                            let tempCost = 0;
                            let count = 0;
                            while (count < 1000) {
                                const nextCost = calculateCost(building.baseCost, building.count + count);
                                if (game[costType] >= tempCost + nextCost) {
                                    tempCost += nextCost;
                                    count++;
                                } else {
                                    break;
                                }
                            }
                            cost = tempCost;
                            amountCanBuy = count;
                        } else {
                            cost = 0;
                            amountCanBuy = 0;
                            for (let i = 0; i < bulkBuyAmount; i++) {
                                const nextCost = calculateCost(building.baseCost, building.count + i);
                                if (game[costType] >= cost + nextCost) {
                                    cost += nextCost;
                                    amountCanBuy++;
                                } else {
                                    break;
                                }
                            }
                        }

                        const canBuy = amountCanBuy > 0;
                        const resourceNames = {
                            stardust: 'Stardust',
                            celestialShards: 'Celestial Shards',
                            nebulaCores: 'Nebula Cores',
                            stellarFragments: 'Stellar Fragments'
                        };

                        const icons = {
                            stardustCollector: '', stardustExtractor: '', stardustCondenser: '', stardustProcessor: '',
                            stardustEngine: '', stardustRefinery: '', stardustFactory: '', stardustReactor: '',
                            stardustPlant: '', stardustFoundry: '', stardustComplex: '',
                            stardustMegaforge: '',
                            shardCollector: '', shardPress: '', shardCrystallizer: '', shardFoundry: '',
                            shardPlant: '', shardReactor: '', shardComplex: '', shardSingularity: '',
                            coreExtractor: '', coreProcessor: '', coreCondenser: '', coreReactor: '',
                            corePlant: '', coreAssembly: '', coreGenerator: '', coreNexus: '',
                            stellarAmplifier: '', cosmicHarvester: '', voidEngine: ''
                        };

                        return `
                            <div class="building-item ${canBuy ? 'affordable' : ''}">
                                <div class="item-left">
                                    <div class="item-icon">${icons[bKey] || '⭐'}</div>
                                    <div class="item-info">
                                        <div class="item-title">
                                            ${data.name}
                                            <span class="item-count">(${building.count})</span>
                                        </div>
                                        <div class="item-description">${data.desc}</div>
                                        <div class="item-stats">
                                            ${building.produces !== 'special' ? `<span class="stat-badge">+${formatNumber(building.baseProduction)}/s each</span>` : '<span class="stat-badge">+5% per unit</span>'}
                                            ${building.count > 0 && building.produces !== 'special' ? `<span class="stat-badge">Total: ${formatNumber(building.baseProduction * building.count)}/s</span>` : ''}
                                        </div>
                                    </div>
                                </div>
                                <div class="buy-section">
                                    ${bulkBuyAmount !== 1 ? `<div class="buy-info">Buying ${bulkBuyAmount === 'max' ? amountCanBuy : Math.min(bulkBuyAmount, amountCanBuy)}x</div>` : ''}
                                    <button class="buy-button" data-action="buyBuilding" data-building="${bKey}" ${!canBuy ? 'disabled' : ''}>
                                        ${formatNumber(cost)} ${resourceNames[costType]}
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    });

    return html;
}

function renderUpgrades() {
    let html = '<div class="upgrade-tree-wrapper">';
    html += '<div class="zoom-controls">';
    html += '<button class="zoom-btn" data-action="zoomOut">−</button>';
    html += '<button class="zoom-btn" data-action="zoomReset">Reset</button>';
    html += '<button class="zoom-btn" data-action="zoomIn">+</button>';
    html += '</div>';
    html += '<div class="upgrade-tree-container" data-draggable="tree">';
    
    let maxX = 0;
    let maxY = 0;
    for (let key in upgradeTree) {
        const pos = upgradeTree[key].position;
        maxX = Math.max(maxX, pos.x);
        maxY = Math.max(maxY, pos.y);
    }
    
    const cellWidth = 200;
    const cellHeight = 150;
    const nodeWidth = cellWidth - 20;
    const nodeHeight = cellHeight - 20;
    const svgWidth = (maxX + 1) * cellWidth + 100;
    const svgHeight = (maxY + 1) * cellHeight + 100;
    
    let svgLines = `<svg class="tree-connections" width="${svgWidth}" height="${svgHeight}" style="position: absolute; top: 0; left: 0;">`;
    
    for (let key in upgradeTree) {
        const node = upgradeTree[key];
        const upgrade = game.upgrades[key];
        
        if (!isUpgradeVisible(key)) continue;
        
        node.unlocks.forEach(unlockKey => {
            const unlockNode = upgradeTree[unlockKey];
            if (unlockNode && isUpgradeVisible(unlockKey)) {
                const fromPos = node.position;
                const toPos = unlockNode.position;
                
                const x1 = fromPos.x * cellWidth + nodeWidth / 2 + 50;
                const y1 = fromPos.y * cellHeight + nodeHeight / 2 + 50;
                const x2 = toPos.x * cellWidth + nodeWidth / 2 + 50;
                const y2 = toPos.y * cellHeight + nodeHeight / 2 + 50;
                
                const isActive = upgrade.purchased;
                const strokeColor = isActive ? '#68d391' : '#2a2a3d';
                const strokeWidth = isActive ? '4' : '2';
                
                svgLines += `
                    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                          stroke="${strokeColor}" 
                          stroke-width="${strokeWidth}" 
                          stroke-dasharray="${isActive ? '0' : '8,4'}"
                          class="tree-line ${isActive ? 'active' : ''}"/>
                `;
            }
        });
    }
    
    svgLines += '</svg>';
    html += svgLines;

    html += '<div class="upgrade-tree-nodes">';
    
    for (let key in upgradeTree) {
        if (!isUpgradeVisible(key)) continue;
        
        const node = upgradeTree[key];
        const upgrade = game.upgrades[key];
        const data = upgradeData[key];
        const isUnlocked = isUpgradeUnlocked(key);
        const cost = getUpgradeCost(key);
        const canBuy = !upgrade.purchased && game.stardust >= cost && isUnlocked;
        
        const pos = node.position;

        const left = pos.x * cellWidth + 10;
        const top = pos.y * cellHeight + 10;
        
        let nodeClass = 'tree-node';
        if (upgrade.purchased) {
            nodeClass += ' purchased';
        } else if (!isUnlocked) {
            nodeClass += ' locked';
        } else if (canBuy) {
            nodeClass += ' available';
        }
        
        if (node.prereqs.length > 1) {
            nodeClass += ' multi-prereq';
        }
        
        html += `
            <div class="${nodeClass}" data-action="buyUpgrade" data-upgrade="${key}" 
                 style="position: absolute; left: ${left}px; top: ${top}px; width: ${nodeWidth}px; height: ${nodeHeight}px;">
                <div class="tree-node-title">${data.name}</div>
                <div class="tree-node-desc">${data.desc}</div>
                ${upgrade.purchased 
                    ? '<div class="tree-node-cost">✓ OWNED</div>' 
                    : `<div class="tree-node-cost">${formatNumber(cost)}</div>`
                }
                ${node.prereqs.length > 1 ? '<div class="multi-prereq-badge">⚡</div>' : ''}
            </div>
        `;
    }
    
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    return html;
}

function renderPrestige() {
    const miniGain = calculateMiniPrestigeGain();
    const fullGain = calculatePrestigeGain();
    
    return `
        <div class="prestige-panel">
          <div class="stellar-prestige">
            <h2 style="color: #4fd1c5; margin-bottom: 15px;">✨ Stellar Rebirth</h2>
            <div style="color: #a0aec0; margin-bottom: 10px;">
                Quick reset that keeps upgrades but resets buildings and stardust!
            </div>
            <div style="color: #e0e0e0; margin-bottom: 10px;">
                Rebirth Count: <span style="color: #4fd1c5;">${game.miniPrestigeCount}</span>
            </div>
            <div style="color: #e0e0e0; margin-bottom: 10px;">
                You will gain: <span style="color: #4fd1c5; font-weight: bold; font-size: 1.2em;">${formatNumber(miniGain)} Stellar Fragments</span>
            </div>
            <div style="color: #68d391; margin-bottom: 10px;">
                New Fragment Multiplier: ${(1 + ((game.stellarFragments + miniGain) * 0.02)).toFixed(2)}x
            </div>
            <div style="color: #a0aec0; font-size: 0.9em; margin-bottom: 10px;">
                (Requires 50,000 total stardust)
            </div>
            <button class="mini-prestige-button" data-action="miniPrestige" ${!canMiniPrestige() ? 'disabled' : ''}>
                STELLAR REBIRTH
            </button>
          </div>
          <div class="cosmic-prestige">
              <h2 style="color: #5e9eff; margin-bottom: 15px;">🌌 Cosmic Ascension</h2>
              <div style="color: #a0aec0; margin-bottom: 10px;">
                  Full reset for powerful Cosmic Energy and permanent multiplier!
              </div>
              <div style="color: #e0e0e0; margin-bottom: 10px;">
                  Prestige Count: <span style="color: #ffd700;">${game.prestigeCount}</span>
              </div>
              <div style="color: #e0e0e0; margin-bottom: 10px;">
                  You will gain: <span style="color: #5e9eff; font-weight: bold; font-size: 1.2em;">${formatNumber(fullGain)} Cosmic Energy</span>
              </div>
              <div style="color: #68d391; margin-bottom: 10px;">
                  New Multiplier: ${(1 + ((game.cosmicEnergy + fullGain) * 0.1)).toFixed(2)}x
              </div>
              <div style="color: #a0aec0; font-size: 0.9em; margin-bottom: 10px;">
                  (Requires 1,000,000 total stardust)
              </div>
              <button class="prestige-button" data-action="prestige" ${!canPrestige() ? 'disabled' : ''}>
                  COSMIC ASCENSION
              </button>
            </div>
        </div>
    `;
}

function renderAchievements() {
    return `
        <div class="achievements-header">
            <h2 style="color: #e0b000; margin-bottom: 10px;">
                🏆 Achievements (${getAchievementPoints()}/${getTotalAchievements()})
            </h2>
            <p style="color: #888888; font-size: 0.9em; margin-bottom: 20px;">
                Each achievement grants permanent bonuses!
            </p>
        </div>
        <div class="achievement-grid">
            ${Object.keys(game.achievements).map(key => {
                const achievement = game.achievements[key];
                const reward = getAchievementReward(key);
                const br = achievement.brTrue ? '<br>' : '';
                return `
                    <div class="achievement ${achievement.unlocked ? 'unlocked' : ''}">
                        <div class="achievement-icon">${achievement.unlocked ? '🏆' : '🔒'}</div>
                        <div class="achievement-content">
                            <div class="achievement-name">${achievement.name}</div>
                            <div class="achievement-desc">${achievement.desc}</div>
                            <div class="achievement-reward">
                                <span style="color: ${achievement.unlocked ? '#68d391' : '#6b6b7f'};">
                                    ${achievement.unlocked ? '✓' : '⭐'} ${reward}
                                </span>
                            </div>
                        </div>
                    </div>
                    ${br}
                `;
            }).join('')}
        </div>
    `;
}

function renderShop() {
    return `
        <div class="shop-panel">
            <h2 style="margin-bottom: 15px;">Permanent Upgrades</h2>
            <p style="color: #888888; margin-bottom: 20px; font-size: 0.9em;">
                These upgrades persist through prestige and never reset!
            </p>
            
            <div class="shop-grid">
                ${Object.keys(game.permanentUpgrades).map(key => {
                    const upgrade = game.permanentUpgrades[key];
                    const data = permanentUpgradeData[key];
                    const cost = calculatePermanentUpgradeCost(upgrade);
                    const canBuy = canBuyPermanentUpgrade(key);
                    const isMaxed = upgrade.level >= upgrade.maxLevel;
                    
                    const resourceNames = {
                        stardust: 'Stardust',
                        celestialShards: 'Celestial Shards',
                        nebulaCores: 'Nebula Cores',
                        cosmicEnergy: 'Cosmic Energy'
                    };
                    
                    return `
                        <div class="shop-item ${isMaxed ? 'maxed' : ''}">
                            <div class="shop-item-header">
                                <div class="shop-item-title">${data.name}</div>
                                <div class="shop-item-level">Level ${upgrade.level}/${upgrade.maxLevel}</div>
                            </div>
                            <div class="shop-item-desc">${data.desc}</div>
                            <div class="shop-item-effect">
                                ${data.getEffect(upgrade.level)}
                            </div>
                            ${!isMaxed ? `
                                <div class="shop-item-next">
                                    Next: ${data.getEffect(upgrade.level + 1)}
                                </div>
                            ` : ''}
                            <button 
                                class="shop-buy-button" 
                                data-action="buyPermanentUpgrade"
                                data-permanent-upgrade="${key}"
                                ${!canBuy || isMaxed ? 'disabled' : ''}
                            >
                                ${isMaxed ? 'MAX LEVEL' : `${formatNumber(cost)} ${resourceNames[upgrade.costType]}`}
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

let listenersAttached = false;
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let scrollStart = { left: 0, top: 0 };

function attachEventListeners() {
    if (listenersAttached) return;
    
    const app = document.getElementById('app');
    
    app.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        
        const action = target.dataset.action;
        audioManager.playRandomSound("click", 2)
        
        switch(action) {
            case 'clickForge':
                clickForge();
                break;
            case 'switchTab':
                switchTab(target.dataset.tab);
                localStorage.setItem("tab", target.dataset.tab);
                break;
            case 'buyBuilding':
                buyBuilding(target.dataset.building);
                break;
            case 'buyUpgrade':
                buyUpgrade(target.dataset.upgrade);
                break;
            case 'miniPrestige':
                miniPrestige();
                break;
            case 'prestige':
                prestige();
                break;
            case 'saveGame':
                saveGame();
                break;
            case 'loadGame':
                loadGame();
                render();
                break;
            case 'exportGame':
                exportGame();
                break;
            case 'importGame':
                importGame();
                break;
            case 'resetGame':
                resetGame();
                render();
                break;
            case 'buyPermanentUpgrade':
                window.buyPermanentUpgrade(target.dataset.permanentUpgrade);
                break;
            case 'returnToMenu':
                window.returnToMenu();
                break;
            case 'toggleBulkMenu':
                const menu = document.querySelector('[data-menu="bulkBuy"]');
                if (menu) menu.classList.toggle('active');
                break;
            case 'setBulkBuy':
                const amount = target.dataset.amount === 'max' ? 'max' : parseInt(target.dataset.amount);
                setBulkBuyAmount(amount);
                const bulkMenu = document.querySelector('[data-menu="bulkBuy"]');
                if (bulkMenu) bulkMenu.classList.remove('active');
                updateCurrentTab();
                break;
            case 'toggleCategory':
                const category = target.dataset.category;
                const content = document.querySelector(`[data-category-content="${category}"]`);
                if (content) {
                    content.classList.toggle('collapsed');
                    target.classList.toggle('collapsed');
                    if (content.classList.contains('collapsed')) {
                        collapsedCategories.add(category);
                    } else {
                        collapsedCategories.delete(category);
                    }
                }
                break;
            case 'zoomIn':
                currentZoom = Math.min(currentZoom + 0.2, 1.5);
                applyZoom();
                break;
            case 'zoomOut':
                currentZoom = Math.max(currentZoom - 0.2, 0.5);
                applyZoom();
                break;
            case 'zoomReset':
                currentZoom = 1;
                applyZoom();
                break;
            case 'openSettings':
                settingsMenu.show();
                break;
            case 'toggleMenu':
                toggleGameMenu();
                break;
            
        }
    });
    
    document.addEventListener('click', (e) => {
        const menu = document.querySelector('[data-menu="bulkBuy"]');
        const toggle = e.target.closest('[data-action="toggleBulkMenu"]');
        if (menu && !toggle && !menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
    
    app.addEventListener('mousedown', (e) => {
        const container = e.target.closest('[data-draggable="tree"]');
        if (!container || e.target.closest('.tree-node')) return;
        
        isDragging = true;
        dragStart.x = e.pageX;
        dragStart.y = e.pageY;
        scrollStart.left = container.scrollLeft;
        scrollStart.top = container.scrollTop;
        container.style.cursor = 'grabbing';
    });
    
    app.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const container = document.querySelector('[data-draggable="tree"]');
        if (!container) return;
        
        e.preventDefault();
        const dx = e.pageX - dragStart.x;
        const dy = e.pageY - dragStart.y;
        container.scrollLeft = scrollStart.left - dx;
        container.scrollTop = scrollStart.top - dy;
    });
    
    app.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            const container = document.querySelector('[data-draggable="tree"]');
            if (container) container.style.cursor = 'grab';
        }
    });
    
    
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('gameMenu');
        const menuButton = e.target.closest('[data-action="toggleMenu"]');
        if (menu && !menu.contains(e.target) && !menuButton) {
            menu.style.display = 'none';
        }
        
        // Close bulk buy menu when clicking outside
        const bulkMenu = document.querySelector('[data-menu="bulkBuy"]');
        const toggle = e.target.closest('[data-action="toggleBulkMenu"]');
        if (bulkMenu && !toggle && !bulkMenu.contains(e.target)) {
            bulkMenu.classList.remove('active');
        }
    });
    
    app.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            const container = document.querySelector('[data-draggable="tree"]');
            if (container) container.style.cursor = 'grab';
        }
    });
    
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('tab')) {
            const audio = document.getElementById('click-sound');
            if (audio) {
                audio.currentTime = 0;
                audio.playbackRate = 2;
                audio.play().catch(() => {});
            }
        }
    });
    
    listenersAttached = true;
}

function applyZoom() {
    const wrapper = document.querySelector('.upgrade-tree-nodes');
    const svg = document.querySelector('.tree-connections');
    if (wrapper) wrapper.style.transform = `scale(${currentZoom})`;
    if (svg) svg.style.transform = `scale(${currentZoom})`;
}

function toggleGameMenu() {
    const menu = document.getElementById('gameMenu');
    if (menu) {
      if (menu.style.display === "none") {
        menu.style.display = "block"
      } else {
        menu.style.display = "none"
      }
      setTimeout(() => console.log('later', menu.style.display), 2000);
    }
}

function closeMenu() {
    const menu = document.getElementById('gameMenu');
    if (menu) menu.style.display = 'none';
}
