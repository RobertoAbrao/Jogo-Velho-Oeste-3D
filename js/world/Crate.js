import * as THREE from 'three';

// Define as dimensões da porta que usaremos em todos os prédios
const DOOR_WIDTH = 2;
const DOOR_HEIGHT = 3;

// A função agora recebe o 'textureLoader' como um novo parâmetro
export function createBuilding(width, height, depth, color, x, y, z, textureLoader) {
    
    // --- Material com Textura ---
    const woodTexture = textureLoader.load('./assets/textures/wood_planks.jpg');
    // Ajustamos a repetição da textura para ela não parecer esticada
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(Math.floor(width / 2), Math.floor(height / 2));

    // O material agora usa a textura. A cor serve como um "tingimento".
    const material = new THREE.MeshStandardMaterial({ map: woodTexture, color: color });
    
    // O 'Group' vai servir como o container para todas as partes do nosso prédio
    const buildingGroup = new THREE.Group();
    buildingGroup.position.set(x, y, z);
    
    // Lista para guardar apenas as paredes que terão colisão
    const colliders = [];

    // --- Criação das Paredes ---

    // Parede Traseira
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.2), material);
    backWall.position.set(0, height / 2, -depth / 2);
    colliders.push(backWall);

    // Parede Esquerda
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(depth, height, 0.2), material);
    leftWall.position.set(-width / 2, height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    colliders.push(leftWall);

    // Parede Direita
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(depth, height, 0.2), material);
    rightWall.position.set(width / 2, height / 2, 0);
    rightWall.rotation.y = Math.PI / 2;
    colliders.push(rightWall);

    // Parede da Frente (dividida em 3 partes para criar a porta)
    const frontWall_LeftPart = new THREE.Mesh(
        new THREE.BoxGeometry(width / 2 - DOOR_WIDTH / 2, height, 0.2), 
        material
    );
    frontWall_LeftPart.position.set(-(width / 4 + DOOR_WIDTH / 4), height / 2, depth / 2);
    colliders.push(frontWall_LeftPart);

    const frontWall_RightPart = new THREE.Mesh(
        new THREE.BoxGeometry(width / 2 - DOOR_WIDTH / 2, height, 0.2), 
        material
    );
    frontWall_RightPart.position.set(width / 4 + DOOR_WIDTH / 4, height / 2, depth / 2);
    colliders.push(frontWall_RightPart);
    
    // Lintel (a parte de cima da porta)
    const frontWall_TopPart = new THREE.Mesh(
        new THREE.BoxGeometry(DOOR_WIDTH, height - DOOR_HEIGHT, 0.2), 
        material
    );
    frontWall_TopPart.position.set(0, DOOR_HEIGHT + (height - DOOR_HEIGHT) / 2, depth / 2);
    colliders.push(frontWall_TopPart);

    // Teto
    const roof = new THREE.Mesh(new THREE.BoxGeometry(width, 0.2, depth), material);
    roof.position.set(0, height, 0);
    
    buildingGroup.add(backWall, leftWall, rightWall, frontWall_LeftPart, frontWall_RightPart, frontWall_TopPart, roof);

    // Ativa sombras para todas as partes do prédio
    buildingGroup.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    // A função retorna tanto o objeto 3D (o grupo) quanto as suas paredes de colisão
    return { buildingGroup, colliders };
}