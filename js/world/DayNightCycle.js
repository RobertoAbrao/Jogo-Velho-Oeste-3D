import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

export class DayNightCycle {
    constructor(scene, renderer, camera) {
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.sky = new Sky();
        this.sun = new THREE.Vector3();
        this.time = 0; // O tempo atual do ciclo (0 a 1)
        this.cycleSpeed = 0.01; // Velocidade da passagem do tempo

        this.initSky();
        this.initLights();
    }

    initSky() {
        this.sky.scale.setScalar(1000);
        this.scene.add(this.sky);

        // Configuração inicial do céu
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.5;
        this.scene.environment = this.sky.material;
    }

    initLights() {
        // O sol agora é uma luz direcional gerenciada por este módulo
        this.sunLight = new THREE.DirectionalLight(0xffffff, 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 2048;
        this.sunLight.shadow.mapSize.height = 2048;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 500;
        this.sunLight.shadow.camera.left = -100;
        this.sunLight.shadow.camera.right = 100;
        this.sunLight.shadow.camera.top = 100;
        this.sunLight.shadow.camera.bottom = -100;
        this.scene.add(this.sunLight);

        // Luz ambiente para suavizar as sombras
        this.ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
        this.scene.add(this.ambientLight);
    }

    update(delta) {
        // Atualiza o tempo do ciclo
        this.time = (this.time + delta * this.cycleSpeed) % 1;

        // Calcula a inclinação do sol (0 = horizonte, PI/2 = meio-dia)
        const inclination = Math.PI * this.time;
        
        // Mantém o sol no mesmo eixo horizontal
        const azimuth = 0.25; 

        // Atualiza as propriedades do material do céu
        const uniforms = this.sky.material.uniforms;
        uniforms['turbidity'].value = 10;
        uniforms['rayleigh'].value = 2;
        uniforms['mieCoefficient'].value = 0.005;
        uniforms['mieDirectionalG'].value = 0.8;
        
        // Calcula a posição do sol no céu
        const phi = THREE.MathUtils.degToRad(90 - inclination * 180 / Math.PI);
        const theta = THREE.MathUtils.degToRad(azimuth * 360 - 90);

        this.sun.setFromSphericalCoords(1, phi, theta);
        uniforms['sunPosition'].value.copy(this.sun);
        
        // Atualiza a posição da luz direcional para corresponder ao sol no céu
        this.sunLight.position.copy(this.sun).multiplyScalar(100);

        // Atualiza a exposição e a cor da luz ambiente com base na altura do sol
        const sunY = this.sun.y;
        this.renderer.toneMappingExposure = Math.max(0.1, sunY * 1.2);
        this.ambientLight.intensity = Math.max(0.1, sunY * 1.5);

        // Atualiza a cor da névoa
        const fogColor = new THREE.Color().setHSL(0.6, 0.5, Math.max(0.2, sunY * 0.9));
        this.scene.fog.color.copy(fogColor);
    }
}