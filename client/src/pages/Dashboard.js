import React from 'react';
import Auth from '../utils/auth';

import { Redirect } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

function Dashboard() {
    const { data } = useQuery(GET_ME);
    const me = data?.me;
    const username = me?.username;
    const scores = me?.scores
    const attempts = scores?.length

    let average = 0;

    for (let i = 0; i < attempts; i++) {
        let score = scores[i]?.score

        average = average + score;
    }

    average = average / attempts;
    average = Math.round(average);

    if (!Auth.loggedIn()) {
        return <Redirect to='/' />
    }

    return (
        <div className='container'>
            <div  className="row">
                <div className='col s10 offset-s1'>
                    <div className="card black">
                        <div className="card-content">
                            <p className='flow-text center strong white-text'>Hello {username}</p>
                            <p className="flow-text white-text center"> Your average score is {average}.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className='col s10 offset-s1'>
                    <ul className="collection black">
                        <li className="collection-item center flow-text white-text black">Score History:</li>
                        {scores?.map((score) => (
                            
                                <li className="collection-item avatar black">
                                    <i className="fas fa-angle-double-right circle white black-text"></i>
                                    <span className="title white-text">On {score.createdAt}</span>
                                    <p className='white-text'>You recieved a score of {score.score} out of 100.</p>
                                </li>
                            
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;