import * as THREE from 'three';
// Importa o loader especial para imagens HDR
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export function setupScene() {
    const scene = new THREE.Scene();

    // --- Configuração do Skybox (Céu Panorâmico) ---
    // Cria um loader para o formato .hdr
    const loader = new RGBELoader();
    // Carrega a imagem do céu que você baixou
    loader.load('./assets/skybox/minedump_flats_4k.hdr', (texture) => {
        // Define que a imagem será usada como um mapa de equirectangular (uma esfera)
        texture.mapping = THREE.EquirectangularReflectionMapping;
        
        // Define a imagem como o fundo da cena
        scene.background = texture;
        // E também como a principal fonte de iluminação ambiente do mundo
        scene.environment = texture;
    });

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Habilita a renderização para usar as cores do céu de forma mais realista
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8; // Ajuste o brilho se necessário
    document.body.appendChild(renderer.domElement);

    return { scene, camera, renderer };
}