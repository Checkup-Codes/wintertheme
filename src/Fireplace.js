import * as THREE from 'three';
import { FireInfoPanel } from './FireInfoPanel';

export class Fireplace {
    constructor() {
        this.group = new THREE.Group();
        this.fire = null;
        this.fireInfoPanel = new FireInfoPanel();
    }

    create() {
        this.createBase();
        this.createLogs();
        this.createFire();
        this.createChestnuts();
        
        this.group.position.set(2, 0, 0);
        return this.group;
    }

    createBase() {
        const baseGeometry = new THREE.BoxGeometry(2, 0.2, 2);
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x4a4a4a });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = 0.1;
        base.castShadow = true;
        base.receiveShadow = true;
        this.group.add(base);
    }

    createLogs() {
        for(let i = 0; i < 3; i++) {
            const logGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
            const logMaterial = new THREE.MeshPhongMaterial({ color: 0x4d2926 });
            const log = new THREE.Mesh(logGeometry, logMaterial);
            log.position.set(0, 0.2 + i * 0.15, 0);
            log.rotation.z = i * Math.PI / 4;
            log.castShadow = true;
            this.group.add(log);
        }
    }

    createFire() {
        const fireGeometry = new THREE.ConeGeometry(0.3, 0.8, 32);
        const fireMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff4500,
            emissive: 0xff4500,
            emissiveIntensity: 1
        });
        this.fire = new THREE.Mesh(fireGeometry, fireMaterial);
        this.fire.position.y = 0.6;
        this.group.add(this.fire);
    }

    createChestnuts() {
        for(let i = 0; i < 5; i++) {
            const chestnutGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const chestnutMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x3e2723,
                shininess: 50
            });
            const chestnut = new THREE.Mesh(chestnutGeometry, chestnutMaterial);
            const angle = (i / 5) * Math.PI * 2;
            chestnut.position.set(
                Math.cos(angle) * 0.4,
                0.4,
                Math.sin(angle) * 0.4
            );
            chestnut.castShadow = true;
            this.group.add(chestnut);
        }
    }

    getFire() {
        return this.fire;
    }

    handleFireClick() {
        this.fireInfoPanel.toggle();
    }

    animateFire() {
        if (this.fire) {
            this.fire.material.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.005) * 0.5;
        }
    }
} 