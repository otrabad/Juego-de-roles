document.addEventListener('DOMContentLoaded', () => {
    // --- DATOS DEL JUEGO ---
    const roles = [
        { id: 'hemoterapia', name: 'Médico especialista en Hemoterapia', colorClass: 'role-hemoterapia' },
        { id: 'hematologia', name: 'Especialista en Hematología', colorClass: 'role-hematologia' },
        { id: 'anestesia', name: 'Especialista en Anestesia', colorClass: 'role-anestesia' },
        { id: 'perfusionista', name: 'Perfusionista', colorClass: 'role-perfusionista' },
        { id: 'tecnico', name: 'Técnico en Hemoterapia', colorClass: 'role-tecnico' }
    ];

    const pillars = [
        { id: 1, name: 'Pilar 1', description: 'Detección, diagnóstico y tratamiento de la anemia', colorClass: 'pillar-1' },
        { id: 2, name: 'Pilar 2', description: 'Minimización de pérdidas sanguíneas y manejo de coagulopatías', colorClass: 'pillar-2' },
        { id: 3, name: 'Pilar 3', description: 'Aumento de la tolerancia a la anemia', colorClass: 'pillar-3' }
    ];

    const activities = [
        // Médico especialista en Hemoterapia
        { activity: "Participa en la detección proactiva de la anemia preoperatoria a través de la revisión de la historia clínica y la solicitud de pruebas pertinentes.", role: 'hemoterapia', pillar: 1 },
        { activity: "Colabora en el diagnóstico diferencial de la anemia y en la implementación de estrategias de tratamiento, como la administración de hierro o eritropoyetina, según las guías institucionales.", role: 'hemoterapia', pillar: 1 },
        { activity: "Asesora sobre el uso racional de componentes sanguíneos, implementando algoritmos de transfusión restrictivos basados en la condición clínica individual del paciente y no solo en valores de laboratorio.", role: 'hemoterapia', pillar: 2 },
        { activity: "Participa en la evaluación y el manejo de coagulopatías preexistentes o adquiridas, y recomienda el uso de antifibrinolíticos cuando esté indicado.", role: 'hemoterapia', pillar: 2 },
        { activity: "Supervisa y gestiona los procesos de autotransfusión programada y recuperación intraoperatoria de células sanguíneas.", role: 'hemoterapia', pillar: 2 },
        { activity: "Contribuye a la definición de límites de transfusión restrictivos basados en la reserva fisiológica y las comorbilidades del paciente.", role: 'hemoterapia', pillar: 3 },
        { activity: "Participa en la optimización del suministro de oxígeno mediante la comunicación con el equipo quirúrgico y anestésico.", role: 'hemoterapia', pillar: 3 },
        { activity: "Realiza la transfusión de componentes específicos solo cuando sea estrictamente necesario, considerando la situación clínica del paciente.", role: 'hemoterapia', pillar: 3 },
        // Especialista en Hematología
        { activity: "Realiza el diagnóstico diferencial de anemias complejas y otras alteraciones hematológicas relevantes en el contexto preoperatorio y postoperatorio.", role: 'hematologia', pillar: 1 },
        { activity: "Orienta sobre el tratamiento de anemias específicas, incluyendo anemias ferropénicas, por deficiencia de vitamina B12 o folato, y anemias de enfermedades crónicas.", role: 'hematologia', pillar: 1 },
        { activity: "Evalúa y maneja trastornos de la coagulación congénitos o adquiridos, proporcionando recomendaciones específicas para su corrección o control en el perioperatorio.", role: 'hematologia', pillar: 2 },
        { activity: "Colabora en la interpretación de pruebas de hemostasia y en la implementación de estrategias para minimizar el sangrado, incluyendo el uso de fármacos y terapias específicas.", role: 'hematologia', pillar: 2 },
        // Especialista en Anestesia
        { activity: "Evalúa la tolerancia del paciente a la anemia en el contexto preoperatorio y optimiza su estado clínico antes de la cirugía.", role: 'anestesia', pillar: 1 },
        { activity: "Emplea técnicas anestésicas que minimizan la pérdida sanguínea intraoperatoria, como la hipotensión controlada (cuando sea apropiado) y una hemostasia quirúrgica meticulosa.", role: 'anestesia', pillar: 2 },
        { activity: "Considera la hemodilución normovolémica en casos seleccionados. Administra antifibrinolíticos según los protocolos institucionales para reducir el sangrado.", role: 'anestesia', pillar: 2 },
        { activity: "Monitorea y optimiza la oxigenación y el transporte de oxígeno durante la cirugía.", role: 'anestesia', pillar: 3 },
        { activity: "Ajusta la ventilación y el soporte hemodinámico para mejorar la tolerancia del paciente a la anemia.", role: 'anestesia', pillar: 3 },
        // Perfusionista
        { activity: "Implementa estrategias para minimizar la hemodilución durante la circulación extracorpórea (CEC), como la optimización del volumen del circuito y la ultrafiltración.", role: 'perfusionista', pillar: 2 },
        { activity: "Optimiza la hemostasia durante y después de la CEC, trabajando en colaboración con el cirujano y el anestesista.", role: 'perfusionista', pillar: 2 },
        { activity: "Contribuye a mantener una adecuada oxigenación durante la CEC.", role: 'perfusionista', pillar: 3 },
        // Técnico en Hemoterapia
        { activity: "Asegura la correcta tipificación y compatibilidad de los componentes sanguíneos en caso de necesidad de transfusión.", role: 'tecnico', pillar: 1 },
        { activity: "Implementa protocolos para la recolección y procesamiento de sangre para autotransfusión y recuperación intraoperatoria de células sanguíneas.", role: 'tecnico', pillar: 2 },
        { activity: "Asegura el uso racional de microtubos para la toma de muestras, minimizando la pérdida iatrogénica de sangre.", role: 'tecnico', pillar: 2 },
        { activity: "Participa en la gestión y el almacenamiento adecuado de los componentes sanguíneos y en el seguimiento de su uso.", role: 'tecnico', pillar: 2 },
        { activity: "Participa en el seguimiento de los pacientes transfundidos y en la detección de posibles reacciones adversas.", role: 'tecnico', pillar: 3 }
    ];

    // --- VARIABLES DE ESTADO DEL JUEGO ---
    let currentActivityIndex = 0;
    let score = 0;
    let selectedRole = null;
    let selectedPillar = null;
    let shuffledActivities = [];
    let incorrectAnswers = [];
    let activityAnswered = false;
    let totalActivities = 0;

    // --- ELEMENTOS DEL DOM ---
    const activityTextElement = document.getElementById('activity-text');
    const roleButtonsContainer = document.getElementById('role-buttons');
    const pillarButtonsContainer = document.getElementById('pillar-buttons');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const nextButton = document.getElementById('next-button');
    const resultsArea = document.getElementById('results-area');
    const finalScoreElement = document.getElementById('final-score');
    const totalActivitiesElement = document.getElementById('total-activities');
    const incorrectAnswersList = document.getElementById('incorrect-answers-list');
    const gameContainer = document.querySelector('.game-container'); // Contenedor principal
    const activityArea = document.getElementById('activity-area');
    const selectionArea = document.getElementById('selection-area');
    const feedbackArea = document.getElementById('feedback-area');
    const scoreArea = document.getElementById('score-area');

    // --- FUNCIONES DEL JUEGO ---

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getRoleNameById(roleId) {
        const role = roles.find(r => r.id === roleId);
        return role ? role.name : 'Rol Desconocido';
    }

     function getPillarNameById(pillarId) {
        const pillar = pillars.find(p => p.id === pillarId);
        return pillar ? pillar.name : 'Pilar Desconocido'; // Devuelve "Pilar X"
    }

    function getPillarDescriptionById(pillarId) {
        const pillar = pillars.find(p => p.id === pillarId);
        return pillar ? pillar.description : 'Descripción desconocida';
    }

    function displayActivity() {
        if (currentActivityIndex < shuffledActivities.length) {
            const currentActivity = shuffledActivities[currentActivityIndex];
            activityTextElement.textContent = currentActivity.activity;
            resetSelection();
            feedbackElement.textContent = '';
            feedbackElement.className = ''; // Limpiar clases de estilo
            nextButton.style.display = 'none'; // Ocultar botón "Siguiente"
            enableButtons();
            activityAnswered = false;
        } else {
            showResults(); // Fin del juego
        }
    }

    function createButtons() {
        roleButtonsContainer.innerHTML = ''; // Limpiar por si acaso
        pillarButtonsContainer.innerHTML = '';

        roles.forEach(role => {
            const button = document.createElement('button');
            button.textContent = role.name;
            button.dataset.role = role.id;
            button.classList.add(role.colorClass);
            button.addEventListener('click', handleRoleSelection);
            roleButtonsContainer.appendChild(button);
        });

        pillars.forEach(pillar => {
            const button = document.createElement('button');
            // Mostrar nombre y descripción corta
            button.textContent = `${pillar.name}: ${pillar.description}`;
            button.dataset.pillar = pillar.id;
            button.classList.add(pillar.colorClass);
            button.addEventListener('click', handlePillarSelection);
            pillarButtonsContainer.appendChild(button);
        });
    }

    function handleRoleSelection(event) {
        if (activityAnswered) return; // No hacer nada si ya se respondió

        // Quitar selección previa si existe
        const previouslySelected = roleButtonsContainer.querySelector('.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }

        // Marcar el botón actual como seleccionado
        selectedRole = event.target.dataset.role;
        event.target.classList.add('selected');

        // Si ya se seleccionó un pilar, comprobar respuesta
        if (selectedPillar !== null) {
            checkAnswer();
        }
    }

    function handlePillarSelection(event) {
        if (activityAnswered) return; // No hacer nada si ya se respondió

        // Quitar selección previa si existe
        const previouslySelected = pillarButtonsContainer.querySelector('.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }

        // Marcar el botón actual como seleccionado
        selectedPillar = parseInt(event.target.dataset.pillar); // Convertir a número
        event.target.classList.add('selected');

        // Si ya se seleccionó un rol, comprobar respuesta
        if (selectedRole !== null) {
            checkAnswer();
        }
    }

    function checkAnswer() {
        if (activityAnswered) return; // Evitar múltiples comprobaciones

        activityAnswered = true;
        disableButtons(); // Deshabilitar botones después de responder

        const currentActivity = shuffledActivities[currentActivityIndex];
        const correctRole = currentActivity.role;
        const correctPillar = currentActivity.pillar;

        const isRoleCorrect = selectedRole === correctRole;
        const isPillarCorrect = selectedPillar === correctPillar;

        if (isRoleCorrect && isPillarCorrect) {
            feedbackElement.textContent = '¡CORRECTO!';
            feedbackElement.className = 'correct'; // Clase para estilo verde
            score++;
            scoreElement.textContent = score;
        } else {
            let feedbackMsg = 'INCORRECTO. ';
            const correctRoleName = getRoleNameById(correctRole);
            const correctPillarName = getPillarNameById(correctPillar);
            const selectedRoleName = getRoleNameById(selectedRole);
            const selectedPillarName = getPillarNameById(selectedPillar);

            if (!isRoleCorrect && !isPillarCorrect) {
                feedbackMsg += `Rol "${selectedRoleName}" incorrecto (era "${correctRoleName}") y ${selectedPillarName} incorrecto (era ${correctPillarName}).`;
                feedbackElement.className = 'incorrect'; // Rojo
            } else if (!isRoleCorrect) {
                feedbackMsg += `Rol "${selectedRoleName}" incorrecto (era "${correctRoleName}"). ${correctPillarName} CORRECTO.`;
                feedbackElement.className = 'partial'; // Azul
            } else { // !isPillarCorrect
                feedbackMsg += `Rol "${correctRoleName}" CORRECTO. ${selectedPillarName} incorrecto (era ${correctPillarName}).`;
                feedbackElement.className = 'partial'; // Azul
            }
            feedbackElement.textContent = feedbackMsg;

            // Guardar información del error
            incorrectAnswers.push({
                activity: currentActivity.activity,
                selected: `Rol: ${selectedRoleName}, ${selectedPillarName}`,
                correct: `Rol: ${correctRoleName}, ${correctPillarName}`
            });
        }

        nextButton.style.display = 'inline-block'; // Mostrar botón "Siguiente"
    }

    function resetSelection() {
        selectedRole = null;
        selectedPillar = null;

        const selectedButtons = document.querySelectorAll('.selected');
        selectedButtons.forEach(button => button.classList.remove('selected'));
    }

    function disableButtons() {
        const buttons = document.querySelectorAll('#role-buttons button, #pillar-buttons button');
        buttons.forEach(button => button.disabled = true);
    }

    function enableButtons() {
        const buttons = document.querySelectorAll('#role-buttons button, #pillar-buttons button');
        buttons.forEach(button => button.disabled = false);
    }

    function showResults() {
        // Ocultar áreas del juego
        activityArea.style.display = 'none';
        selectionArea.style.display = 'none';
        feedbackArea.style.display = 'none';
        scoreArea.style.display = 'none';
        nextButton.style.display = 'none';

        // Mostrar área de resultados
        resultsArea.style.display = 'block';
        finalScoreElement.textContent = score;
        totalActivitiesElement.textContent = totalActivities; // Mostrar total

        // Llenar lista de errores
        incorrectAnswersList.innerHTML = ''; // Limpiar lista previa
        if (incorrectAnswers.length === 0) {
            incorrectAnswersList.innerHTML = '<li>¡Felicidades! No tuviste errores.</li>';
        } else {
            incorrectAnswers.forEach(error => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>Actividad:</strong> ${error.activity}<br>
                    <strong>Tu respuesta:</strong> ${error.selected}<br>
                    <strong>Respuesta correcta:</strong> ${error.correct}
                `;
                incorrectAnswersList.appendChild(li);
            });
        }
    }

    function handleNextActivity() {
        currentActivityIndex++;
        displayActivity();
    }

    // --- INICIALIZACIÓN DEL JUEGO ---
    function startGame() {
        shuffledActivities = shuffleArray([...activities]); // Copia y baraja
        totalActivities = shuffledActivities.length; // Guarda el total
        currentActivityIndex = 0;
        score = 0;
        selectedRole = null;
        selectedPillar = null;
        incorrectAnswers = [];
        activityAnswered = false;

        scoreElement.textContent = score; // Resetea marcador visual
        resultsArea.style.display = 'none'; // Oculta resultados si se reinicia
        activityArea.style.display = 'flex'; // Muestra áreas del juego
        selectionArea.style.display = 'flex';
        feedbackArea.style.display = 'block';
        scoreArea.style.display = 'block';


        createButtons(); // Crea los botones de selección
        displayActivity(); // Muestra la primera actividad

        // Asegurarse de que el listener del botón "Siguiente" esté activo
        nextButton.removeEventListener('click', handleNextActivity); // Quitar listener viejo si existe
        nextButton.addEventListener('click', handleNextActivity); // Añadir listener nuevo
    }

    // ¡¡Llamada para iniciar el juego!!
    startGame();

}); // Fin del DOMContentLoaded
