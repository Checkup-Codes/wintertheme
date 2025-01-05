import * as THREE from 'three';

export class SantaSleigh {
    constructor() {
        this.group = new THREE.Group();
    }

    create() {
        this.createSleigh();
        this.createSanta();
        this.createReindeers();
        
        // Kardan adamın arkasında konumlandır
        this.group.position.set(-4, 0.5, -8);
        this.group.rotation.y = Math.PI / 4; // 45 derece döndür
        return this.group;
    }

    createSleigh() {
        // Kızağın ana gövdesi
        const bodyGeometry = new THREE.BoxGeometry(1.5, 0.4, 2);
        const bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x8b4513,
            shininess: 30
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        this.group.add(body);

        // Kızağın kavisli tabanı
        const runnerGeometry = new THREE.TorusGeometry(0.2, 0.05, 16, 32, Math.PI);
        const runnerMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
        
        // İki kızak tabanı ekle
        for(let i = -1; i <= 1; i += 2) {
            const runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
            runner.position.set(i * 0.6, -0.2, 0);
            runner.rotation.y = Math.PI / 2;
            runner.castShadow = true;
            this.group.add(runner);
        }
    }

    createSanta() {
        // Noel Baba'nın vücudu
        const bodyGeometry = new THREE.CapsuleGeometry(0.3, 0.5, 4, 8);
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 0.8, 0);
        body.castShadow = true;

        // Noel Baba'nın başı
        const headGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 1.3, 0);
        head.castShadow = true;

        // Noel Baba'nın şapkası
        const hatGeometry = new THREE.ConeGeometry(0.2, 0.4, 16);
        const hatMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const hat = new THREE.Mesh(hatGeometry, hatMaterial);
        hat.position.set(0, 1.6, 0);
        hat.castShadow = true;

        // Şapka ponponu
        const pompomGeometry = new THREE.SphereGeometry(0.08, 8, 8);
        const pompomMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const pompom = new THREE.Mesh(pompomGeometry, pompomMaterial);
        pompom.position.set(0, 1.8, 0);
        pompom.castShadow = true;

        this.group.add(body, head, hat, pompom);
    }

    createReindeers() {
        const reindeerGroup = new THREE.Group();
        
        // 5 geyik oluştur
        for(let i = 0; i < 5; i++) {
            const reindeer = this.createReindeer();
            
            // Geyikleri V şeklinde dizilim
            const offset = i * 0.8;
            const zOffset = Math.abs(i - 2) * 0.4;
            reindeer.position.set(-2 - offset, 0, -1 + zOffset);
            
            reindeerGroup.add(reindeer);
        }

        this.group.add(reindeerGroup);
    }

    createReindeer() {
        const reindeer = new THREE.Group();

        // Geyik vücudu
        const bodyGeometry = new THREE.CapsuleGeometry(0.2, 0.4, 4, 8);
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotation.x = Math.PI / 2;
        body.castShadow = true;

        // Geyik başı
        const headGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const headMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0.4, 0.2, 0);
        head.castShadow = true;

        // Boynuzlar
        const antlerGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
        const antlerMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
        
        // Sol boynuz
        const leftAntler = new THREE.Mesh(antlerGeometry, antlerMaterial);
        leftAntler.position.set(0.4, 0.4, 0.1);
        leftAntler.rotation.z = -Math.PI / 4;
        leftAntler.castShadow = true;

        // Sağ boynuz
        const rightAntler = new THREE.Mesh(antlerGeometry, antlerMaterial);
        rightAntler.position.set(0.4, 0.4, -0.1);
        rightAntler.rotation.z = -Math.PI / 4;
        rightAntler.castShadow = true;

        // Bacaklar
        const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
        const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
        
        const legs = [];
        const legPositions = [
            [-0.2, -0.2, 0.15],
            [-0.2, -0.2, -0.15],
            [0.2, -0.2, 0.15],
            [0.2, -0.2, -0.15]
        ];

        for(const pos of legPositions) {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(...pos);
            leg.castShadow = true;
            legs.push(leg);
        }

        reindeer.add(body, head, leftAntler, rightAntler, ...legs);
        return reindeer;
    }
} 