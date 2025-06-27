import * as THREE from 'three';
import { setupScene } from './sceneConfig.js';
import { createWorld } from './world/world.js';
import { DayNightCycle } from './world/DayNightCycle.js'; // Importa o novo módulo
import { setupPlayer } from './player/player.js';
import { updateInteractionPrompt } from './player/interactions.js';

let scene, camera, renderer, clock;
let player, controls;
let dayNightCycle; // Variável para o nosso novo sistema
const collisionObjects = [];
const interactiveObjects = [];

function init() {
    clock = new THREE.Clock();

    ({ scene, camera, renderer } = setupScene());
    
    // Cria o mundo (chão, prédios, etc.)
    createWorld(scene, collisionObjects, interactiveObjects);
    
    // INICIA O CICLO DE DIA E NOITE
    // Ele agora cria suas próprias luzes e céu.
    dayNightCycle = new DayNightCycle(scene, renderer, camera);

    // Configuração do jogador e controles
    ({ player, controls } = setupPlayer(camera, scene, interactiveObjects));
    
    window.addEventListener('resize', onWindowResize);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Atualiza o ciclo de dia e noite a cada frame
    dayNightCycle.update(delta);

    if (controls.isLocked) {
        player.update(delta, collisionObjects);
    }
    
    updateInteractionPrompt(camera, interactiveObjects);
    
    renderer.render(scene, camera);
}

init();