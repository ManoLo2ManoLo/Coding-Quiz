import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
            token
        }
    }
`

export const ADD_SERVICE = gql`
    mutation addScore($score: Int!) {
        addScore(score: $score) {
            _id
        }
    }
`