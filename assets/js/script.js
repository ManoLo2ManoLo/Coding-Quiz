// Get references to the #start element
const startBtn = document.querySelector("#start");
const quiz = document.querySelector("#quiz");
const question = document.querySelector("#question");
const choices = document.querySelector("#multipleChoice");
const answerA = document.querySelector("#A");
const answerB = document.querySelector("#B");
const answerC = document.querySelector("#C");
const answerD = document.querySelector("#D");

// Question and Answer List
let questions = [
    {   question: 'Commonly used data types DO NOT include:', 
        answerA: 'A) Strings',
        answerB: 'B) Booleans',
        answerC: 'C) Alerts',
        answerD: 'D) Numbers',
        correctAnswer: 'answerC'},

    {   question: 'The condition in an if/else statement is enclosed within ____.', 
        answerA: 'A) Quotes',
        answerB: 'B) Curly Brackets',
        answerC: 'C) Parenthese',
        answerD: 'D) Square Brackets',
        correctAnswer: 'answerC'},

    {   question: 'A) Arrays in JavaScript can be used to store ____.', 
        answerA: 'B) Number and Strings',
        answerB: 'C) Other Arrays',
        answerC: 'D) Booleans',
        answerD: 'All of the Above',
        correctAnswer: 'answerD' },

    {   question: 'Strings values must be enclosed within ____ when being assigned to variables.',
        answerA: 'A) Commas',
        answerB: 'B) Curly Brackets',
        answerC: 'C) Quotes',
        answerD: 'D) Parnthese',
        correctAnswer: 'answerC' },

    {   question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answerA: 'A) Javascript',
        answerB: 'B) Terminal/Bash',
        answerC: 'C) For Loops',
        answerD: 'D) Console.log',
        correctAnswer: 'answerB' }
];

// Some Variable


// Ask User The question
function askQuestion(){
    
}


// Order of the Functions
function startQuiz() {
    startBtn.style.display = "none";
    askQuestion();
    quiz.style.display = "block";
}

// Add event listener to generate button
startBtn.addEventListener("click", startQuiz);

