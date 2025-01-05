export class SnowmanInfoPanel {
    constructor() {
        this.panel = document.getElementById('snowmanInfoPanel');
        this.setupEventListeners();
        this.updateTimer = null;
    }

    setupEventListeners() {
        // Kapat butonu
        const closeBtn = this.panel.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => this.hide());

        // Detay butonu
        const detailsBtn = this.panel.querySelector('.details-btn');
        const detailsContent = this.panel.querySelector('.details-content');
        detailsBtn.addEventListener('click', () => {
            const isHidden = detailsContent.style.display === 'none' || !detailsContent.style.display;
            detailsContent.style.display = isHidden ? 'block' : 'none';
            detailsBtn.textContent = isHidden ? 'Detayları Gizle' : 'Daha Fazla Detay';
        });
    }

    show() {
        this.panel.style.display = 'block';
        this.startUpdating();
    }

    hide() {
        this.panel.style.display = 'none';
        this.stopUpdating();
    }

    startUpdating() {
        // Her 5 saniyede bir ruh halini güncelle
        this.updateTimer = setInterval(() => this.updateMood(), 5000);
        this.updateMood();
    }

    stopUpdating() {
        if (this.updateTimer) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    }

    updateMood() {
        const moods = ['Neşeli', 'Düşünceli', 'Heyecanlı', 'Uykulu', 'Enerjik'];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        this.panel.querySelector('.mood').textContent = randomMood;

        // Sıcaklığa göre erime riskini güncelle
        const now = new Date();
        const hour = now.getHours();
        let risk = 'Düşük';
        
        if (hour >= 11 && hour <= 15) {
            risk = 'Orta';
        } else if (hour >= 12 && hour <= 14) {
            risk = 'Yüksek';
        }
        
        this.panel.querySelector('.melting-risk').textContent = risk;
    }

    toggle() {
        if (this.panel.style.display === 'none' || !this.panel.style.display) {
            this.show();
        } else {
            this.hide();
        }
    }
} 