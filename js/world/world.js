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

    // Saloon
    const saloon = createBuilding(10, 8, 15, 0xd2b48c, -15, 0, -10);
    saloon.name = "Saloon";
    scene.add(saloon);
    collisionObjects.push(saloon);
    interactiveObjects.push(saloon);

    // Banco
    const bank = createBuilding(8, 6, 8, 0xaaaaaa, 15, 0, -10);
    bank.name = "Banco";
    scene.add(bank);
    collisionObjects.push(bank);
    interactiveObjects.push(bank);

    // Estábulo
    const stable = createBuilding(12, 5, 20, 0x8b4513, -15, 0, 20);
    stable.name = "Estábulo";
    scene.add(stable);
    collisionObjects.push(stable);
    interactiveObjects.push(stable);

    // Escritório do Xerife
    const sheriffOffice = createBuilding(7, 6, 7, 0xdeb887, 15, 0, 15);
    sheriffOffice.name = "Xerife";
    scene.add(sheriffOffice);
    collisionObjects.push(sheriffOffice);
    interactiveObjects.push(sheriffOffice);

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