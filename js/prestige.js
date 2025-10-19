import { game } from './game-state.js';
import { CONFIG } from './config.js';
import { calculateProduction, calculateClickPower } from './calculations.js';
import { checkAchievements, getAchievementPrestigeBonus } from './achievements.js';
import { showNotification, render } from './ui.js';

 
export function canMiniPrestige() {
    return game.totalStardust >= CONFIG.MINI_PRESTIGE_THRESHOLD;
}

export function calculateMiniPrestigeGain() {
    if (!canMiniPrestige()) return 0;
    return Math.floor(Math.sqrt(game.totalStardust / CONFIG.MINI_PRESTIGE_THRESHOLD) * 5);
}

function createMiniPrestigeAnimation(gainAmount, newMultiplier) {
    const overlay = document.createElement('div');
    overlay.className = 'mini-prestige-animation-overlay';
    document.body.appendChild(overlay);

    const fade = document.createElement('div');
    fade.className = 'mini-prestige-fade';
    overlay.appendChild(fade);

    const glow = document.createElement('div');
    glow.className = 'mini-prestige-glow';
    overlay.appendChild(glow);

     
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'mini-prestige-particle';
            
            const angle = (Math.PI * 2 * i) / 40;
            const distance = 150 + Math.random() * 200;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            
            overlay.appendChild(particle);
        }, i * 25);
    }

    setTimeout(() => {
        const text = document.createElement('div');
        text.className = 'mini-prestige-text';
        text.innerHTML = `
            <h1>✨ Stellar Rebirth ✨</h1>
            <div class="gain">+${gainAmount} Stellar Fragments</div>
            <div class="multiplier">×${newMultiplier.toFixed(2)} multiplier</div>
        `;
        overlay.appendChild(text);
    }, 100);

    setTimeout(() => {
        overlay.remove();
    }, 3000);
}

export function miniPrestige() {
    if (!canMiniPrestige()) return;
    
    const settings = JSON.parse(localStorage.getItem('starForgeSettings') || '{}');
    if (settings.confirmPrestige !== false) {
        if (!confirm('Perform Stellar Rebirth? This will reset buildings and stardust but keep upgrades.')) {
            return;
        }
    }
    
    const gain = calculateMiniPrestigeGain();
    const newMulti = 1 + ((game.stellarFragments + gain) * CONFIG.MINI_PRESTIGE_MULTIPLIER_BASE);
    
    
    const animations = settings.animations !== false;
    const timeout = animations ? 2500 : 0
    
    if (animations) {
      createMiniPrestigeAnimation(gain, newMulti);
    }
    
    setTimeout(() => {
        game.stellarFragments += gain;
        game.totalStellarFragments += gain;
        game.miniPrestigeCount++;
        game.stellarFragmentMultiplier = newMulti;

        game.stardust = 0;
        game.totalStardust = 0;

        for (let key in game.buildings) {
            if (game.buildings[key].costType !== 'stellarFragments') {
                game.buildings[key].count = 0;
            }
        }

        calculateProduction();
        calculateClickPower();
        checkAchievements();
        showNotification(`Stellar Rebirth! Gained ${gain} Stellar Fragments`);
        render();
    }, timeout);
}

 
export function canPrestige() {
    return game.totalStardust >= CONFIG.PRESTIGE_THRESHOLD;
}

export function calculatePrestigeGain() {
    if (!canPrestige()) return 0;
    let base = Math.floor(Math.sqrt(game.totalStardust / CONFIG.PRESTIGE_THRESHOLD));
    
    if (game.upgrades.prestigeEfficiency?.purchased) {
        base = Math.floor(base * 1.1);
    }
    
    return base;
}

