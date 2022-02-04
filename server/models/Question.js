const { Schema, model } = require('mongoose');

const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true
        },

        A: {
            type: String,
            required: true,
            trim: true
        },

        B: {
            type: String,
            required: true,
            trim: true
        },

        C: {
            type: String,
            required: true,
            trim: true
        },

        D: {
            type: String,
            required: true,
            trim: true
        },

        answer: {
            type: String,
            required: true,
            trim: true
        },
        
    }
)

const Question = model('Question', questionSchema);

module.exports = Question;