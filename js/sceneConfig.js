import * as THREE from 'three';

export function setupScene() {
    const scene = new THREE.Scene();
    
    // A cor de fundo e a névoa agora são controladas pelo DayNightCycle
    scene.background = new THREE.Color(0x000000); 
    scene.fog = new THREE.Fog(0x000000, 0, 150);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    return { scene, camera, renderer };
}