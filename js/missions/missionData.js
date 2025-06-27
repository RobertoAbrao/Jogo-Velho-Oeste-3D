export const missions = [
    {
        id: "sheriff_intro",
        title: "Problemas no Saloon",
        description: "O Xerife precisa da sua ajuda. Parece que há uma perturbação no Saloon. Vá até lá e veja o que está acontecendo.",
        questGiver: "Xerife", // Nome do objeto que dá a missão
        objectives: [
            {
                type: "reach_location", // Tipo do objetivo
                target: "Saloon",         // Alvo do objetivo (o nome do objeto)
                description: "Vá para o Saloon",
                completed: false
            }
        ],
        status: "inactive" // inactive, active, completed
    }
];