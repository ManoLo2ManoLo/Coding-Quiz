import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            scores {
                score
                createdAt
            }
        }
    }
`;


export const QUERY_SCORES = gql`
    query scores {
        scores {
            score
            username
            createdAt
        }
    }  
`


export const QUERY_QUESTIONS = gql`
    query questions {
        questions {
            question
            A
            B
            C
            D
            answer
        }
    } 
`