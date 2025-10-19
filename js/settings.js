import { audioManager } from './audio-manager.js';
import { CONFIG } from './config.js';

export class SettingsMenu {
    constructor() {
        this.settings = this.loadSettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('starForgeSettings');
        return saved ? JSON.parse(saved) : {
            // Audio
            masterVolume: 80,
            musicVolume: 60,
            soundEnabled: true,
            // Gameplay
            numberFormat: 'standard',
            autoSaveInterval: 300,
            offlineProgress: true,
            confirmPrestige: true,
            confirmReset: true,
            // Interface
            animations: true,
            compactMode: false,
            showFPS: false,
            
            // Visual
            particleEffects: true,
            screenShake: true,
            highlightAffordable: true,
            // Advanced
            debugMode: false,
            exportBackups: true,
            autoLoadBackup: true
        };
    }

    saveSettings() {
        localStorage.setItem('starForgeSettings', JSON.stringify(this.settings));
        this.applySettings();
    }

    applySettings() {
        // Apply audio settings
        if (audioManager) {
            audioManager.setSfxVolume(this.settings.masterVolume / 100);
            audioManager.setMusicVolume(this.settings.musicVolume / 100);
            if (!this.settings.soundEnabled) {
                audioManager.toggleMute();
            }
        }

        // Apply to game config
        CONFIG.SAVE_INTERVAL = this.settings.autoSaveInterval * 1000;
        
        if (this.settings.showFPS) {
            this.enableFPSCounter();
        } else {
            this.disableFPSCounter();
        }
      
      // Apply animations
        if (!this.settings.animations) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }
        
