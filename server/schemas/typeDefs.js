const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        scoreCount: Int
        scores: [Score]
    }

    type Score {
        score: Int,
        username: String
        createdAt: String
    }

    type Question {
        question: String,
        A: String,
        B: String,
        C: String,
        D: String,
        answer: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        me: User
        user(username: String!): User
        scores: [Score]
        questions: [Question]
    }

    type Mutation {
        addUser(username: String!, password: String!) : Auth
        login(username: String!, password: String!) : Auth
        addScore(score: Int!) : Score
    }
`

module.exports = typeDefs;