import * as THREE from 'three';

// Define as dimensões da porta que usaremos em todos os prédios
const DOOR_WIDTH = 2;
const DOOR_HEIGHT = 3;

export function createBuilding(width, height, depth, color, x, y, z) {
    // O material que será compartilhado por todas as paredes do prédio
    const material = new THREE.MeshStandardMaterial({ color: color });
    
    // O 'Group' vai servir como o container para todas as partes do nosso prédio
    const buildingGroup = new THREE.Group();
    buildingGroup.position.set(x, y, z);
    
    // Lista para guardar apenas as paredes que terão colisão
    const colliders = [];

    // --- Criação das Paredes ---
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.2), material);
    backWall.position.set(0, height / 2, -depth / 2);
    colliders.push(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(depth, height, 0.2), material);
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    colliders.push(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(depth, height, 0.2), material);
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = Math.PI / 2;
    colliders.push(rightWall);

    const frontWall_LeftPart = new THREE.Mesh(new THREE.BoxGeometry(width / 2 - DOOR_WIDTH / 2, height, 0.2), material);
    frontWall_LeftPart.position.set(-(width / 4 + DOOR_WIDTH / 4), height / 2, depth / 2);
    colliders.push(frontWall_LeftPart);

    const frontWall_RightPart = new THREE.Mesh(new THREE.BoxGeometry(width / 2 - DOOR_WIDTH / 2, height, 0.2), material);
    frontWall_RightPart.position.set(width / 4 + DOOR_WIDTH / 4, height / 2, depth / 2);
    colliders.push(frontWall_RightPart);
    
    const frontWall_TopPart = new THREE.Mesh(new THREE.BoxGeometry(DOOR_WIDTH, height - DOOR_HEIGHT, 0.2), material);
    frontWall_TopPart.position.set(0, DOOR_HEIGHT + (height - DOOR_HEIGHT) / 2, depth / 2);
    colliders.push(frontWall_TopPart);

    // --- ADICIONANDO O TETO ---
    const roof = new THREE.Mesh(new THREE.BoxGeometry(width, 0.2, depth), material);
    roof.position.set(0, height, 0); // Posiciona o teto no topo do prédio
    // O teto não precisa de colisão para este tipo de jogo
    
    buildingGroup.add(backWall, leftWall, rightWall, frontWall_LeftPart, frontWall_RightPart, frontWall_TopPart, roof); // Adiciona o teto ao grupo

    buildingGroup.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    return { buildingGroup, colliders };
}