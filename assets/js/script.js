// Button Elements
const startBtn = document.getElementById("start");
const clrBtn = document.getElementById("clrBtn");
const submitBtn = document.getElementById("submitBtn");
const home = document.getElementById("home");

// Screen Change Elements
const intro = document.getElementById("introduction");
const quiz = document.getElementById("quiz");
const hsPage = document.getElementById("hsPage");
const submitEl = document.getElementById("submissionPage");

// Text Replacement to HTML Elements
const highScore = document.getElementById("highScore");
const timerEl = document.getElementById("time")
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choices"));
const scoreEl = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const nameEl = document.getElementById("nameEl");
const hsOutput = document.getElementById("hsOutput");

// Some Variable
let questionCounter = 0;
let currentQuestion = {};
let availableQuestions = [];
let acceptingAnswers = true;
const max_questions = 5;
let score;
let timeLeft;
let userInfo = [];
// Question and Answer List
let questions = [
    {   question: 'Commonly used data types DO NOT include:', 
        choice1: 'A) Strings',
        choice2: 'B) Booleans',
        choice3: 'C) Alerts',
        choice4: 'D) Numbers',
        answer: 3 },
    {   question: 'The condition in an if/else statement is enclosed within ____.', 
        choice1: 'A) Quotes',
        choice2: 'B) Curly Brackets',
        choice3: 'C) Parenthese',
        choice4: 'D) Square Brackets',
        answer: 3 },
    {   question: 'Arrays in JavaScript can be used to store ____.', 
        choice1: 'A) Number and Strings',
        choice2: 'B) Other Arrays',
        choice3: 'C) Booleans',
        choice4: 'D) All of the Above',
        answer: 4 },
    {   question: 'Strings values must be enclosed within ____ when being assigned to variables.',
        choice1: 'A) Commas',
        choice2: 'B) Curly Brackets',
        choice3: 'C) Quotes',
        choice4: 'D) Parnthese',
        answer: 3 },
    {   question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choice1: 'A) Javascript',
        choice2: 'B) Terminal/Bash',
        choice3: 'C) For Loops',
        choice4: 'D) Console.log',
        answer: 2 }
];

// Function for the homepage
function homePage() {
    intro.style.display = "flex"
    quiz.style.display = "none";
    hsPage.style.display = "none";
    timerEl.style.display = "none";
    submitEl.style.display = "none";
}
// Order of the Functions
function startQuiz() {
    questionCounter = 0;
    score = 0;
    intro.style.display = "none";
    availableQuestions = [... questions];
    askQuestion();
    quiz.style.display = "block";
    timerEl.style.display = "block";
    timer();
};

// Function for submit screen footer
function submissionScreen() {
    finalScore.innerText = score;
    intro.style.display = "none";
    quiz.style.display = "none";
    hsPage.style.display = "none";
    timerEl.style.display = "none";
    submitEl.style.display = "flex";
}

// High Score Screen Function
function highscoreScreen() {
    for(let j=0; j < localStorage.length; j++) {
        const key = localStorage.key(j)
        const value = localStorage.getItem(key)
        hsOutput.innerHTML += `${key}: ${value} <br>`;
    }
    intro.style.display = "none";
    quiz.style.display = "none";
    hsPage.style.display = "block";
    timerEl.style.display = "none";
    submitEl.style.display = "none";
}
// Ask User The question
var askQuestion = function(){
    if (questionCounter > 4) {
        clearInterval(timeInterval);
        submissionScreen();
    }
    questionCounter++;
    const questionIndex = questionInOrder();
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    scoreEl.innerText = score;
};
function setCounterText() {
    scoreEl.textContent = score;
}

// Function that will verify the user's answer
// Increases score if they are correct
// Decreases time if they are incorrect
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        var correctAnswer = (questions[questionCounter - 1].answer);
        if ((selectedAnswer === '1' && correctAnswer === 1) || (selectedAnswer === '2' && correctAnswer === 2)
         || (selectedAnswer === '3' && correctAnswer === 3) || (selectedAnswer === '4' && correctAnswer === 4)) {
            score++;
            setCounterText();
        } else {
            timeLeft = timeLeft - 10;
        }
        askQuestion();
    });
});
// Question in Order Function
var questionInOrder = function() {
    for (i = 0; i < 5; i++) {
        return i;
    }
}

// Function that will keep track of time
function timer() {
    timeLeft = 60;
    timeInterval = setInterval(function() {
        if (timeLeft >= 0) { 
            timerEl.innerText = "Time: " + timeLeft;
            timeLeft--
            console.log(timeLeft);
        } else {
            clearInterval(timeInterval);
            submissionScreen();
        }
    }, 1000);
}

// Function if the user submits information to highscore
submitBtn.onclick = function() {
    const name = nameEl.value;
    const fscore = finalScore.textContent;
    if (name) {
        localStorage.setItem(name, fscore);
        highscoreScreen();
    }
}

//Function if the user chooses to clear highscore list
clrBtn.onclick = function() {
    localStorage.clear();
    location.reload();
}

// Add event listener to generate button
startBtn.addEventListener("click", startQuiz);
highScore.addEventListener("click", highscoreScreen);
home.addEventListener("click", homePage);