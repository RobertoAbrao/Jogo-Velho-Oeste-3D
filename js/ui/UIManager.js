const missionBox = document.getElementById('mission-box');
const missionTitle = document.getElementById('mission-title');
const missionObjective = document.getElementById('mission-objective');

export const UIManager = {
    updateMissionUI(mission) {
        // AQUI ESTÁ A CORREÇÃO!
        // A UI agora aparece se a missão estiver 'active' OU 'ready_to_complete'.
        if (mission && (mission.status === 'active' || mission.status === 'ready_to_complete')) {
            missionTitle.textContent = mission.title;
            
            // Encontra o primeiro objetivo não concluído para exibir
            const currentObjective = mission.objectives.find(obj => !obj.completed);
            if (currentObjective) {
                missionObjective.textContent = `- ${currentObjective.description}`;
            } else {
                // Se todos os objetivos foram concluídos, mostra a próxima instrução.
                missionObjective.textContent = "✔ Missão concluída! Volte ao Xerife.";
            }

            missionBox.style.display = 'block';
        } else {
            // Se não houver missão ativa ou se ela for finalizada, esconde a caixa.
            missionBox.style.display = 'none';
        }
    }
};