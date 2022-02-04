const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// create the user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: 4,
            maxlength: 16
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 24
        },

        scores: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Score'
            }
        ]
    }, 
    {
        toJSON: {
            virtuals: true
        }
    }
);

// bcrypt the password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// verify the password is correct
userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.virtual('scoreCount').get(function() {
    return this.scores.length;
});

// create the user model
const User = model('User', userSchema);

module.exports = User;