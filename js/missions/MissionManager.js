import { missions } from './missionData.js';
import { UIManager } from '../ui/UIManager.js';

let activeMission = null;

export const MissionManager = {
    startMission(missionId) {
        const mission = missions.find(m => m.id === missionId);
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
        if (!activeMission || activeMission.status !== 'active') return;

        activeMission.objectives.forEach(obj => {
            if (obj.type === 'reach_location' && obj.target === interactionTarget.name && !obj.completed) {
                this.completeObjective(obj);
            }
        });
    },

    completeObjective(objective) {
        objective.completed = true;
        console.log(`Objetivo concluído: ${objective.description}`);

        const allDone = activeMission.objectives.every(obj => obj.completed);
        if (allDone) {
            console.log(`Todos os objetivos da missão "${activeMission.title}" concluídos!`);
            activeMission.status = 'ready_to_complete'; // Novo status!
        }

        UIManager.updateMissionUI(activeMission);
    },

    // NOVA FUNÇÃO para finalizar a missão
    completeMission(interactionTarget) {
        if (!activeMission || activeMission.status !== 'ready_to_complete') {
            return false; // Não há missão pronta para ser concluída
        }

        // Verifica se estamos falando com a pessoa que nos deu a missão
        if (activeMission.questGiver === interactionTarget.name) {
            alert(activeMission.completionDialogue); // Mostra o diálogo final
            console.log(`Missão "${activeMission.title}" finalizada!`);
            
            activeMission.status = 'completed';
            activeMission = null; // Limpa a missão ativa
            UIManager.updateMissionUI(null); // Esconde a UI da missão
            return true;
        }
        return false;
    },

    getQuestGiver(objectName) {
        return missions.find(m => m.questGiver === objectName && m.status === 'inactive');
    }
};