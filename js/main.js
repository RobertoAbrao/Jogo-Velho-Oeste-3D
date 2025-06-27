import * as THREE from 'three';
import { setupScene } from './sceneConfig.js';
import { createWorld } from './world/world.js';
import { createLights } from './world/lights.js';
import { setupPlayer } from './player/player.js';
import { updateInteractionPrompt } from './player/interactions.js'; // Alterado aqui

// ====================================================================
// VARIÁVEIS GLOBAIS
// ====================================================================
let scene, camera, renderer, clock;
let player, controls;
const collisionObjects = [];
const interactiveObjects = [];

// ====================================================================
// INICIALIZAÇÃO
// ====================================================================
function init() {
    clock = new THREE.Clock();

    ({ scene, camera, renderer } = setupScene());
    
    createWorld(scene, collisionObjects, interactiveObjects);
    
    createLights(scene);

    // Passamos a lista de objetos para o setup do jogador
    ({ player, controls } = setupPlayer(camera, scene, interactiveObjects));
    
    window.addEventListener('resize', onWindowResize);

    animate();
}

// ====================================================================
// EVENTOS
// ====================================================================
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ====================================================================
// LOOP PRINCIPAL DE ANIMAÇÃO
// ====================================================================
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (controls.isLocked) {
        player.update(delta, collisionObjects);
    }
    
    // Atualiza o prompt de interação (ex: "Pressione [E]")
    updateInteractionPrompt(camera, interactiveObjects); // Alterado aqui
    
    renderer.render(scene, camera);
}

// --- Inicia o jogo ---
init();