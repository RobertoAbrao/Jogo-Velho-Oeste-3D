import * as THREE from 'three';
import { setupControls } from './controls.js';

export function setupPlayer(camera, scene) {
    const player = {
        height: 1.8,
        speed: 10.0,
        velocity: new THREE.Vector3(),
        direction: new THREE.Vector3(),
        move: {
            forward: false,
            backward: false,
            left: false,
            right: false
        },
        update: function(delta, collisionObjects) {
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;

            this.direction.z = Number(this.move.forward) - Number(this.move.backward);
            this.direction.x = Number(this.move.right) - Number(this.move.left);
            this.direction.normalize();

            if (this.move.forward || this.move.backward) this.velocity.z -= this.direction.z * this.speed * delta;
            if (this.move.left || this.move.right) this.velocity.x -= this.direction.x * this.speed * delta;
            
            controls.moveRight(-this.velocity.x);
            controls.moveForward(-this.velocity.z);

            controls.getObject().position.y = this.height;
        }
    };

    camera.position.set(0, player.height, 10);
    const controls = setupControls(camera, document.body, player);
    scene.add(controls.getObject());

    return { player, controls };
}