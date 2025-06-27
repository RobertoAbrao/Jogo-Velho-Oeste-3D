const missionBox = document.getElementById('mission-box');
const missionTitle = document.getElementById('mission-title');
const missionObjective = document.getElementById('mission-objective');

export const UIManager = {
    updateMissionUI(mission) {
        if (mission && mission.status === 'active') {
            missionTitle.textContent = mission.title;
            
            // Encontra o primeiro objetivo não concluído para exibir
            const currentObjective = mission.objectives.find(obj => !obj.completed);
            if (currentObjective) {
                missionObjective.textContent = `- ${currentObjective.description}`;
            } else {
                // Se todos os objetivos foram concluídos
                missionObjective.textContent = "Missão concluída! Volte ao Xerife.";
            }

            missionBox.style.display = 'block';
        } else {
            missionBox.style.display = 'none';
        }
    }
};