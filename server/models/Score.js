const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)

const Score = model('Score', scoreSchema);

module.exports = Score;