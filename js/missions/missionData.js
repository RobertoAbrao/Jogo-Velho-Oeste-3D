export const missions = [
    {
        id: "sheriff_intro",
        title: "Problemas no Saloon",
        description: "O Xerife precisa da sua ajuda. Parece que há uma perturbação no Saloon. Vá até lá e veja o que está acontecendo.",
        questGiver: "Xerife", // Nome do objeto que dá a missão
        completionDialogue: "Bom trabalho, parceiro! A cidade está mais segura graças a você.", // Diálogo ao concluir
        objectives: [
            {
                type: "reach_location", 
                target: "Saloon",
                description: "Vá para o Saloon",
                completed: false
            }
        ],
        status: "inactive" // inactive, active, completed
    }
];