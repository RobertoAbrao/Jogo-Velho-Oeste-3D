import { missions } from './missionData.js';
import { UIManager } from '../ui/UIManager.js';

let activeMission = null;

export const MissionManager = {
    startMission(missionId) {
        const mission = missions.find(m => m.id === missionId);
        // Só inicia a missão se ela existir e estiver inativa
        if (mission && mission.status === 'inactive') {
            mission.status = 'active';
            activeMission = mission;
            console.log(`Missão iniciada: ${mission.title}`);
            UIManager.updateMissionUI(activeMission);
            return true;
        }
        return false;
    },

    checkObjectives(interactionTarget) {
        if (!activeMission) return;

        activeMission.objectives.forEach(obj => {
            // Se o objetivo é do tipo "chegar a um local" e o alvo é o local onde interagimos
            if (obj.type === 'reach_location' && obj.target === interactionTarget.name && !obj.completed) {
                this.completeObjective(obj);
            }
        });
    },

    completeObjective(objective) {
        objective.completed = true;
        console.log(`Objetivo concluído: ${objective.description}`);

        // Verifica se todos os objetivos foram concluídos
        const allDone = activeMission.objectives.every(obj => obj.completed);
        if (allDone) {
            console.log(`Missão "${activeMission.title}" concluída!`);
            // Poderíamos mudar o status para "completed" aqui, mas vamos deixar
            // o jogador voltar ao Xerife primeiro.
        }

        UIManager.updateMissionUI(activeMission);
    },

    getQuestGiver(objectName) {
        // Encontra uma missão que pode ser dada pelo objeto com o qual interagimos
        return missions.find(m => m.questGiver === objectName && m.status === 'inactive');
    }
};