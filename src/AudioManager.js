export class AudioManager {
    constructor() {
        this.audio = document.getElementById('christmasSong');
    }

    play() {
        if (this.audio.paused) {
            this.audio.play();
        } else {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }
} 