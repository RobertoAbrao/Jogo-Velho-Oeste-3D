let interactiveObjectsCache = [];

export function handleInteraction(camera) {
    const interactionCandidate = checkInteraction(camera, interactiveObjectsCache);
    if (interactionCandidate) {
        alert(`Você entrou no ${interactionCandidate.name}!`);
        console.log("Interagindo com:", interactionCandidate.name);
    }
}

export function checkInteraction(camera, interactiveObjects) {
    interactiveObjectsCache = interactiveObjects;
    const interactionPrompt = document.getElementById('interaction-prompt');
    let closestObject = null;
    let minDistance = 3;

    interactiveObjects.forEach(obj => {
       const distance = camera.position.distanceTo(obj.position);
       if (distance < minDistance) {
           minDistance = distance;
           closestObject = obj;
       }
    });

    if (closestObject) {
        interactionPrompt.style.display = 'block';
        return closestObject;
    } else {
        interactionPrompt.style.display = 'none';
        return null;
    }
}