function createPrestigeAnimation(gainAmount, newMultiplier) {
    const overlay = document.createElement('div');
    overlay.className = 'prestige-animation-overlay';
    document.body.appendChild(overlay);

    const fade = document.createElement('div');
    fade.className = 'prestige-fade';
    overlay.appendChild(fade);

    const glow = document.createElement('div');
    glow.className = 'prestige-glow';
    overlay.appendChild(glow);

     
    const rayCount = 12;
    for (let i = 0; i < rayCount; i++) {
        const ray = document.createElement('div');
        ray.className = 'prestige-ray';
        ray.style.setProperty('--angle', `${(360 / rayCount) * i}deg`);
        overlay.appendChild(ray);
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'prestige-particle';
            
            const angle = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5) * 0.5;
            const distance = 200 + Math.random() * 400;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.setProperty('--duration', `${2 + Math.random()}s`);
            
            overlay.appendChild(particle);
        }, i * 30);
    }

    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'prestige-sparkle';
            
            const startAngle = Math.random() * Math.PI * 2;
            const startDist = 50 + Math.random() * 100;
            const startX = Math.cos(startAngle) * startDist;
            const startY = Math.sin(startAngle) * startDist;
            
            const midAngle = startAngle + (Math.random() - 0.5) * Math.PI;
            const midDist = 150 + Math.random() * 200;
            const midX = Math.cos(midAngle) * midDist;
            const midY = Math.sin(midAngle) * midDist;
            
            const endAngle = midAngle + (Math.random() - 0.5) * Math.PI;
            const endDist = 300 + Math.random() * 300;
            const endX = Math.cos(endAngle) * endDist;
            const endY = Math.sin(endAngle) * endDist;
            
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            sparkle.style.setProperty('--start-x', `${startX}px`);
            sparkle.style.setProperty('--start-y', `${startY}px`);
            sparkle.style.setProperty('--mid-x', `${midX}px`);
            sparkle.style.setProperty('--mid-y', `${midY}px`);
            sparkle.style.setProperty('--end-x', `${endX}px`);
            sparkle.style.setProperty('--end-y', `${endY}px`);
            sparkle.style.setProperty('--duration', `${2.5 + Math.random() * 0.5}s`);
            
            overlay.appendChild(sparkle);
        }, i * 80);
    }

    setTimeout(() => {
        const text = document.createElement('div');
        text.className = 'prestige-text';
        text.innerHTML = `
            <h1>🌌 Cosmic Ascension 🌌</h1>
            <div class="gain">+${gainAmount} Cosmic Energy</div>
            <div class="multiplier">×${newMultiplier.toFixed(2)} multiplier</div>
        `;
        overlay.appendChild(text);
    }, 100);

    setTimeout(() => {
        overlay.remove();
    }, 5000);
}

export function prestige() {
    if (!canPrestige()) return;
    
    const settings = JSON.parse(localStorage.getItem('starForgeSettings') || '{}');
    if (settings.confirmPrestige !== false) {
        if (!confirm('Perform Cosmic Ascension? This will reset everything except Permanent Upgrades but give you massive boosts.')) {
            return;
        }
    }
    
    const gain = calculatePrestigeGain();
    
    const achievementBonus = getAchievementPrestigeBonus();
    const baseMultiplierPerEnergy = CONFIG.PRESTIGE_MULTIPLIER_BASE + achievementBonus;
    const newmulti = 1 + ((game.cosmicEnergy + gain) * baseMultiplierPerEnergy);
    
    
    const animations = settings.animations !== false;
    const timeout = animations ? 3500 : 0
    
    if (animations) {
      createPrestigeAnimation(gain, newmulti);
    }

    setTimeout(() => {
        game.cosmicEnergy += gain;
        game.totalCosmicEnergy += gain;
        game.prestigeCount++;
        game.prestigeMultiplier = newmulti;

         
        let retainedFragments = 0;
        if (game.upgrades.fragmentRetention?.purchased) {
            retainedFragments = Math.floor(game.stellarFragments * 0.2);
        }
        if (game.permanentUpgrades.fragmentKeeper?.level > 0) {
            const keepPercent = game.permanentUpgrades.fragmentKeeper.level * 0.1;
            retainedFragments = Math.floor(game.stellarFragments * keepPercent);
        }

        game.stardust = 0;
        game.totalStardust = 0;
        game.stellarFragments = retainedFragments;
        game.stellarFragmentMultiplier = 1 + (retainedFragments * CONFIG.MINI_PRESTIGE_MULTIPLIER_BASE);

        for (let key in game.buildings) {
            game.buildings[key].count = 0;
        }

        for (let key in game.upgrades) {
            game.upgrades[key].purchased = false;
        }

        calculateProduction();
        calculateClickPower();
        checkAchievements();
        showNotification(`Prestige! Gained ${gain} Cosmic Energy` + (retainedFragments > 0 ? ` (Kept ${retainedFragments} fragments)` : ''));
        render();
    }, timeout);
}