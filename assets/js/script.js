// Get references to the #start element
const startBtn = document.getElementById("start");
const home = document.getElementById("home");
const intro = document.getElementById("introduction");
const highScore = document.getElementById("highScore");
const hsPage = document.getElementById("hsPage");
const timerEl = document.getElementById("time")
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choices"));

// Some Variable
let questionCounter = 0;
let currentQuestion = {};
let availableQuestions = [];
let acceptingAnswers = true;
const max_questions = 5;

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

function homePage() {
    intro.style.display = "flex"
    quiz.style.display = "none";
    hsPage.style.display = "none";
}

// Order of the Functions
function startQuiz() {
    questionCounter = 0;
    intro.style.display = "none";
    availableQuestions = [... questions];
    askQuestion();
    quiz.style.display = "block";
    timer();
};

// High Score Screen Function
function highscoreScreen() {
    intro.style.display = "none";
    quiz.style.display = "none";
    hsPage.style.display = "flex";
}

// Ask User The question
var askQuestion = function(){
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
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        askQuestion();
    });
});

// Question in Order Function
var questionInOrder = function() {
    for (i = 0; i < 5; i++) {
        if (i > 3) {
            highscorePage();
        } else {
            return i;
        }
    }
}

// Function for a timer
function timer() {
    var timeLeft = 60;

    var timeInterval = setInterval(function() {
        if (timeLeft >= 0) { 
            timerEl.innerText = timeLeft;
            timeLeft--
        } else {
            clearInterval(timeInterval);
        }
    }, 1000);
}

// Add event listener to generate button
startBtn.addEventListener("click", startQuiz);
highScore.addEventListener("click", highscoreScreen)
home.addEventListener("click", homePage)

