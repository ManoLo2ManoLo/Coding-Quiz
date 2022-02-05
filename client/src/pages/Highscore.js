import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_SCORES } from '../utils/queries';

function Highscore() {
    const {  data } = useQuery(QUERY_SCORES);
    const scores = data?.scores;

    return (
        <div className='container'>
            <div className="row">
                <div className='col s10 offset-s1'>
                    <ul className="collection black">
                        <li className="collection-item center flow-text white-text black">Highscore:</li>
                        {scores?.map((score) => (
                            <li className="collection-item avatar black">
                                <i className="fas fa-angle-double-right circle white black-text"></i>
                                <p className='title white-text'><span><a className='teal-text' href={`/profile/${score.username}`}>{score.username}</a></span> recieved</p>
                                <p className='white-text'>a score of {score.score} out of 100.</p>
                                <p className='white-text'>on {score.createdAt}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Highscore;