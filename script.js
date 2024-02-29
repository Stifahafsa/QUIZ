const questions = [
    {
        question1: "Quelle est la capitale de la France ?",
        answers1: ["Londres", "Paris", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Qui a peint la Joconde ?",
        answers: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michel-Ange"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "Quelle est la planète la plus proche du Soleil ?",
        answers: ["Mars", "Vénus", "Jupiter", "Mercure"],
        correctAnswer: "Mercure"
    },
    {
        question: "Qui a écrit 'Les Misérables' ?",
        answers: ["Victor Hugo", "Émile Zola", "Gustave Flaubert", "Honoré de Balzac"],
        correctAnswer: "Victor Hugo"
    },
    {
        question: "Quel est l'animal le plus rapide sur terre ?",
        answers: ["Guépard", "Lion", "Éléphant", "Rhinocéros"],
        correctAnswer: "Guépard"
    },
    {
        question: "Quel est l'organe principal du système respiratoire  ?",
        answers: ["Cœur", "Poumons", "Rein", "Foie"],
        correctAnswer: "Poumons"
    },
    {
        question: "Combien de continents y a-t-il sur Terre ?",
        answers: [6, 7, 8, 5],
        correctAnswer: 7
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        answers: ["Océan Atlantique", "Océan Indien", "Océan Pacifique", "Océan Arctique"],
        correctAnswer: "Océan Pacifique"
    },
    {
        question: "Qui a écrit la pièce de théâtre Roméo et Juliette ?",
        answers: ["William Shakespeare", "Molière", "Victor Hugo", "George Bernard Shaw"],
        correctAnswer: "William Shakespeare"
    },
    {
      question: "Quel est le symbole chimique du fer ?",
      answers: ["Fe", "Ir", "Au","Hg"],
      correctAnswer: "Fe"
  },
  {
    question: "Quel est l'animal national de l'Australie ?",
    answers: ["Koala", "Kangourou", "Émeu", "Wombat"],
    correctAnswer: "Kangourou"
},


    
  ];
  
  let currentQuestionIndex = 0;
let score = 0;
let time = 40; // Temps en secondes

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const resultElement = document.getElementById("result");
const scoreDisplayElement = document.getElementById("scoreDisplay");
const percentageDisplayElement = document.getElementById("percentageDisplay");

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("btn", "btn-light", "mr-2");
        button.addEventListener("click", () => {
            if (answer === currentQuestion.correctAnswer) {
                score++;
                scoreElement.textContent = `Score: ${score}`;
            }
            clearInterval(timerInterval); // Arrêter le minuteur après la réponse
            nextQuestion(); // Passer à la question suivante
        });
        answersElement.appendChild(button);
    });
    startTimer(); // Démarrer le minuteur pour la question actuelle
    nextButton.style.display = "none"; // Masquer le bouton "Start"
  }

function startTimer() {
    time = 40; // Réinitialiser le temps à 60 secondes
    timeElement.textContent = `Temps restant: ${time} s`;
    timerInterval = setInterval(() => {
        time--;
        timeElement.textContent = `Temps restant: ${time} s`;
        if (time <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    stopTimer(); // Arrêter le minuteur
    const percentage = (score / questions.length) * 100;
    scoreDisplayElement.textContent = `Score: ${score}`;
    percentageDisplayElement.textContent = `Percentage: ${percentage.toFixed(2)}%`;
    resultElement.style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    time = 0;
    scoreElement.textContent = `Score: ${score}`;
    timeElement.textContent = `Temps restant: ${time} s`;
    nextButton.style.display = "none";
    questionElement.style.display = "none"; // Masquer la question
    answersElement.style.display = "none"; // Masquer les réponses

}

function stopTimer() {
    clearInterval(timerInterval);
}

document.getElementById("nextButton").addEventListener("click", () => {
    nextQuestion();
});

showQuestion();