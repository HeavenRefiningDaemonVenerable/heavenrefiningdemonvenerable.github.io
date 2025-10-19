import { game } from './game-state.js';
import { loadGame, saveGame } from './save-load.js';
import { render } from './ui.js';
import { formatNumber } from './calculations.js';
import { settingsMenu } from "./settings.js"

export function showMainMenu() {
    const saves = loadAllSaves();
    
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="main-menu">
            <div class="menu-background">
                <div class="stars"></div>
                <div class="stars-2"></div>
                <div class="stars-3"></div>
            </div>
            
            <div class="menu-container">
                <div class="menu-header">
                    <h1 class="menu-title">
                        <span class="title-star1">✦</span>
                        STAR FORGE
                        <span class="title-star2">✦</span>
                    </h1>
                    <p class="menu-subtitle">Forge the stars, collect the cosmos</p>
                </div>
                
                <div class="save-slots">
                    ${renderSaveSlots(saves)}
                </div>
                
                <div class="menu-footer">
                    <button class="menu-button-secondary" id="settingsBtn">
                        ⚙️ Settings
                    </button>
                    <button class="menu-button-secondary" id="creditsBtn">
                        ℹ️ About
                    </button>
                </div>
            </div>
        </div>
    `;
    
    attachMenuListeners();
}

function loadAllSaves() {
    const saves = [];
    for (let i = 1; i <= 3; i++) {
        const saveKey = `starForgeGame_slot${i}`;
        const saved = localStorage.getItem(saveKey);
        
        if (saved) {
            try {
                const saveData = JSON.parse(atob(saved));
                saves.push({
                    slot: i,
                    exists: true,
                    data: saveData.data,
                    timestamp: saveData.timestamp
                });
            } catch (e) {
                saves.push({ slot: i, exists: false });
            }
        } else {
            saves.push({ slot: i, exists: false });
        }
    }
    return saves;
}

function renderSaveSlots(saves) {
    return saves.map(save => {
        if (!save.exists) {
            return `
                <div class="save-slot empty" data-slot="${save.slot}">
                    <div class="save-slot-content">
                        <div class="save-empty-icon">+</div>
                        <div class="save-empty-text">New Game</div>
                        <div class="save-slot-subtitle">Slot ${save.slot}</div>
                    </div>
                </div>
            `;
        }
        
        const data = save.data;
        const timePlayed = formatTimePlayed(save.timestamp);
        const lastPlayed = formatLastPlayed(save.timestamp);
        
        return `
            <div class="save-slot filled" data-slot="${save.slot}">
                <div class="save-slot-header">
                    <span class="save-slot-number">Slot ${save.slot}</span>
                    <span class="save-slot-time">${lastPlayed}</span>
                </div>
                
                <div class="save-slot-stats">
                    <div class="save-stat">
                        <span class="save-stat-icon">💫</span>
                        <div class="save-stat-info">
                            <div class="save-stat-label">Stardust</div>
                            <div class="save-stat-value">${formatNumber(data.stardust || 0)}</div>
                        </div>
                    </div>
                    
                    <div class="save-stat">
                        <span class="save-stat-icon">⚡</span>
                        <div class="save-stat-info">
                            <div class="save-stat-label">Cosmic Energy</div>
                            <div class="save-stat-value">${data.cosmicEnergy || 0}</div>
                        </div>
                    </div>
                    
                    <div class="save-stat">
                        <span class="save-stat-icon">🔄</span>
                        <div class="save-stat-info">
                            <div class="save-stat-label">Prestiges</div>
                            <div class="save-stat-value">${data.prestigeCount || 0}</div>
                        </div>
                    </div>
                </div>
                
                <div class="save-slot-footer">
                    <button class="save-play-button" data-slot="${save.slot}">
                        <span class="play-icon">▶</span> Play
                    </button>
                    <button class="save-delete-button" data-slot="${save.slot}">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function formatTimePlayed(timestamp) {
    const hours = Math.floor(timestamp / 3600000);
    return `${hours}h played`;
}

function formatLastPlayed(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

function attachMenuListeners() {
     
    document.querySelectorAll('.save-play-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const slot = parseInt(btn.dataset.slot);
            loadSaveSlot(slot);
        });
    });
    
     
    document.querySelectorAll('.save-slot.empty').forEach(slot => {
        slot.addEventListener('click', () => {
            const slotNum = parseInt(slot.dataset.slot);
            createNewGame(slotNum);
        });
    });
    
     
    document.querySelectorAll('.save-slot.filled').forEach(slot => {
        slot.addEventListener('click', (e) => {
            if (e.target.classList.contains('save-delete-button')) return;
            const slotNum = parseInt(slot.dataset.slot);
            loadSaveSlot(slotNum);
        });
    });
    
     
    document.querySelectorAll('.save-delete-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const slot = parseInt(btn.dataset.slot);
            deleteSaveSlot(slot);
        });
    });
    
     
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsMenu.show();
        });
    }
    
     
    const creditsBtn = document.getElementById('creditsBtn');
    if (creditsBtn) {
        creditsBtn.addEventListener('click', showCredits);
    }
}

function loadSaveSlot(slot) {
    const saveKey = `starForgeGame_slot${slot}`;
    const saved = localStorage.getItem(saveKey);
    
    localStorage.setItem('currentSlot', slot.toString());
    
    if (saved) {
        loadGame();
    } else {
        resetGameState();
    }
    
    startGame();
}

function createNewGame(slot) {
    resetGameState();
    localStorage.setItem('currentSlot', slot.toString());
    startGame();
}

export function deleteSaveSlot(slot) {
    if (confirm(`Delete save slot ${slot}? This cannot be undone!`)) {
        const saveKey = `starForgeGame_slot${slot}`;
        localStorage.removeItem(saveKey);
        showMainMenu();
    }
}

function resetGameState() {
    game.stardust = 0;
    game.totalStardust = 0;
    game.cosmicEnergy = 0;
    game.totalCosmicEnergy = 0;
    game.celestialShards = 0;
    game.celestialShardsTotal = 0;
    game.nebulaCores = 0;
    game.prestigeCount = 0;
    game.prestigeMultiplier = 1;
    
    for (let key in game.buildings) {
        game.buildings[key].count = 0;
    }
    for (let key in game.upgrades) {
        game.upgrades[key].purchased = false;
    }
    for (let key in game.achievements) {
        game.achievements[key].unlocked = false;
    }
}

function startGame() {
    render();
    document.body.classList.add('in-game');
}

function showSettings() {
    alert('Settings coming soon!');
}

function showCredits() {
    alert('Star Forge - An Idle Game\nCreated solo');
}