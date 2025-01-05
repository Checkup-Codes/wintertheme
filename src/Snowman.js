import * as THREE from 'three';
import { SnowmanInfoPanel } from './SnowmanInfoPanel';

export class Snowman {
    constructor() {
        this.group = new THREE.Group();
        this.nose = null;
        this.body = null;
        this.infoPanel = new SnowmanInfoPanel();
    }

    create() {
        this.createBody();
        this.createNose();
        this.createEyes();
        this.createMouth();
        this.createButtons();
        
        this.group.position.set(-2, 0, 0);
        return this.group;
    }

    createBody() {
        const radiuses = [1, 0.7, 0.4];
        const segments = 32;
        
        // En alt küre (gövde)
        const geometry = new THREE.SphereGeometry(radiuses[0], segments, segments);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            shininess: 30
        });
        this.body = new THREE.Mesh(geometry, material);
        this.body.position.y = radiuses[0];
        this.body.castShadow = true;
        this.body.receiveShadow = true;
        this.group.add(this.body);

        // Diğer küreler
        for(let i = 1; i < 3; i++) {
            const sphereGeometry = new THREE.SphereGeometry(radiuses[i], segments, segments);
            const sphere = new THREE.Mesh(sphereGeometry, material.clone());
            sphere.position.y = i * (radiuses[i] + radiuses[Math.max(0, i-1)]) + radiuses[0];
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            this.group.add(sphere);
        }
    }

    createNose() {
        const noseGeometry = new THREE.ConeGeometry(0.08, 0.4, 32);
        const noseMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff6f00,
            shininess: 50,
            emissive: 0xff6f00,
            emissiveIntensity: 0.2
        });
        this.nose = new THREE.Mesh(noseGeometry, noseMaterial);
        this.nose.position.set(0, 2.6, 0.8);
        this.nose.rotation.x = Math.PI / 2;
        
        this.nose.userData.defaultEmissiveIntensity = 0.2;
        this.nose.userData.hoverEmissiveIntensity = 0.5;
        
        this.group.add(this.nose);
    }

    createEyes() {
        for(let i = -1; i <= 1; i += 2) {
            const oliveGeometry = new THREE.SphereGeometry(0.08, 16, 16);
            const oliveMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x1a1a1a,
                shininess: 80
            });
            const olive = new THREE.Mesh(oliveGeometry, oliveMaterial);
            olive.scale.y = 0.5;
            olive.position.set(i * 0.45, 2.75, 0.55);
            olive.rotation.x = Math.PI / 6;
            this.group.add(olive);
        }
    }

    createMouth() {
        const mouthRadius = 0.2;
        for(let i = 0; i < 5; i++) {
            const angle = (Math.PI / 4) * (i - 2);
            const smallOliveGeometry = new THREE.SphereGeometry(0.06, 16, 16);
            const smallOliveMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x1a1a1a,
                shininess: 80
            });
            const smallOlive = new THREE.Mesh(smallOliveGeometry, smallOliveMaterial);
            smallOlive.scale.y = 0.5;
            smallOlive.position.set(
                Math.sin(angle) * mouthRadius,
                2.3 + Math.cos(angle) * 0.1,
                0.65
            );
            smallOlive.rotation.x = Math.PI / 6;
            this.group.add(smallOlive);
        }
    }

    createButtons() {
        for(let i = 0; i < 3; i++) {
            const buttonGeometry = new THREE.SphereGeometry(0.05, 16, 16);
            const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
            const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
            button.position.set(0, 0.8 + i * 0.3, 1.0);
            this.group.add(button);
        }
    }

    getNose() {
        return this.nose;
    }

    getBody() {
        return this.body;
    }

    handleBodyClick() {
        this.infoPanel.toggle();
    }
} 