import React from 'react';

function Home() {
    return (
        <div className='container'>
            <div className="row">
                <div className="col s10 offset-s1">
                    <div className="card z-depth-5">
                        <div className="card-content">
                            <p className='flow-text center strong'>Welcome to the Coding Quiz Challenge</p>
                            <p className="flow-text">Try to answer the following code-related questions within the time limit. 
                                Keep in mind that incorrect answers will penalize your scoretime by ten seconds!
                            </p>
                        </div>
                        <div className="card-action center">
                            <button className='btn blue-grey darken-4'>Start Quiz</button>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default Home;