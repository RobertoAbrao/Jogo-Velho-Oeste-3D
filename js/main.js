import * as THREE from 'three';
import { setupScene } from './sceneConfig.js';
import { createWorld } from './world/world.js';
import { createLights } from './world/lights.js';
import { setupPlayer } from './player/player.js';
import { checkInteraction } from './player/interactions.js';

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

    // Configuração básica da cena, câmera e renderizador
    ({ scene, camera, renderer } = setupScene());
    
    // Criação do mundo (chão, prédios, etc.)
    createWorld(scene, collisionObjects, interactiveObjects);
    
    // Iluminação da cena
    createLights(scene);

    // Configuração do jogador e controles
    ({ player, controls } = setupPlayer(camera, scene));
    
    // Eventos
    window.addEventListener('resize', onWindowResize);

    // Inicia o loop de animação
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
    
    checkInteraction(camera, interactiveObjects);
    
    renderer.render(scene, camera);
}

// --- Inicia o jogo ---
init();