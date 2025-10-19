alert("load")
window.moduleLoaded = true;

import { game } from './game-state.js';
import { CONFIG } from './config.js';
import { calculateProduction } from './calculations.js';
import { checkAchievements } from './achievements.js';
import { saveGame, loadGame } from './save-load.js';
import { render, updateStats, updateBuildingButtons, updateCurrentTab } from './ui.js';
import { clickForge } from './ui.js';
import { showMainMenu } from './main-menu.js';
import { initAudio, audioManager } from './audio-manager.js';
import { settingsMenu } from "./settings.js"

const sett = JSON.parse(localStorage.getItem("starForgeSettings"))

console.log("Main script has loaded", sett)

settingsMenu.applySettings()

async function initGame() {
    initAudio();
    
    game.lastUpdate = Date.now();
    
    if (!localStorage.getItem('currentSlot')) {
        showMainMenu();
    } else {
        loadGame();
        render();
    }
    
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    const now = Date.now();
    const delta = (now - game.lastUpdate) / 1000;
    
    const settings = JSON.parse(localStorage.getItem('starForgeSettings') || '{}');
    const offlineEnabled = settings.offlineProgress !== false;
    
    if (delta > 5 && game.permanentUpgrades.offlineProduction.level > 0 && offlineEnabled) {
        const offlineMultiplier = 0.5;
        game.stardust += game.stardustPerSecond * delta * offlineMultiplier;
        game.totalStardust += game.stardustPerSecond * delta * offlineMultiplier;
        game.celestialShards += game.celestialShardsPerSecond * delta * offlineMultiplier;
        game.celestialShardsTotal += game.celestialShardsPerSecond * delta * offlineMultiplier;
        game.nebulaCores += game.nebulaCoresPerSecond * delta * offlineMultiplier;
    } else {
        game.stardust += game.stardustPerSecond * delta;
        game.totalStardust += game.stardustPerSecond * delta;
        game.celestialShards += game.celestialShardsPerSecond * delta;
        game.celestialShardsTotal += game.celestialShardsPerSecond * delta;
        game.nebulaCores += game.nebulaCoresPerSecond * delta;
    }
    
    calculateProduction();
    checkAchievements();

    if (!game.lastUIUpdate || now - game.lastUIUpdate >= 200) {
        updateStats();
        updateBuildingButtons();
        updateCurrentTab();
        game.lastUIUpdate = now;
    }

    game.lastUpdate = now;
    requestAnimationFrame(gameLoop);
}

setInterval(() => {
    if (game.permanentUpgrades.autoClicker.level > 0) {
        const clicksPerSecond = game.permanentUpgrades.autoClicker.level;
        for (let i = 0; i < clicksPerSecond; i++) {
            clickForge();
        }
    }
}, 1000);

setInterval(() => {
    try {
        saveGame();
    } catch (e) {
        console.error('Auto-save failed:', e);
    }
}, CONFIG.SAVE_INTERVAL);

document.body.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "SPAN" || e.target.tagName === "DIV") {
        if ([...e.target.classList].some(c => c.includes('zoom')) || 
            [...e.target.classList].some(c => c.includes('bulk-buy-menu')) || 
            [...e.target.classList].some(c => c.includes('bulk-buy-toggle')) || [...e.target.classList].some(c => c.includes('utility-btn'))) {
            return;
        }
        if (localStorage.getItem("tab") && localStorage.getItem("tab") === "upgrades") {
            return;
        }
        if (!localStorage.getItem("currentSlot")) {
            return;
        }
        render();
    }
});

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('tab')) {
        const audio = document.getElementById('click-sound');
        if (audio) {
            audio.currentTime = 0;
            audio.playbackRate = 2;
            audio.play().catch(() => {});
        }
    }
});

window.returnToMenu = () => {
    if (confirm('Return to main menu? Make sure your game is saved!')) {
        saveGame();
        document.body.classList.remove('in-game');
        localStorage.removeItem("currentSlot");
        window.location.reload();
    }
};
window.buyPermanentUpgrade = (key) => import('./permanent-upgrades.js').then(m => m.buyPermanentUpgrade(key));
window.clickForge = () => import('./ui.js').then(m => m.clickForge());
window.buyBuilding = (key) => import('./buildings.js').then(m => m.buyBuilding(key));
window.buyUpgrade = (key) => import('./upgrades.js').then(m => m.buyUpgrade(key));
window.prestige = () => import('./prestige.js').then(m => m.prestige());
window.switchTab = (tab) => import('./ui.js').then(m => m.switchTab(tab));
window.saveGame = () => import('./save-load.js').then(m => m.saveGame());
window.loadGame = () => import('./save-load.js').then(m => m.loadGame());
window.exportGame = () => import('./save-load.js').then(m => m.exportGame());
window.importGame = () => import('./save-load.js').then(m => m.importGame());
window.resetGame = () => import('./save-load.js').then(m => m.resetGame());

initGame();
