import { Scene } from './src/Scene';
import { Snowman } from './src/Snowman';
import { Fireplace } from './src/Fireplace';
import { Snow } from './src/Snow';
import { AudioManager } from './src/AudioManager';
import { InteractionManager } from './src/InteractionManager';
import { SantaSleigh } from './src/SantaSleigh';

// Scene oluştur
const scene = new Scene().initialize();

// Audio manager oluştur
const audioManager = new AudioManager();

// Interaction manager oluştur
const interactionManager = new InteractionManager(scene.getCamera(), audioManager);

// Zemin ve ışıkları oluştur
scene.createGround();
scene.setupLights();

// Kardan adam oluştur
const snowman = new Snowman();
scene.add(snowman.create());
interactionManager.setNose(snowman.getNose());
interactionManager.setSnowman(snowman);

// Noel Baba ve kızağını oluştur
const santaSleigh = new SantaSleigh();
scene.add(santaSleigh.create());

// Ocak oluştur
const fireplace = new Fireplace();
scene.add(fireplace.create());
interactionManager.setFireplace(fireplace);

// Kar oluştur
const snow = new Snow();
scene.add(snow.create());

// Animasyon döngüsü
function animate() {
    requestAnimationFrame(animate);
    
    scene.update();
    snow.animate();
    fireplace.animateFire();
    interactionManager.update();
    
    scene.render();
}

animate();