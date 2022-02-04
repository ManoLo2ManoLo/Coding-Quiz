const { AuthenticationError } = require('apollo-server-express');
const { User, Score, Question } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('scores')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        scores: async () => {
            return Score.find()
        },

        questions: async () => {
            return Question.find()
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        addScore: async(parent, args, context) => {
            if (context.user) {
                const score = await Score.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { scores: score._id } },
                    { new: true }
                );

                return score;
            }

            throw new AuthenticationError('Not logged in');
        }
    }
}

module.exports = resolvers;