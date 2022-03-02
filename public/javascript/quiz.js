const quizScreen = document.getElementById("quizScreen");
const submitScreen = document.getElementById("submitScreen");

const scoreEl = document.getElementById("scoreEl");
const finalScoreEl = document.getElementById("finalScoreEl");
const question = document.getElementById("question");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

let currentQuestion = 0;
let questionCounter = 1;
let score = 0;

let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answer1: "Strings", 
        answer2: "Booleans", 
        answer3: "Alerts", 
        answer4: "Numbers",
        correct: "3"
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        answer1: "Quotes", 
        answer2: "Curly Brackets", 
        answer3: "Parenthese", 
        answer4: "Square Brackets",
        correct: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answer1: "Number and Strings", 
        answer2: "Other Arrays", 
        answer3: "Booleans", 
        answer4: "All of the Above",
        correct: "4",
    },
    {
        question: "Strings values must be enclosed within ____ when being assigned to variables.",
        answer1: "Commas",
        answer2: "Curly Brackets",
        answer3: "Quotes",
        answer4: "Parnthese",
        correct: "3",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "Javascript", 
        answer2: "Terminal/Bash", 
        answer3: "For Loops",
        answer4: "Console.log",
        correct: "2",
    }
];

function questionPage() {
    if (questionCounter > 5) {
        submitPage();
    }

    let q = questions[currentQuestion];
    question.innerHTML = q.question;
    answer1.innerHTML = q.answer1;
    answer2.innerHTML = q.answer2;
    answer3.innerHTML = q.answer3;
    answer4.innerHTML = q.answer4;
}

function checkAnswer(answer){
    if (answer === questions[currentQuestion].correct){
        score = score + 20;
        questionCounter++;
        setCounterText();
    } else {
        questionCounter++;
    }

    if (currentQuestion < questionCounter) {
        currentQuestion++;
        questionPage();
    }
}

function setCounterText() {
    scoreEl.textContent =  score;
}

function submitPage() {
    finalScoreEl.innerHTML = score;
    quizScreen.style.display = "none";
    submitScreen.style.display = "block";
}

async function saveScore() {
    const response = await fetch('/api/scores', {
       method: 'post',
       body: JSON.stringify({
           score
       }),
       headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText);
    }
}

window.addEventListener('load', (event) => {
    score = 0;
    scoreEl.innerHTML = score;
    
    index = 0;
    questionCounter = 1;
    questionPage();
});