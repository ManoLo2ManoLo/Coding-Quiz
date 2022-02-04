const { Schema, model } = require('mongoose');

const scoreSchema = new Schema(
    {
        score: {
            type: Number,
            required: true,
            enum: [0, 20, 40, 60, 80, 100]
        },

        username: {
            type: String,
            required: true,
        }   
    }
)

const Score = model('Score', scoreSchema);

module.exports = Score;