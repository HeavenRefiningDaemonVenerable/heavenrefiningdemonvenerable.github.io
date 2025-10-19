export class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.music = null;
        this.isMuted = false;
        this.musicVolume = 0.3;
        this.sfxVolume = 0.5;
        this.awaitingGesture = false;  
    }

    loadSound(name, url) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = url;
            
            audio.addEventListener('canplaythrough', () => {
                this.sounds.set(name, audio);
                resolve(audio);
            });
            
            audio.addEventListener('error', (e) => {
                console.warn(`Failed to load sound: ${name}`, e);
                reject(e);
            });
        });
    }

    loadMusic(url) {
        return new Promise((resolve, reject) => {
            this.music = new Audio();
            this.music.preload = 'auto';
            this.music.src = url;
            this.music.loop = true;
            this.music.volume = this.musicVolume;
    
            this.music.addEventListener('canplaythrough', () => resolve(this.music));
            this.music.addEventListener('error', (e) => {
                console.warn('Failed to load music', e);

                 
                if (e.message && e.message.toLowerCase().includes('gesture')) {
                    this.awaitingGesture = true;
                    window.addEventListener('click', () => {
                        this.awaitingGesture = false;
                        this.playMusic();
                    }, { once: true });
                }

                reject(e);
            });

            console.log(url);
        });
    }

    playSound(name, volume = this.sfxVolume) {
        if (this.isMuted || !this.sounds.has(name)) return;
        
        const sound = this.sounds.get(name);
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play().catch(e => {
            console.warn(`Couldn't play sound: ${name}`, e);
            
             
            if (e.message && e.message.toLowerCase().includes('gesture')) {
                if (!this.awaitingGesture) {
                    this.awaitingGesture = true;
                    window.addEventListener('click', () => {
                        this.awaitingGesture = false;
                        this.playSound(name, volume);
                    }, { once: true });
                }
            }
        });
    }

    playRandomSound(namePrefix, count, volume = this.sfxVolume) {
        const randomIndex = Math.floor(Math.random() * count) + 1;
        this.playSound(`${namePrefix}${randomIndex}`, volume);
    }

    playMusic() {
        if (this.isMuted || !this.music) return;
        this.music.play().catch(e => {
            console.warn('Could not play music', e);
            
             
            if (e.message && e.message.toLowerCase().includes('gesture')) {
                if (!this.awaitingGesture) {
                    this.awaitingGesture = true;
                    window.addEventListener('click', () => {
                        this.awaitingGesture = false;
                        this.playMusic();
                    }, { once: true });
                }
            }
        });
    }

    stopMusic() {
        if (this.music) {
            this.music.pause();
            this.music.currentTime = 0;
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopMusic();
        } else {
            this.playMusic();
        }
        return this.isMuted;
    }

    setMusicVolume(volume) {
        this.musicVolume = volume;
        if (this.music) this.music.volume = volume;
    }

    setSfxVolume(volume) {
        this.sfxVolume = volume;
    }
}

export const audioManager = new AudioManager();

export async function initAudio() {
    try {
        await audioManager.loadSound('click1', '/sounds/click1.wav');
        await audioManager.loadSound('click2', '/sounds/click2.wav');
        await audioManager.loadSound('achievement', '/sounds/achievement.wav');
        await audioManager.loadMusic('/sounds/background-music.mp3');
        audioManager.playMusic();
        console.log('Audio loaded successfully!');
    } catch (error) {
        console.warn('Some audio failed to load, continuing without it:', error);
    }
}