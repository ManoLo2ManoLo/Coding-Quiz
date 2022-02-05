import React, { useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_QUESTIONS } from '../utils/queries';

function Quiz() {
    const { data } = useQuery(QUERY_QUESTIONS);
    const questions = data?.questions[0]

    let selectedAnswer = 0;

    function checkAnswer(choice) {
        selectedAnswer = choice;
    }

    
   
    useEffect(() => {

        console.log(selectedAnswer)
        

    }, [questions, selectedAnswer])
    
    return (
        <div className='container'>
            <div className="row">
                <div className='col s10 offset-s1'>
                    <div className="row">
                        <p className="center flow-text white-text">{questions?.question}</p>
                    </div>

                    <div className='collection black row '>
                        <button 
                            className='collection-item btn remove-border black-text width100'
                            onClick={() => checkAnswer(questions?.A)}
                        >{questions?.A}</button>

                        <button 
                            className='collection-item btn remove-border black-text width100'
                            onClick={() => checkAnswer(questions?.B)}
                        >{questions?.B}</button>

                        <button 
                            className='collection-item btn remove-border black-text width100'
                            onClick={() => checkAnswer(questions?.C)}
                        >{questions?.C}</button>

                        <button 
                            className='collection-item btn remove-border black-text width100'
                            onClick={() => checkAnswer(questions?.D)}
                        >{questions?.D}</button>
                    </div>

                    <div className='black row'>
                        <p className='remove-border white-text flow-text center'>Score: </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz;