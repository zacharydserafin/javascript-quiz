var timerElement = document.getElementById("timer-count");
var startPage = document.getElementById("start-page");
var quizElement = document.getElementById("quiz");
var feedback = document.getElementById("feedback");
var quizComplete = document.getElementById("final-score");
var scoreboard = document.getElementById("scoreboard");
var startButton = document.getElementById("start-button");
var scoreboardButton = document.getElementById("highscore-button");


var timer;
var timerCount = 75;
var score = 0
 

var q1 = {
    question: "Inside which HTML element do we put our JavaScript?",
    correct: "<script>",
    incorrect: ["<javascript>", "<scripting>", "<js>"],
}
var q2 = {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    correct: '<script src="xxx.js"',
    incorrect: ['<script name="xxx.js">', '<script href="xxx.js">', '<script rel="xxx.js">'],
}
var q3 = {
    question: "How do you create a function in Javascript?",
    correct: "function myFunction()",
    incorrect: ["function:myFunction()", "function = myFunction()", "function, myFunction()"],
}
var q4 = {
    question: "How do you write an IF statement in JavaScript?",
    correct: "if (i === 5)",
    incorrect: ["if i = 5", "if i = 5 then", "if i === 5 then"],
}
var q5 = {
    question: "How does a FOR loop start?",
    correct: "for (i = 0; i <= 5; i++)",
    incorrect: ["for i = 1 to 5", "for (i <= 5; i++)", "for (i = 0; i <= 5)"],
}

var questions = [q1, q2, q3, q4, q5];
var shuffledQuestions = shuffleArray(questions);
var i = 0;
var selectedQuestion = shuffledQuestions[i++];
var highScore = questions.length * 10;


function startQuiz() {
    startPage.style.display = "none";
    scoreboardButton.style.display = "none";
    startTimer();
    renderQuestion(selectedQuestion);
}


function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            quizElement.replaceChildren();
            endGame();
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
    
    quizQuestion.classList.add("mt-2", "col-12");
    quizAnswers.classList.add("quiz-answers");
    a1.classList.add("col-12", "fs-5");
    a2.classList.add("col-12", "fs-5");
    a3.classList.add("col-12", "fs-5");
    a4.classList.add("col-12", "fs-5");
}

function answerSelection(event) {
    if (event.target.textContent === selectedQuestion.correct) {
        score = score + 10;

        if (feedback.children[0] === undefined) {
            var goodJob = document.createElement("h2");
            goodJob.textContent = "Correct!"
            feedback.appendChild(goodJob);
            goodJob.classList.add("text-success");
            nextQuestion(quizElement);
        } else if (feedback.children[0].classList.contains("text-danger")) {
            feedback.children[0].remove();
            var goodJob = document.createElement("h2");
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
            var notQuite = document.createElement("h2");
            notQuite.textContent = "Incorrect!"
            feedback.appendChild(notQuite);
            notQuite.classList.add("text-danger");
            nextQuestion(quizElement);
        } else if (feedback.children[0].classList.contains("text-success")) {
            feedback.children[0].remove();
            var notQuite = document.createElement("h2");
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
    if (i >= shuffledQuestions.length || timerCount <= 0) {
        quizElement.replaceChildren();
        endGame();
    } else {
        quizElement.replaceChildren();
        selectedQuestion = shuffledQuestions[i++];
        renderQuestion(selectedQuestion);
    }
}

function endGame() {
    feedback.replaceChildren();
    clearInterval(timer);
    timerElement.textContent = timerCount;

    if (score >= highScore * 0.8) {
    score = score + timerCount;
    }

    if (timerCount < 0) {
        timerElement.textContent = 0;
    }

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
    scoreTeller.textContent = "Your score was " + score + ".";
    scoreInput.setAttribute("placeholder", "Put your initials here!");
    scoreInput.setAttribute("name", "initials");
    scoreButton.setAttribute("type", "submit");
    scoreButton.textContent = "Submit";
    scoreButton.classList.add("ms-2");

    quizComplete.children[2].addEventListener("submit", updateScoreboard);
}

function updateScoreboard(event) {
    event.preventDefault();
    
    var initials = event.target.querySelector('input[name="initials"]').value;
    initials = initials.toUpperCase().trim();

    if (initials === "") {
        return 
    }
    
    var scoreList = JSON.parse(localStorage.getItem("scoreList") || "[]");
    var scoreListItem = {
        userInitials: initials,
        userScore: score
    };
    scoreList.push(scoreListItem);
    scoreList.sort(function (a, b) {return b.userScore - a.userScore});
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    scoreList = JSON.parse(localStorage.getItem("scoreList"));
    renderScoreboard(scoreList);
}

function renderScoreboard(scoreList) {
    quizComplete.replaceChildren();
    startPage.style.display = "none";

    var leaderboardTitle = document.createElement("h3");
    var leaderboardList = document.createElement("ul");
    scoreboard.appendChild(leaderboardTitle);
    scoreboard.appendChild(leaderboardList);
    leaderboardTitle.textContent = "High Scores"
    leaderboardList.classList.add("list-group");

    for (var index = 0; index < Math.min(scoreList.length, 10); index++) {
        var scoreLi = scoreList[index];
        var li = document.createElement("li");
        li.textContent = "";
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        var initialsSpan = document.createElement("span");
        initialsSpan.textContent = scoreLi.userInitials;
        li.appendChild(initialsSpan);
        
        
        var scoreSpan = document.createElement("span");
        scoreSpan.textContent = scoreLi.userScore;
        li.appendChild(scoreSpan);
        scoreSpan.classList.add("badge", "bg-primary", "rounded-pill")

        leaderboardList.appendChild(li);
    }

    var buttons = document.createElement("div");
    var returnButton = document.createElement("button");
    var clearButton = document.createElement("button");
    scoreboard.appendChild(buttons);
    buttons.appendChild(returnButton);
    buttons.appendChild(clearButton);
    returnButton.textContent = "Retake Quiz";
    clearButton.textContent = "Clear Scores";
    buttons.classList.add("container", "mt-3");
    returnButton.classList.add("btn", "btn-primary", "me-5");
    clearButton.classList.add("btn", "btn-primary", "ms-5");

    returnButton.addEventListener("click", function() {
        scoreboard.replaceChildren();
        score = 0;
        timer;
        timerCount = 75;
        timerElement.textContent = 75;
        questions = [q1, q2, q3, q4, q5];
        shuffledQuestions = shuffleArray(questions);
        i = 0;
        selectedQuestion = shuffledQuestions[i++];
        startPage.style.display = "block"
        scoreboardButton.style.display = "block";
    });

    clearButton.addEventListener("click", function() {
        localStorage.setItem("scoreList", "");
        scoreboard.replaceChildren();
        renderScoreboard([]);
    })
}

startButton.addEventListener("click", startQuiz);

quizElement.addEventListener("click", answerSelection);

scoreboardButton.addEventListener("click", function() {
    var scoreListString = localStorage.getItem("scoreList");
    if (scoreListString && scoreListString.trim()) {
        var scoreList = JSON.parse(scoreListString);
        scoreboardButton.style.display = "none";
        renderScoreboard(scoreList);
    } else {
        window.alert("No Scores Available");
    }
});


