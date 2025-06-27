import * as THREE from 'three';

// Aumentamos a distância para dar uma margem de segurança e evitar
// que a câmera entre na parede antes da colisão ser detectada.
const COLLISION_DISTANCE = 1.2;

// Função que verifica a colisão usando Raycasting
export function checkCollision(player, direction, collisionObjects) {
    // Pega a posição atual do jogador (da câmera)
    const playerPosition = player.controls.getObject().position;

    // Cria um Raycaster, o "raio laser" que vamos disparar
    const raycaster = new THREE.Raycaster(playerPosition, direction, 0, COLLISION_DISTANCE);

    // Pede ao Raycaster para verificar se ele cruza com algum dos objetos de colisão
    const intersections = raycaster.intersectObjects(collisionObjects, true);

    // Se a lista de interseções não estiver vazia, significa que o raio atingiu algo.
    if (intersections.length > 0) {
        return true; // Colisão detectada!
    }

    return false; // Caminho livre!
}