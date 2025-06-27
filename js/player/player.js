import * as THREE from 'three';
import { setupControls } from './controls.js';
import { checkCollision } from './collision.js';

export function setupPlayer(camera, scene, interactiveObjects) {
    const player = {
        height: 1.8,
        speed: 2.0,
        velocity: new THREE.Vector3(),
        camera: camera,
        controls: null,
        move: {
            forward: false,
            backward: false,
            left: false,
            right: false
        },
        update: function(delta, collisionObjects) {
            // Esta função será redefinida abaixo.
        }
    };

    const controls = setupControls(camera, document.body, player, interactiveObjects);
    player.controls = controls;

    player.update = function(delta, collisionObjects) {
        // --- Atrito ---
        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        
        // --- Direções da Câmera ---
        const forwardDirection = new THREE.Vector3();
        this.camera.getWorldDirection(forwardDirection);
        forwardDirection.y = 0;
        forwardDirection.normalize();

        const rightDirection = new THREE.Vector3();
        // AQUI ESTÁ A CORREÇÃO! Inverti a ordem do 'crossVectors' para calcular a direção correta.
        rightDirection.crossVectors(forwardDirection, this.controls.getObject().up).normalize();

        // --- Calcula a velocidade com base nas teclas pressionadas ---
        if (this.move.forward) {
            this.velocity.z -= this.speed * delta;
        }
        if (this.move.backward) {
            this.velocity.z += this.speed * delta;
        }
        if (this.move.right) {
            this.velocity.x -= this.speed * delta;
        }
        if (this.move.left) {
            this.velocity.x += this.speed * delta;
        }
        
        // --- Lógica de Colisão ---
        // Checa colisão para FRENTE (velocidade Z negativa)
        if (this.velocity.z < 0 && checkCollision(this, forwardDirection, collisionObjects)) {
            this.velocity.z = 0;
        }
        // Checa colisão para TRÁS (velocidade Z positiva)
        if (this.velocity.z > 0 && checkCollision(this, forwardDirection.clone().negate(), collisionObjects)) {
            this.velocity.z = 0;
        }
        // Checa colisão para a DIREITA (velocidade X negativa)
        if (this.velocity.x < 0 && checkCollision(this, rightDirection, collisionObjects)) {
            this.velocity.x = 0;
        }
        // Checa colisão para a ESQUERDA (velocidade X positiva)
        if (this.velocity.x > 0 && checkCollision(this, rightDirection.clone().negate(), collisionObjects)) {
            this.velocity.x = 0;
        }

        // --- Aplica o movimento final e corrigido ---
        this.controls.moveRight(-this.velocity.x);
        this.controls.moveForward(-this.velocity.z);

        // Mantém o jogador na altura correta
        this.controls.getObject().position.y = this.height;
    };

    camera.position.set(0, player.height, 10);
    scene.add(player.controls.getObject());

    return { player, controls: player.controls };
}