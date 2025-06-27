import * as THREE from 'three';

export function createBuilding(width, height, depth, color, x, y, z) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const building = new THREE.Mesh(geometry, material);
    building.position.set(x, y + height / 2, z);
    building.castShadow = true;
    building.receiveShadow = true;
    
    const doorGeo = new THREE.BoxGeometry(2, 4, 0.2);
    const doorMat = new THREE.MeshBasicMaterial({ color: 0x5a2d0c });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, -height/2 + 2, depth/2 + 0.1); 
    building.add(door);

    return building;
}