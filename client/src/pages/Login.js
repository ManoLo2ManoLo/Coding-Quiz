import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';

function Login() {
    const [ formState, setFormState ] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER); 

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    }

    const handleFormSubmit = async (event) =>{
        event.preventDefault();

        try {
            const mutationResponse = await login({
                variables: { username: formState.username, password: formState.password}
            })
            
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col s10 offset-s1">
                    <form className="card black darken-4" onSubmit={handleFormSubmit}>
                        <div className="card-content white-text">
                            <span className="card-title center">Login</span>
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
                                {error ? (
                                    <p className="helper-text white-text center">The username or password is incorrect.</p>
                                ): null}
                            </div>
                        </div>

                        <div className='row'>
                            <div className="input-field col s10 offset-s1 center">
                                <button type='submit' className="btn-floating btn-large cyan pulse"><i className="fas fa-sign-in-alt"></i></button>
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className="card-action col s10 offset-s1">
                                <p className='right-align white-text'>Dont have one? <a href="/signup" className='cyan-text'>Create One!</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;