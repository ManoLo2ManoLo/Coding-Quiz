import React from 'react';
import Auth from '../utils/auth';

import { Redirect, useParams } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { QUERY_USER, GET_ME } from '../utils/queries';

function Profile() {
    const { username: userParam } = useParams();

    const { data } = useQuery(userParam ? QUERY_USER : GET_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};
    const username = user?.username;
    const scores = user?.scores
    let attempts = parseInt(user?.scoreCount);

    let average = 0;

    for (let i = 0; i < attempts; i++) {
        let score = scores[i]?.score

        average = average + score;
    }

    average = average / attempts;
    average = Math.round(average) || 0;

    if (!Auth.loggedIn()) {
        return <Redirect to='/' />
    }

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to="/profile" />;
    };

    function showTitle() {
        if (!userParam) {
            return (
                <p className='flow-text center strong white-text'>Hello {username}</p>
            )
        } else {
            return (
                <p className='flow-text center strong white-text'>Welcome to {username}'s page!</p>
            )
        }
    }

    function showAverage() {
        if (!userParam) {
            return (
                <p className="flow-text white-text center"> Your average score is {average}.</p>
            )
        } else {
            return (
                <p className="flow-text white-text center"> Their average score is {average}.</p>
            )
        }
    }

    return (
        <div className='container'>
            <div  className="row">
                <div className='col s10 offset-s1'>
                    <div className="card black">
                        <div className="card-content">
                            {showTitle()}
                            {showAverage()}
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
                                <p className='title white-text'>You recieved a score of {score.score} out of 100.</p>
                                <p className="white-text">On {score.createdAt}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile;