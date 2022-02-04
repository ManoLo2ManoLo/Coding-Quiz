import React from 'react';
import Auth from '../utils/auth';

function Nav() {
    
    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="tabs tabs-transparent">
                    <li class="tab right"><a href="/logout">Logout</a></li>
                    <li class="tab right"><a href="/dashboard">Dashboard</a></li>
                    <li className="tab right"><a href="/highscore">View Highscores</a></li>
                </ul>
            )
        } else {
            return (
                <ul className="tabs tabs-transparent">
                    <li className="tab right"><a href="/logout">Sign Up</a></li>
                    <li className="tab right"><a href="/dashboard">Log In</a></li>
                    <li className="tab right"><a href="/highscore">View Highscores</a></li>
                </ul>
            )
        }
    }

    return (
        <nav className="nav-extended blue-grey darken-4">
            <div className="nav-content">
                {showNavigation()}
            </div>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo center">Coding Quiz</a>
            </div>
        </nav>
    )
}

export default Nav;