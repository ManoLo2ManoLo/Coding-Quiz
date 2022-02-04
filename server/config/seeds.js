const db = require('./connection');
const { Question } = require('../models');

db.once('open', async () => {
    await Question.deleteMany();

    await Question.insertMany([
        {   
            question: 'Commonly used data types DO NOT include:', 
            A: 'Strings',
            B: 'Booleans',
            C: 'Alerts',
            D: 'Numbers',
            answer: 'Alerts' 
        },

        {   
            question: 'The condition in an if/else statement is enclosed within ____.', 
            A: 'Quotes',
            B: 'Curly Brackets',
            C: 'Parenthese',
            D: 'Square Brackets',
            answer: 'Parenthese' 
        },

        {   
            question: 'Arrays in JavaScript can be used to store ____.', 
            A: 'Number and Strings',
            B: 'Other Arrays',
            C: 'Booleans',
            D: 'All of the Above',
            answer: 'All of the Above' 
        },

        {   
            question: 'Strings values must be enclosed within ____ when being assigned to variables.',
            A: 'Commas',
            B: 'Curly Brackets',
            C: 'Quotes',
            D: 'Parnthese',
            answer: 'Quotes' 
        },

        {   
            question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
            A: 'Javascript',
            B: 'Terminal/Bash',
            C: 'For Loops',
            D: 'Console.log',
            answer: 'Terminal/Bash' 
        }
    ]);

    console.log('questions seeded');

    process.exit();
})