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

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('scores')
        },

        scores: async () => {
            const score = await Score.find()
                .limit(10)

            score.sort((a,b) => b.score - a.score)

            return score;
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

        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

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