        // Apply compact mode
        if (this.settings.compactMode) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }
        
        // Apply FPS counter
        if (this.settings.showFPS) {
            this.enableFPSCounter();
        } else {
            this.disableFPSCounter();
        }
        
        // Apply particle effects
        if (!this.settings.particleEffects) {
            document.body.classList.add('no-particles');
        } else {
            document.body.classList.remove('no-particles');
        }
        
        // Apply screen shake setting
        if (!this.settings.screenShake) {
            document.body.classList.add('no-shake');
        } else {
            document.body.classList.remove('no-shake');
        }
        
        // Apply affordable highlighting
        if (!this.settings.highlightAffordable) {
            document.body.classList.add('no-highlight');
        } else {
            document.body.classList.remove('no-highlight');
        }
        
        // Store debug mode state
        window.DEBUG_MODE = this.settings.debugMode
   }
    
    enableFPSCounter() {
        if (document.getElementById('fps-counter')) return;
        
        const fpsCounter = document.createElement('div');
        fpsCounter.id = 'fps-counter';
        fpsCounter.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: #68d391;
            padding: 5px 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(fpsCounter);
        
        let lastTime = performance.now();
        let frames = 0;
        
        const updateFPS = () => {
            frames++;
            const now = performance.now();
            if (now >= lastTime + 1000) {
                fpsCounter.textContent = `FPS: ${frames}`;
                frames = 0;
                lastTime = now;
            }
            if (this.settings.showFPS) {
                requestAnimationFrame(updateFPS);
            }
        };
        
        requestAnimationFrame(updateFPS);
    }
    
    disableFPSCounter() {
        const counter = document.getElementById('fps-counter');
        if (counter) counter.remove();
    }

    render() {
        return `
            <div class="settings-modal-overlay" data-action="closeSettings">
                <div class="settings-modal" onclick="event.stopPropagation()">
                    <div class="settings-header">
                        <h2 class="settings-title">⚙️ Game Settings</h2>
                        <button class="settings-close" data-action="closeSettings">×</button>
                    </div>
                    
                    <div class="settings-content">
                        <!-- AUDIO SECTION -->
                        <div class="settings-section">
                            <h3 class="section-title">🔊 Audio</h3>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Master Volume</div>
                                    <div class="setting-value">${this.settings.masterVolume}%</div>
                                </div>
                                <input type="range" class="volume-slider" data-setting="masterVolume" 
                                       min="0" max="100" value="${this.settings.masterVolume}">
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Music Volume</div>
                                    <div class="setting-value">${this.settings.musicVolume}%</div>
                                </div>
                                <input type="range" class="volume-slider" data-setting="musicVolume" 
                                       min="0" max="100" value="${this.settings.musicVolume}">
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Enable Sound Effects</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="soundEnabled" ${this.settings.soundEnabled ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <!-- GAMEPLAY SECTION -->
                        <div class="settings-section">
                            <h3 class="section-title">🎮 Gameplay</h3>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Number Format</div>
                                </div>
                                <select class="setting-select" data-setting="numberFormat">
                                    <option value="standard" ${this.settings.numberFormat === 'standard' ? 'selected' : ''}>Standard (1.5K)</option>
                                    <option value="scientific" ${this.settings.numberFormat === 'scientific' ? 'selected' : ''}>Scientific (1.5e3)</option>
                                    <option value="full" ${this.settings.numberFormat === 'full' ? 'selected' : ''}>Full (1,500)</option>
                                    <option value="engineering" ${this.settings.numberFormat === 'engineering' ? 'selected' : ''}>Engineering (1.5K)</option>
                                </select>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Auto-save Interval</div>
                                </div>
                                <select class="setting-select" data-setting="autoSaveInterval">

                                    <option value="30" ${this.settings.autoSaveInterval === 30 ? 'selected' : ''}>30 seconds</option>
                                    <option value="60" ${this.settings.autoSaveInterval === 60 ? 'selected' : ''}>1 minute</option>
                                    <option value="300" ${this.settings.autoSaveInterval === 300 ? 'selected' : ''}>5 minutes</option>
                                    <option value="600" ${this.settings.autoSaveInterval === 600 ? 'selected' : ''}>10 minutes</option>
                                </select>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Offline Progress</div>
                                    <div class="setting-desc">Earn resources while away</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="offlineProgress" ${this.settings.offlineProgress ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Confirm Prestige</div>
                                    <div class="setting-desc">Show warning before reset</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="confirmPrestige" ${this.settings.confirmPrestige ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Confirm Reset</div>
                                    <div class="setting-desc">Show warning before hard reset</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="confirmReset" ${this.settings.confirmReset ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <!-- INTERFACE SECTION -->
                        <div class="settings-section">
                            <h3 class="section-title">💻 Interface</h3>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Animations</div>
                                    <div class="setting-desc">Visual effects and transitions</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="animations" ${this.settings.animations ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Compact Mode</div>
                                    <div class="setting-desc">Denser UI layout</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="compactMode" ${this.settings.compactMode ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Show FPS Counter</div>
                                    <div class="setting-desc">Display frames per second</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="showFPS" ${this.settings.showFPS ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        <!-- VISUAL EFFECTS SECTION -->
                        <div class="settings-section">
                            <h3 class="section-title">✨ Visual Effects</h3>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Particle Effects</div>
                                    <div class="setting-desc">Floating stars and particles</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="particleEffects" ${this.settings.particleEffects ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Screen Shake</div>
                                    <div class="setting-desc">Shake on big events</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="screenShake" ${this.settings.screenShake ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Highlight Affordable</div>
                                    <div class="setting-desc">Glow items you can buy</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="highlightAffordable" ${this.settings.highlightAffordable ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                        <br>
                        <!-- ADVANCED SECTION -->
                    </div>
                    
                    <div class="settings-actions">
                        <button class="settings-button primary" data-action="applySettings">💾 Apply Settings</button>
                        <button class="settings-button" data-action="resetSettings">🔄 Reset to Defaults</button>
                        <button class="settings-button secondary" data-action="closeSettings">✕ Close</button>
                    </div>
                </div>
            </div>
        `;
    }

    handleAction(action, value = null) {
        switch(action) {
            case 'updateSetting':
                this.settings[value.setting] = value.value;
                this.updateSliderValue(value.setting, value.value);
                break;
            case 'applySettings':
                this.saveSettings();
                this.close();
                break;
            case 'resetSettings':
                if (confirm('Reset all settings to defaults?')) {
                    localStorage.removeItem('starForgeSettings');
                    this.settings = this.loadSettings();
                    this.saveSettings();
                    this.close();
                }
                break;
            case 'closeSettings':
                this.close();
                break;
        }
    }

    updateSliderValue(setting, value) {
        const valueElement = document.querySelector(`[data-setting="${setting}"]`).closest('.setting-item').querySelector('.setting-value');
        if (valueElement) {
            valueElement.textContent = `${value}%`;
        }
    }

    show() {
        document.body.insertAdjacentHTML('beforeend', this.render());
        this.attachEventListeners();
    }

    close() {
        const overlay = document.querySelector('.settings-modal-overlay');
        if (overlay) overlay.remove();
    }

    attachEventListeners() {
        const overlay = document.querySelector('.settings-modal-overlay');
        if (!overlay) return;

        // Sliders
        overlay.querySelectorAll('input[type="range"]').forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.handleAction('updateSetting', {
                    setting: e.target.dataset.setting,
                    value: parseInt(e.target.value)
                });
            });
        });

        // Checkboxes
        overlay.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.settings[e.target.dataset.setting] = e.target.checked;
            });
        });

        // Selects
        overlay.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.settings[e.target.dataset.setting] = e.target.value;
            });
        });

        // Buttons
        overlay.querySelectorAll('[data-action]').forEach(button => {
          button.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation(); // Add this to prevent event bubbling
              this.handleAction(button.dataset.action);
          });
      });
    }
}

export const settingsMenu = new SettingsMenu();

/** If youre seeing this then dont judge me, I was too lazy to implement these settings, they will be added in the future though.                 <div class="settings-section">
                            <h3 class="section-title">🔧 Advanced</h3>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Debug Mode</div>
                                    <div class="setting-desc">Show console logs</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="debugMode" ${this.settings.debugMode ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Auto Export Backups</div>
                                    <div class="setting-desc">Save backup on prestige</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="exportBackups" ${this.settings.exportBackups ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            
                            <div class="setting-item">
                                <div class="setting-info">
                                    <div class="setting-label">Auto Load Backup</div>
                                    <div class="setting-desc">Load backup if save corrupt</div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" data-setting="autoLoadBackup" ${this.settings.autoLoadBackup ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
**/