import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { handleInteraction } from './interactions.js';

export function setupControls(camera, domElement, player) {
    const controls = new PointerLockControls(camera, domElement);

    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', () => controls.lock());
    controls.addEventListener('lock', () => blocker.style.display = 'none');
    controls.addEventListener('unlock', () => blocker.style.display = 'flex');

    const onKeyDown = (event) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                player.move.forward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                player.move.left = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                player.move.backward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                player.move.right = true;
                break;
            case 'KeyE':
                handleInteraction(camera);
                break;
        }
    };

    const onKeyUp = (event) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                player.move.forward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                player.move.left = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                player.move.backward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                player.move.right = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return controls;
}