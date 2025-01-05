import * as THREE from 'three';

export class Snow {
    constructor() {
        this.geometry = null;
        this.system = null;
    }

    create() {
        const snowflakeCount = 1000;
        this.geometry = new THREE.BufferGeometry();
        const snowflakeVertices = [];

        for (let i = 0; i < snowflakeCount; i++) {
            const x = Math.random() * 20 - 10;
            const y = Math.random() * 20;
            const z = Math.random() * 20 - 10;
            snowflakeVertices.push(x, y, z);
        }

        this.geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(snowflakeVertices, 3)
        );

        const snowflakeMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true
        });

        this.system = new THREE.Points(this.geometry, snowflakeMaterial);
        return this.system;
    }

    animate() {
        const positions = this.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] -= 0.02;
            
            if (positions[i + 1] < 0) {
                positions[i + 1] = 20;
            }
        }
        
        this.geometry.attributes.position.needsUpdate = true;
    }
} 