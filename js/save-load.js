import { game } from './game-state.js';
import { calculateProduction, calculateClickPower } from './calculations.js';
import { showNotification } from './ui.js';
import { deleteSaveSlot } from './main-menu.js';

function compressSave(data) {
    try {
        return btoa(JSON.stringify(data));
    } catch (e) {
        console.error('Compression failed:', e);
        return '';
    }
}

function decompressSave(compressed) {
    try {
        return JSON.parse(atob(compressed));
    } catch (e) {
        console.error('Decompression failed:', e);
        return null;
    }
}

function generateChecksum(data) {
    try {
        const str = JSON.stringify(data);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    } catch (e) {
        console.error('Checksum generation failed:', e);
        return '';
    }
}

export function saveGame() {
    const saveData = {
        version: '1.0.0',
        timestamp: Date.now(),
        data: {
            stardust: game.stardust || 0,
            totalStardust: game.totalStardust || 0,
            cosmicEnergy: game.cosmicEnergy || 0,
            totalCosmicEnergy: game.totalCosmicEnergy || 0,
            celestialShards: game.celestialShards || 0,
            celestialShardsTotal: game.celestialShardsTotal || 0,
            nebulaCores: game.nebulaCores || 0,
            buildings: game.buildings,
            upgrades: game.upgrades,
            achievements: game.achievements,
            prestigeCount: game.prestigeCount || 0,
            prestigeMultiplier: game.prestigeMultiplier || 1,
            permanentUpgrades: game.permanentUpgrades
        }
    };

    saveData.checksum = generateChecksum(saveData.data);

    const compressed = compressSave(saveData);
    if (!compressed) return showNotification('Save failed');

    
    const currentSlot = localStorage.getItem('currentSlot');
    if (currentSlot) {
        const saveKey = `starForgeGame_slot${currentSlot}`;
        localStorage.setItem(saveKey, compressed);
        localStorage.setItem('starForgeBackup', compressed);
    }
    showNotification('Game Saved');
    return compressed;
}

export function loadGame() {
    const currentSlot = localStorage.getItem('currentSlot');
    if (!currentSlot) return false;
    
    const saveKey = `starForgeGame_slot${currentSlot}`;
    const saved = localStorage.getItem(saveKey) || localStorage.getItem('starForgeBackup');
    
    if (!saved) return false;

    const saveData = decompressSave(saved);
    if (!saveData) return false;

    if (generateChecksum(saveData.data) !== saveData.checksum) {
        console.warn('Checksum mismatch, attempting backup...');
        const backup = localStorage.getItem('starForgeBackup');
        if (backup) {
            const backupData = decompressSave(backup);
            if (backupData) {
                applySaveData(backupData.data);
                showNotification('Loaded from backup');
                return true;
            }
        }
        showNotification('Save corrupted');
        return false;
    }

    applySaveData(saveData.data);
    showNotification('Game Loaded Successfully');
    return true;
}

function applySaveData(data) {
    game.stardust = data.stardust || 0;
    game.totalStardust = data.totalStardust || 0;
    game.cosmicEnergy = data.cosmicEnergy || 0;
    game.totalCosmicEnergy = data.totalCosmicEnergy || 0;
    game.celestialShards = data.celestialShards || 0;
    game.celestialShardsTotal = data.celestialShardsTotal || 0;
    game.nebulaCores = data.nebulaCores || 0;
    game.permanentUpgrades = game.permanentUpgrades;


    for (let key in game.buildings) {
        game.buildings[key].count = data.buildings?.[key]?.count || 0;
    }
    for (let key in game.upgrades) {
        game.upgrades[key].purchased = data.upgrades?.[key]?.purchased || false;
    }
    for (let key in game.achievements) {
        game.achievements[key].unlocked = data.achievements?.[key]?.unlocked || false;
    }
    if (data.permanentUpgrades) {
        for (let key in game.permanentUpgrades) {
            game.permanentUpgrades[key].level = data.permanentUpgrades?.[key]?.level || 0;
        }
    }


    game.prestigeCount = data.prestigeCount || 0;
    game.prestigeMultiplier = data.prestigeMultiplier || 1;
    game.lastUpdate = Date.now();
    
    calculateProduction();
    calculateClickPower();
}

export function exportGame() {
  const currentSlot = localStorage.getItem('currentSlot');
    if (!currentSlot) {
      return alert("No slot")
    }
    const save = localStorage.getItem(`starForgeGame_slot${currentSlot}`);
    if (!save) return alert('No save found');

    const modal = document.createElement('div');
    modal.className = 'modal-export';
    modal.innerHTML = `
        <div style="position:fixed;top:20%;left:50%;transform:translateX(-50%);
                    background:#111;padding:20px;border:1px solid #666;z-index:1000;">
            <textarea style="width:400px;height:150px;">${save}</textarea>
            <br>
            <button id="closeExport">Close</button>
        </div>`;
    document.body.appendChild(modal);

    document.getElementById('closeExport').onclick = () => modal.remove();
}

export function importGame() {
  const currentSlot = localStorage.getItem('currentSlot');
    if (!currentSlot) {
      return alert("No slot")
    }
    const modal = document.createElement('div');
    modal.className = 'modal-import';
    modal.innerHTML = `
        <div style="position:fixed;top:20%;left:50%;transform:translateX(-50%);
                    background:#111;padding:20px;border:1px solid #666;z-index:1000;">
            <h2>Enter Save Code</h2>
            <textarea id="importCodeArea" style="width:400px;height:150px;"></textarea>
            <br>
            <button id="importSaveBtn">Import</button>
            <button id="closeImport">Close</button>
        </div>`;
    document.body.appendChild(modal);

    document.getElementById('importSaveBtn').onclick = () => {
        const code = document.getElementById('importCodeArea').value.trim();
        const saveData = decompressSave(code);
        console.log()
        if (!saveData) return alert('Invalid save code');

        applySaveData(saveData.data || saveData);
        localStorage.setItem(`starForgeGame_slot${currentSlot}`, code);
        showNotification('Game Imported Successfully');
        modal.remove();
    };

    document.getElementById('closeImport').onclick = () => modal.remove();
}

export function resetGame() {
  const settings = JSON.parse(localStorage.getItem("starForgeSettings"))
    if (settings.confirmReset !== false) {
        if (!confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            return;
        }
        if (!confirm('Really delete everything? Last chance!')) {
            return;
        }
    }
    applySaveData({});
    deleteSaveSlot(localStorage.getItem("currentSlot"))
    localStorage.removeItem("currentSlot")
    saveGame();
    window.location.reload()
}