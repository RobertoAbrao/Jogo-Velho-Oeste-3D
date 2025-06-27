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
    // --- Carregador de Texturas ---
    const textureLoader = new THREE.TextureLoader();

    // --- Chão Texturizado com Relevo ---
    
    // 1. Carrega a textura de COR (Diffuse Map). 
    // Certifique-se que o nome do arquivo 'gravelly_sand_diff_4k.jpg' está correto.
    const groundTexture = textureLoader.load('./assets/textures/gravelly_sand_diff_4k.jpg');
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(50, 50);

    // 2. Carrega a textura de RELEVO (Normal Map).
    // Certifique-se que o nome do arquivo 'gravelly_sand_nor_gl_4k.png' está correto.
    // É este que dá a ilusão de profundidade!
    const groundNormalMap = textureLoader.load('./assets/textures/gravelly_sand_nor_gl_4k.png');
    groundNormalMap.wrapS = THREE.RepeatWrapping;
    groundNormalMap.wrapT = THREE.RepeatWrapping;
    groundNormalMap.repeat.set(50, 50);

    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    
    // 3. Adiciona as duas texturas ao material do chão.
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        map: groundTexture,      // Textura de cor
        normalMap: groundNormalMap // Textura de relevo
    }); 
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // --- Cidade do Velho Oeste ---
    const addBuilding = (name, width, height, depth, color, x, y, z) => {
        const { buildingGroup, colliders } = createBuilding(width, height, depth, color, x, y, z, textureLoader);
        buildingGroup.name = name;
        
        scene.add(buildingGroup);
        collisionObjects.push(...colliders);
        interactiveObjects.push(buildingGroup);
    };

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