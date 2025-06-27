import { MissionManager } from '../missions/MissionManager.js';

function findClosestInteractiveObject(camera, interactiveObjects) {
    let closestObject = null;
    let minDistance = 3;

    interactiveObjects.forEach(obj => {
       const distance = camera.position.distanceTo(obj.position);
       if (distance < minDistance) {
           minDistance = distance;
           closestObject = obj;
       }
    });
    return closestObject;
}

export function handleInteraction(camera, interactiveObjects) {
    const interactionCandidate = findClosestInteractiveObject(camera, interactiveObjects);
    if (interactionCandidate) {
        console.log("Interagindo com:", interactionCandidate.name);
        
        // 1. TENTA FINALIZAR A MISSÃO PRIMEIRO
        // Se a missão for finalizada, a função para por aqui.
        if (MissionManager.completeMission(interactionCandidate)) {
            return; 
        }

        // 2. Se não finalizou, tenta completar um objetivo
        MissionManager.checkObjectives(interactionCandidate);

        // 3. Se nada disso aconteceu, verifica se pode dar uma nova missão
        const missionToStart = MissionManager.getQuestGiver(interactionCandidate.name);
        if (missionToStart) {
            if (MissionManager.startMission(missionToStart.id)) {
                alert(`Nova missão: ${missionToStart.title}\n\n${missionToStart.description}`);
            }
        }
    }
}

export function updateInteractionPrompt(camera, interactiveObjects) {
    const interactionPrompt = document.getElementById('interaction-prompt');
    const closestObject = findClosestInteractiveObject(camera, interactiveObjects);

    if (closestObject) {
        interactionPrompt.textContent = `Pressione [E] para interagir com ${closestObject.name}`;
        interactionPrompt.style.display = 'block';
    } else {
        interactionPrompt.style.display = 'none';
    }
}