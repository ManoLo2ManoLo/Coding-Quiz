import React, { useState } from 'react';
import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'

function Signup() {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (formState.username && formState.password ) {
            const mutationResponse = await addUser({
                variables: {
                    username: formState.username,
                    password: formState.password,
                }
            });

            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col s10 offset-s1">
                    <form className="card black darken-4"  onSubmit={handleFormSubmit}>
                        <div className="card-content white-text">
                            <span className="card-title center">Signup</span>
                        </div>

                        <div className="row">
                            <div className="input-field col s10 offset-s1">
                                <label className="active white-text" htmlFor="username">Username</label>
                                <input  id="username" name='username' type="text" className="white-text" onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s10 offset-s1">
                                <label className="active white-text" htmlFor="password">Password</label>
                                <input  id="password" name='password' type="password" className="validate white-text" onChange={handleChange}/>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="input-field col s10 offset-s1 center">
                                <button type="submit" className="btn-floating btn-large cyan pulse"><i className="fas fa-user-plus"></i></button>
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className="card-action col s10 offset-s1">
                                <p className='right-align white-text'>Have an account? <a href="/login" className='cyan-text'>Log in!</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;