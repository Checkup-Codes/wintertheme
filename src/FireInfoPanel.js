export class FireInfoPanel {
    constructor() {
        this.panel = document.getElementById('fireInfoPanel');
        this.startTime = new Date();
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
        // Her saniye güncelle
        this.updateTimer = setInterval(() => this.updateInfo(), 1000);
        this.updateInfo(); // İlk güncelleme
    }

    stopUpdating() {
        if (this.updateTimer) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    }

    updateInfo() {
        // Sıcaklık güncelleme (rastgele dalgalanma)
        const baseTemp = 742;
        const tempVariation = Math.sin(Date.now() * 0.001) * 15;
        const currentTemp = Math.round(baseTemp + tempVariation);
        this.panel.querySelector('.temperature').textContent = `${currentTemp}°C`;

        // Yanma süresi güncelleme
        const now = new Date();
        const burnTime = Math.floor((now - this.startTime) / 1000 / 60); // dakika
        this.panel.querySelector('.burn-duration').textContent = `${burnTime} dakika`;

        // Başlangıç zamanı
        const timeStr = this.startTime.toLocaleTimeString('tr-TR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        this.panel.querySelector('.start-time').textContent = timeStr;

        // Kalan süre güncelleme (2 saatten geri sayım)
        const totalMinutes = 120;
        const remainingMinutes = totalMinutes - burnTime;
        const remainingHours = Math.floor(remainingMinutes / 60);
        const remainingMins = remainingMinutes % 60;
        
        let remainingText = '';
        if (remainingMinutes <= 0) {
            remainingText = 'Odun bitmek üzere';
        } else {
            if (remainingHours > 0) {
                remainingText += `${remainingHours} saat `;
            }
            if (remainingMins > 0 || remainingHours === 0) {
                remainingText += `${remainingMins} dakika`;
            }
        }
        
        this.panel.querySelector('.remaining-time').textContent = remainingText;
    }

    toggle() {
        if (this.panel.style.display === 'none' || !this.panel.style.display) {
            this.show();
        } else {
            this.hide();
        }
    }
} 