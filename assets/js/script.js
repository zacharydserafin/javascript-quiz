var timerElement = document.getElementById("timer-count");
var startPage = document.getElementById("start-page");
var quizElement = document.getElementById("quiz");
var feedback = document.getElementById("feedback");
var quizComplete = document.getElementById("final-score");
var scoreboard = document.getElementById("scoreboard");
var startButton = document.getElementById("start-button");


var timer;
var timerCount = 75;
var score = 0

var q1 = {
    question: "What is two plus two?",
    correct: "Four",
    incorrect: ["Three", "Five", "Six"],
}

var q2 = {
    question: "What is two minus one?",
    correct: "One",
    incorrect: ["Three", "Four", "Seven"],
}
var q3 = {
    question: "What is five plus five?",
    correct: "Ten",
    incorrect: ["Seven", "Eight", "Nine"],
}
var q4 = {
    question: "What is eight minus three?",
    correct: "Five",
    incorrect: ["Four", "Six", "Seven"],
}

var questions = [q1, q2, q3, q4];
var shuffledQuestions = shuffleArray(questions);
var i = 0;
var selectedQuestion = shuffledQuestions[i++];


function startQuiz() {
    startPage.style.display = "none";
    startTimer();
    renderQuestion(selectedQuestion);
}


function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        // Add conditional logic to detect end of quiz
        if (timerCount === 0) {
            clearInterval(timer);
            // Add end of game function here
        }
    }, 1000)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
function renderQuestion(selection) {
    if (i > shuffledQuestions.length || timerCount === 0) {
    // insert endgame function
    } else {
        var answers = [...selection.incorrect, selection.correct];
        var shuffledAnswers = shuffleArray(answers);
        
        var quizQuestion = document.createElement("h3");
        var quizAnswers = document.createElement("ul");
        var a1 = document.createElement("button");
        var a2 = document.createElement("button");
        var a3 = document.createElement("button");
        var a4 = document.createElement("button");

        quizQuestion.textContent = selection.question;
        a1.textContent = shuffledAnswers[0];
        a2.textContent = shuffledAnswers[1];
        a3.textContent = shuffledAnswers[2];
        a4.textContent = shuffledAnswers[3];

        quizElement.appendChild(quizQuestion);
        quizElement.appendChild(quizAnswers);
        quizAnswers.appendChild(a1);
        quizAnswers.appendChild(a2);
        quizAnswers.appendChild(a3);
        quizAnswers.appendChild(a4);
        
        quizQuestion.classList.add("mt-5", "col-12");
        quizAnswers.classList.add("quiz-answers");
        a1.classList.add("col-12");
        a2.classList.add("col-12");
        a3.classList.add("col-12");
        a4.classList.add("col-12");
    }
}

function answerSelection(event) {
    if (event.target.textContent === selectedQuestion.correct) {
        score = score + 10;

        if (feedback.children[0] === undefined) {
            var goodJob = document.createElement("h4");
            goodJob.textContent = "Correct!"
            feedback.appendChild(goodJob);
            goodJob.classList.add("text-success");
            nextQuestion(quizElement);
        } else if (feedback.children[0].classList.contains("text-danger")) {
            feedback.children[0].remove();
            var goodJob = document.createElement("h4");
            goodJob.textContent = "Correct!"
            feedback.appendChild(goodJob);
            goodJob.classList.add("text-success");
            nextQuestion(quizElement);
        } else if (feedback.children[0].classList.contains("text-success")) {
            nextQuestion(quizElement);
        } 
    } else {
        timerCount = timerCount - 10;

        if (feedback.children[0] === undefined) {
            var notQuite = document.createElement("h4");
            notQuite.textContent = "Incorrect!"
            feedback.appendChild(notQuite);
            notQuite.classList.add("text-danger");
            nextQuestion(quizElement);
        } else if (feedback.children[0].classList.contains("text-success")) {
            feedback.children[0].remove();
            var notQuite = document.createElement("h4");
            notQuite.textContent = "Incorrect!"
            feedback.appendChild(notQuite);
            notQuite.classList.add("text-danger");
            nextQuestion(quizElement);
        } else if (feedback.children[0].classList.contains("text-danger")) {
            nextQuestion(quizElement);
        } 
    }
}

function nextQuestion() {
    if (i >= shuffledQuestions.length) {
        quizElement.replaceChildren();
        endGame();
    } else {
        quizElement.replaceChildren();
        selectedQuestion = shuffledQuestions[i++];
        renderQuestion(selectedQuestion);
    }
}

function endGame() {
    clearInterval(timer);
    score = score + timerCount;

    var gameOver = document.createElement("h3");
    var scoreTeller = document.createElement("p");
    var scoreForm = document.createElement("form");
    var scoreInput = document.createElement("input");
    var scoreButton = document.createElement("button");

    quizComplete.appendChild(gameOver);
    quizComplete.appendChild(scoreTeller);
    quizComplete.appendChild(scoreForm);
    scoreForm.appendChild(scoreInput);
    scoreForm.appendChild(scoreButton);

    gameOver.textContent = "Quiz Complete!";
    scoreTeller.textContent = "Congrats! Your score was " + score + ".";
    scoreInput.setAttribute("placeholder", "Put your initials here!");
    scoreInput.setAttribute("name", "initials");
    scoreButton.setAttribute("type", "submit");
    scoreButton.textContent = "Submit";
    scoreButton.classList.add("ms-2");

    quizComplete.children[2].addEventListener("submit", updateScoreboard);
}

function updateScoreboard(event) {
    event.preventDefault();
    // localStorage.setItem("score", score);
    // localStorage.setItem("initials", event.target.querySelector('input[name="initials"]').value);



}

startButton.addEventListener("click", startQuiz);

quizElement.addEventListener("click", answerSelection);


