// index.html
// * Pseudo code
// - Define the questions and the choices and the answers, put it in a variable in questions.js file

// - Timer -> add click event listener to "start quiz" button and trigger the timer

// - Display first question
//      add click event listener to "start quiz" button
//      display the first question based on the questions that we have defined
//      hide the start screen
//      show questions screen and populate it with questions and the choices
// - Add click event listener to the choices div and check if the choice button is clicked
//      Check if the answer is correct
//          if its correct
//              display "correct answer" in feedback div
//              hide feedback div then display next question
//          if incorrect
//              subtract the timer
//              display "wrong answer" in feedback div
//              check the timer,
//                  if timer > 0. hide feedback div then display next question
//                  if timer <= 0, hide feedback div then go display "end-screen" screen and hide question screen
// continue.....

// highscores.html
// - Retrieve highscores from local storage
// - sort the scores from higher score to lower score
// - Display the highscores as a list
// - When the user click on "Clear Highscores", clear local storage

// How to use audio file
// const correctAudio = new Audio('./assets/sfx/correct.wav');
// const incorrectAudio = new Audio('./assets/sfx/incorrect.wav');

// Example to play the audio when start button is clicked
// document.getElementById('start').addEventListener('click', function() {
//     incorrectAudio.play();
// });



// Define the questions, choices, and answers
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed within _______ .",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        question: "Arrays in JavaScript can be used to store _______ .",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal /bash", "for loops", "console.log"],
        answer: "console.log",
    },
];

// import questions from "./questions.js"; // doesn't work because we didn't learn yet how to use node

// Elements
const startButton = document.getElementById("start");
const timeElement = document.getElementById("time");
const questionTitleElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const endScreenElement = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");

// Audio
const correctAudio = new Audio("./assets/sfx/correct.wav");
const incorrectAudio = new Audio("./assets/sfx/incorrect.wav");

// Variables
let currentQuestionIndex = 0;
let time = 75; // Initial time in seconds

// Timer function
function startTimer() {
    const timerInterval = setInterval(function () {
        time--;
        timeElement.textContent = time;

        if (time <= 0 || currentQuestionIndex === questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        };
    }, 1000);
};

// Function to display question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitleElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = `${index + 1}. ${choice}`;
        choiceButton.addEventListener("click", () => checkAnswer(choice));
        choicesElement.appendChild(choiceButton);
    });
};

// Function to check answers
function checkAnswer(choice) {
    const currentQuestion = questions[currentQuestionIndex];

    if (choice === currentQuestion.answer) {
        feedbackElement.textContent = "Correct!";
        correctAudio.play();
    } else {
        feedbackElement.textContent = "Wrong! -10 seconds";
        time -= 10;
        incorrectAudio.play();
    };

    feedbackElement.classList.remove("hide");
    setTimeout(() => {
        feedbackElement.classList.add("hide");
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        }
    }, 1000);
};

// Function to end the quiz
function endQuiz() {
    choicesElement.innerHTML = '';
    const questionElement = document.getElementById('questions');
    questionElement.classList.add('hide');
    endScreenElement.classList.remove('hide');
    finalScoreElement.textContent = time;
};

// Function to start the quiz
function startQuiz() {
    startButton.parentElement.classList.add('hide');
    document.getElementById("questions").classList.remove('hide'); 
    startTimer();
    displayQuestion();
}

// Event listener for start button
startButton.addEventListener('click', startQuiz);

// Event listener for submit button
submitButton.addEventListener("click", function () {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        // Save initials and score to local storage
        const scoreData = {
            initials: initials,
            score: time,
        };

        // Retrieve existing highscores or initialize an empty array
        const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

        // Add the new score data
        highscores.push(scoreData);

        // Save the updated highscores to local storage
        localStorage.setItem("highscores", JSON.stringify(highscores));

        // Redirect or do any additional action as needed
        console.log("Score saved:", scoreData);
    }

    window.location.href = 'highscores.html';
});

