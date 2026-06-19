const questions = [
    // --- INDIA QUESTIONS ---
    {
        question: "In which year did India gain Independence from British rule?",
        answers: [
            { text: "1945", correct: false },
            { text: "1947", correct: true },
            { text: "1950", correct: false },
            { text: "1952", correct: false }
        ]
    },
    {
        question: "Which Indian city is globally recognized as the 'Silicon Valley of India'?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "Hyderabad", correct: false },
            { text: "Bengaluru", correct: true },
            { text: "Pune", correct: false }
        ]
    },
    {
        question: "Who is fondly remembered as the 'Father of the Indian Constitution'?",
        answers: [
            { text: "Mahatma Gandhi", correct: false },
            { text: "Dr. B.R. Ambedkar", correct: true },
            { text: "Jawaharlal Nehru", correct: false },
            { text: "Netaji Subhas Chandra Bose", correct: false }
        ]
    },
    {
        question: "What is the national heritage animal of India?",
        answers: [
            { text: "Royal Bengal Tiger", correct: false },
            { text: "Indian Elephant", correct: true },
            { text: "One-horned Rhinoceros", correct: false },
            { text: "Asiatic Lion", correct: false }
        ]
    },
    // --- BIT SINDRI QUESTIONS ---
    {
        question: "In what year was BIT Sindri originally established?",
        answers: [
            { text: "1947", correct: false },
            { text: "1949", correct: true },
            { text: "1952", correct: false },
            { text: "1955", correct: false }
        ]
    },
    {
        question: "Who served as the revered first Director of BIT Sindri?",
        answers: [
            { text: "Dr. D.L. Deshpande", correct: true },
            { text: "Dr. Rajendra Prasad", correct: false },
            { text: "Prof. S. Prasad", correct: false },
            { text: "Dr. B.R. Seth", correct: false }
        ]
    },
    {
        question: "Before the year 2000, what did the letter 'B' in BIT Sindri stand for?",
        answers: [
            { text: "Birsa", correct: false },
            { text: "Bharat", correct: false },
            { text: "Bihar", correct: true },
            { text: "Bengal", correct: false }
        ]
    },
    {
        question: "BIT Sindri's expansive campus is situated near the banks of which river?",
        answers: [
            { text: "Damodar River", correct: true },
            { text: "Subarnarekha River", correct: false },
            { text: "Barakar River", correct: false },
            { text: "Koel River", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const quizScreen = document.getElementById("quiz-screen");
const scoreScreen = document.getElementById("score-screen");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizScreen.classList.remove("hidden");
    scoreScreen.classList.add("hidden");
    nextButton.classList.add("hidden");
    progressText.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    
    // Update question progress tracker
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    // Reveal correct answers and lock input
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    quizScreen.classList.add("hidden");
    progressText.classList.add("hidden");
    scoreScreen.classList.remove("hidden");
    scoreElement.innerText = score;
    totalElement.innerText = questions.length;
}

restartButton.addEventListener("click", startQuiz);

// Initialize application
startQuiz();