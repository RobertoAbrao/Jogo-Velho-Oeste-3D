import { MissionManager } from '../missions/MissionManager.js';

// Função auxiliar que apenas encontra o objeto interativo mais próximo
function findClosestInteractiveObject(camera, interactiveObjects) {
    let closestObject = null;
    let minDistance = 3; // Distância máxima para interagir

    interactiveObjects.forEach(obj => {
       const distance = camera.position.distanceTo(obj.position);
       if (distance < minDistance) {
           minDistance = distance;
           closestObject = obj;
       }
    });
    return closestObject;
}

// Função chamada quando o jogador pressiona a tecla 'E'
export function handleInteraction(camera, interactiveObjects) {
    const interactionCandidate = findClosestInteractiveObject(camera, interactiveObjects);
    if (interactionCandidate) {
        console.log("Interagindo com:", interactionCandidate.name);
        
        // 1. Tenta verificar se a interação completa um objetivo
        MissionManager.checkObjectives(interactionCandidate);

        // 2. Verifica se o objeto pode dar uma nova missão
        const missionToStart = MissionManager.getQuestGiver(interactionCandidate.name);
        if (missionToStart) {
            // Tenta iniciar a missão. Se conseguir, mostra um alerta.
            if (MissionManager.startMission(missionToStart.id)) {
                alert(`Nova missão: ${missionToStart.title}\n\n${missionToStart.description}`);
            }
        } else {
             // Lógica antiga (se não houver missão para dar nem objetivo para completar)
             // alert(`Você está em ${interactionCandidate.name}!`);
        }
    }
}

// Função chamada a cada frame para mostrar ou esconder o prompt de interação
export function updateInteractionPrompt(camera, interactiveObjects) {
    const interactionPrompt = document.getElementById('interaction-prompt');
    const closestObject = findClosestInteractiveObject(camera, interactiveObjects);

    if (closestObject) {
        // Mostra o nome do local no prompt
        interactionPrompt.textContent = `Pressione [E] para interagir com ${closestObject.name}`;
        interactionPrompt.style.display = 'block';
    } else {
        interactionPrompt.style.display = 'none';
    }
}