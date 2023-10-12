// Question array
const questions = [
  {
    question: "Who invented JavaScript?",
    options: [
      "Guido van Rossum",
      "Dennis Ritchie",
      "Brendan Eich",
      "John Backus",
      "James Gosling",
    ],
    correctAnswer: 2,
  },
  {
    question: "In which year was JavaScript invented?",
    options: ["1972", "1989", "1991", "1995", "2000"],
    correctAnswer: 3,
  },
  {
    question: "For which browser was JavaScript initially developed?",
    options: ["Internet Explorer", "Safari", "Chrome", "Firefox", "Netscape 2"],
    correctAnswer: 4,
  },
  {
    question: "What was the first browser to support ECMAScript 1 (ES1)?",
    options: [
      "Netscape 2",
      "Internet Explorer 4",
      "Firefox 1",
      "Chrome 23",
      "Safari 6",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the latest version of JavaScript developed by Mozilla?",
    options: [
      "JavaScript 1.0",
      "JavaScript 1.3",
      "JavaScript 1.5",
      "JavaScript 1.8.5",
      "JavaScript 2.0",
    ],
    correctAnswer: 3,
  },
  {
    question: "Who is the principal author of Python?",
    options: [
      "Guido van Rossum",
      "Dennis Ritchie",
      "Brendan Eich",
      "John Backus",
      "James Gosling",
    ],
    correctAnswer: 0,
  },
  {
    question: "In which year was Python conceived?",
    options: [
      "Late 1970s",
      "Early 1980s",
      "Late 1980s",
      "Early 1990s",
      "Late 1990s",
    ],
    correctAnswer: 2,
  },
  {
    question: "What was Python named after?",
    options: [
      "A snake species",
      "The inventor's pet",
      "A mathematical term",
      "Monty Python's Flying Circus",
      "An ancient Greek myth",
    ],
    correctAnswer: 3,
  },
  {
    question: "When was Python 2.0 released?",
    options: [
      "October 16, 1996",
      "October 16, 1998",
      "October 16, 2000",
      "October 16, 2002",
      "October 16, 2004",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "When was Python's first major, backwards-incompatible release, Python 3.0, released?",
    options: [
      "December 3, 2006",
      "December 3, 2007",
      "December 3, 2008",
      "December 3, 2009",
      "December 3, 2010",
    ],
    correctAnswer: 2,
  },
  {
    question: "Who developed the C language?",
    options: [
      "Guido van Rossum",
      "Dennis Ritchie",
      "Brendan Eich",
      "John Backus",
      "James Gosling",
    ],
    correctAnswer: 1,
  },
  {
    question: "In which year was the C language developed?",
    options: [
      "Late-1960s",
      "Early-1970s",
      "Late-1970s",
      "Early-1980s",
      "Late-1980s",
    ],
    correctAnswer: 1,
  },
  {
    question: "Where was the C language developed?",
    options: [
      "IBM Labs",
      "Bell Labs",
      "Microsoft Labs",
      "Google Labs",
      "Apple Labs",
    ],
    correctAnswer: 1,
  },
  {
    question: "What was the purpose of developing the C language?",
    options: [
      "To develop web applications.",
      "To develop mobile applications.",
      "To write operating systems for minicomputers.",
      "To develop desktop applications.",
      "To write scripts for automation.",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Which programming language is a successor to the programming language B?",
    options: ["Java", "Python", "JavaScript", "Ruby", "C"],
    correctAnswer: 4,
  },
  {
    question:
      "Who is credited as being the first person to describe or write a computer program?",
    options: [
      "Ada Lovelace",
      "Charles Babbage",
      "Herman Hollerith",
      "Grace Hopper",
      "John Backus",
    ],
    correctAnswer: 0,
  },
  {
    question: "When was the first programming language developed?",
    options: [
      "In the late-1880s",
      "In the early-1900s",
      "In the late-1920s",
      "In the early-1940s",
      "In the late-1960s",
    ],
    correctAnswer: 3,
  },
  {
    question:
      "What was the first high-level programming language to have an associated compiler?",
    options: ["FORTRAN", "LISP", "COBOL", "ALGOL", "A-0"],
    correctAnswer: 0,
  },
  {
    question: "What was the first commercially available language?",
    options: ["FORTRAN", "LISP", "COBOL", "ALGOL", "A-0"],
    correctAnswer: 0,
  },
  {
    question: "What was the first object-oriented programming language?",
    options: ["Simula", "Smalltalk", "C++", "Java", "Python"],
    correctAnswer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let isCheckingAnswer = true;

// HTML elements to questions and answers
const questionElement = document.getElementById("question");
const optionElements = [
  document.getElementById("label0"),
  document.getElementById("label1"),
  document.getElementById("label2"),
  document.getElementById("label3"),
  document.getElementById("label4"),
];
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

// HTML elements to correct answer
const answer = document.getElementById("answer");
const imgBotAnswer = document.getElementById("answer-bot");

// Shuffle the array questions
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Load questions in html
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  for (let i = 0; i < 5; i++) {
    optionElements[i].textContent = question.options[i];
  }
}

// Toggle button text between "Check Answer" and "Next question"
function toggleButtonText() {
  if (isCheckingAnswer) {
    nextButton.textContent = "Check Answer";
  } else {
    nextButton.textContent = "Next question";
  }
}

// Check answers whether they are correct or not
function checkAnswer() {
  if (isCheckingAnswer) {
    const selectedOption = document.querySelector(
      'input[name="option"]:checked'
    );
    if (!selectedOption) return;

    const selectedAnswer = parseInt(selectedOption.value);
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const correctAnswerText =
      questions[currentQuestionIndex].options[correctAnswer];
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
    answer.innerHTML = "";
    imgBotAnswer.src = "/static/answer-bot-200px.png";
    isCheckingAnswer = true;
    toggleButtonText();

    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      // End of the quiz, send the score to the server
      $.ajax({
        type: "POST",
        url: "/save_score",
        data: {
          score: score,
        },
        success: function (data) {
          // Hide quiz elements
          document.getElementById("quiz-container").style.display = "none";
          document.getElementById("next-button").style.display = "none";
          document.getElementById("score").style.display = "none";

          // Display result elements
          document.getElementById("quiz-results").style.display = "block";
          document.getElementById("result-message").textContent =
            "Congratulations!";
          document.getElementById("score-value").textContent = score;
          document.getElementById("saved-successfully").innerHTML = data;
        },
      });
    }

    // Clear selection
    const selectedOption = document.querySelector(
      'input[name="option"]:checked'
    );
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

  // Shuffle questions array
  shuffleQuestions(questions);

  // Load the first question
  loadQuestion();
});

shuffleQuestions(questions);
nextButton.addEventListener("click", checkAnswer);
toggleButtonText(); // Ensure the button starts with "Check Answer"
loadQuestion();
