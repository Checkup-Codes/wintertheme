import * as THREE from 'three';

export class InteractionManager {
    constructor(camera, audioManager) {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.camera = camera;
        this.audioManager = audioManager;
        this.nose = null;
        this.fireplace = null;
        this.snowmanBody = null;
        this.snowman = null;

        // Event listeners
        window.addEventListener('click', (e) => this.onMouseClick(e));
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    setNose(nose) {
        this.nose = nose;
    }

    setFireplace(fireplace) {
        this.fireplace = fireplace;
    }

    setSnowman(snowman) {
        this.snowman = snowman;
        this.snowmanBody = snowman.getBody();
    }

    onMouseClick(event) {
        this.updateMousePosition(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Burun kontrolü
        if (this.nose) {
            const noseIntersects = this.raycaster.intersectObject(this.nose);
            if (noseIntersects.length > 0) {
                this.audioManager.play();
                return;
            }
        }

        // Kardan adam gövde kontrolü
        if (this.snowmanBody && this.snowman) {
            const bodyIntersects = this.raycaster.intersectObject(this.snowmanBody);
            if (bodyIntersects.length > 0) {
                this.snowman.handleBodyClick();
                return;
            }
        }

        // Ateş kontrolü
        if (this.fireplace) {
            const fire = this.fireplace.getFire();
            if (fire) {
                const fireIntersects = this.raycaster.intersectObject(fire);
                if (fireIntersects.length > 0) {
                    this.fireplace.handleFireClick();
                    return;
                }
            }
        }
    }

    onMouseMove(event) {
        this.updateMousePosition(event);
    }

    updateMousePosition(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    update() {
        if (!this.nose && !this.fireplace && !this.snowmanBody) return;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        let cursorChanged = false;

        // Burun hover kontrolü
        if (this.nose) {
            const noseIntersects = this.raycaster.intersectObject(this.nose);
            if (noseIntersects.length > 0) {
                this.nose.material.emissiveIntensity = this.nose.userData.hoverEmissiveIntensity;
                document.body.style.cursor = 'pointer';
                cursorChanged = true;
            } else {
                this.nose.material.emissiveIntensity = this.nose.userData.defaultEmissiveIntensity;
            }
        }

        // Kardan adam hover kontrolü
        if (this.snowmanBody && !cursorChanged) {
            const bodyIntersects = this.raycaster.intersectObject(this.snowmanBody);
            if (bodyIntersects.length > 0) {
                document.body.style.cursor = 'pointer';
                cursorChanged = true;
            }
        }

        // Ateş hover kontrolü
        if (this.fireplace && !cursorChanged) {
            const fire = this.fireplace.getFire();
            if (fire) {
                const fireIntersects = this.raycaster.intersectObject(fire);
                if (fireIntersects.length > 0) {
                    document.body.style.cursor = 'pointer';
                    cursorChanged = true;
                }
            }
        }

        if (!cursorChanged) {
            document.body.style.cursor = 'default';
        }
    }
} 