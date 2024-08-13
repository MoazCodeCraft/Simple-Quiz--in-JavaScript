const questions = [
    {
        question: "Which is the largest animal on the Earth",
        answers: [
            { text: "Shark", correct: false },
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Lion", correct: false }
        ]
    },
    {
        question: "Which is the fastest animal on the Earth",
        answers: [
            { text: "Shark", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Blue Whale", correct: false },
            { text: "Lion", correct: false }
        ]
    },
    {
        question: "Which is the National animal of Pakistan",
        answers: [
            { text: "Shark", correct: false },
            { text: "Markhore", correct: true },
            { text: "Blue Whale", correct: false },
            { text: "Lion", correct: false }
        ]
    },
    {
        question: "Which is the national animal of Austria",
        answers: [
            { text: "Kangaroo", correct: true },
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: false },
            { text: "Lion", correct: false }
        ]
    },
    {
        question: "Which is the cleverest animal on the Earth",
        answers: [
            { text: "Shark", correct: false },
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: false },
            { text: "Fox", correct: true }
        ]
    },
    {
        question: "Which animal has the longest neck on the Earth",
        answers: [
            { text: "Giraffe", correct: true },
            { text: "Lion", correct: false },
            { text: "Zebra", correct: false },
            { text: "Elephant", correct: false }
        ]
    }
];

let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let next = document.getElementById("next-Btn");
let currentQuestionIdx = 0;
let score = 0;

function startQuiz() {
    currentQuestionIdx = 0;
    score = 0;
    next.innerHTML = "Next";
    next.style.display = "none"; 
    showQuestion();
    next.removeEventListener("click", startQuiz);
    next.addEventListener("click", handleNextButton);
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIdx];
    let questionNo = currentQuestionIdx + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    next.style.display = "none"; 
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; 
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    next.style.display = "block"; 
}

function handleNextButton() {
    currentQuestionIdx++;
    if (currentQuestionIdx < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    next.innerHTML = "Start Again";
    next.style.display = "block";

    
    next.removeEventListener("click", handleNextButton);
    next.addEventListener("click", startQuiz); 
}

startQuiz();
