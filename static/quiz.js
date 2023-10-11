// Question array
const questions = [
    {
        question: "What programming language do you think is the most popular in 2023?",
        options: ["Python", "JavaScript", "Java", "C++", "COBOL"],
        correctAnswer: 1
    },
    {
        question: "What is the symbol for comments in JavaScript?",
        options: ["//", "/*", "#", "--", "/#"],
        correctAnswer: 0
    },
    {
        question: "The C language was developed at Bell Laboratories by Dennis Ritchie during:",
        options: ["50's", "60's", "80's", "70's", "90's"],
        correctAnswer: 3
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionElements = [
    document.getElementById("label0"),
    document.getElementById("label1"),
    document.getElementById("label2"),
    document.getElementById("label3"),
    document.getElementById("label4")
];
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
let isCheckingAnswer = true;
const answer = document.getElementById("answer");
const imgBotAnswer = document.getElementById("answer-bot")

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    for (let i = 0; i < 5; i++) {
        optionElements[i].textContent = question.options[i];
    }
}

function toggleButtonText() {
    if (isCheckingAnswer) {
        nextButton.textContent = "Check Answer";
    } else {
        nextButton.textContent = "Next question";
    }
}

function checkAnswer() {
    if (isCheckingAnswer) {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) return;

        const selectedAnswer = parseInt(selectedOption.value);
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        const correctAnswerText = questions[currentQuestionIndex].options[correctAnswer];
        if (selectedAnswer === correctAnswer) {
            // Show that the answer is correct
            score++;
            scoreElement.textContent = `Score: ${score}`;
            answer.innerText = "Correct answer";
            answer.style.color = "green";
            imgBotAnswer.src = "/static/answer-correct-bot-200px.png";
        } else {
            // Show that the answer is incorrect
            answer.innerText = `Wrong answer! The correct answer is "${correctAnswerText}"`;
            answer.style.color = "red";
            imgBotAnswer.src = "/static/answer-wrong-bot-200px.png";
        }

        // Change the button text to "Next Question"
        isCheckingAnswer = false;
        toggleButtonText();
    } else {
        // Next question
        currentQuestionIndex++;
        questionElement.style.backgroundColor = "";
        answer.innerHTML = ""
        imgBotAnswer.src = "/static/answer-bot-200px.png";
        isCheckingAnswer = true;
        toggleButtonText();

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            // End of the quiz, send the score to the server here
            // Hide quiz elements
            document.getElementById("quiz-container").style.display = "none";
            document.getElementById("next-button").style.display = "none";
            document.getElementById("score").style.display = "none";

            // Display result elements
            document.getElementById("quiz-results").style.display = "block";
            document.getElementById("result-message").textContent = "Congratulations!";
            document.getElementById("score-value").textContent = score;
        }

        // Clear selection
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            selectedOption.checked = false;
        }
    }
}

// Add an event listener to the "Restart quiz" button
const restartButton = document.getElementById("restart-quiz");
restartButton.addEventListener("click", function () {
    // Reset quiz control variables
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;

    // Hide result elements
    document.getElementById("quiz-results").style.display = "none";

    // Display quiz elements
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("next-button").style.display = "block";
    document.getElementById("score").style.display = "block";

    // Load the first question
    loadQuestion();
});

nextButton.addEventListener("click", checkAnswer);
toggleButtonText(); // Ensure the button starts with "Check Answer"
loadQuestion();
