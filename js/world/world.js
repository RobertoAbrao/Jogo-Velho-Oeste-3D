import * as THREE from 'three';
import { createBuilding } from './Crate.js';

function createCactus() {
    const cactusMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const mainStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 2.5, 8),
        cactusMaterial
    );
    mainStem.position.y = 1.25;
    mainStem.castShadow = true;
    
    const arm1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8),
        cactusMaterial
    );
    arm1.position.set(0.5, 1.5, 0);
    arm1.rotation.z = Math.PI / 2;
    mainStem.add(arm1);

    return mainStem;
}

export function createWorld(scene, collisionObjects, interactiveObjects) {
    // Chão
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xc2b280 }); 
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // --- Cidade do Velho Oeste (com paredes de colisão individuais) ---
    
    // Função auxiliar para simplificar a criação
    const addBuilding = (name, width, height, depth, color, x, y, z) => {
        // Pega o grupo do prédio e suas paredes de colisão
        const { buildingGroup, colliders } = createBuilding(width, height, depth, color, x, y, z);
        buildingGroup.name = name;
        
        scene.add(buildingGroup);
        // Adiciona CADA parede à lista de colisões global
        collisionObjects.push(...colliders);
        // O objeto interativo continua sendo o grupo principal
        interactiveObjects.push(buildingGroup);
    };

    // Adiciona os prédios usando a nova função
    addBuilding("Saloon", 10, 8, 15, 0xd2b48c, -15, 0, -10);
    addBuilding("Banco", 8, 6, 8, 0xaaaaaa, 15, 0, -10);
    addBuilding("Estábulo", 12, 5, 20, 0x8b4513, -15, 0, 20);
    addBuilding("Xerife", 7, 6, 7, 0xdeb887, 15, 0, 15);

    // Cactos
    for (let i = 0; i < 50; i++) {
        const x = (Math.random() - 0.5) * 180;
        const z = (Math.random() - 0.5) * 180;
        if (Math.abs(x) < 30 && Math.abs(z) < 30) continue;
        
        const cactus = createCactus();
        cactus.position.set(x, 0, z);
        scene.add(cactus);
        collisionObjects.push(cactus);
    }
}