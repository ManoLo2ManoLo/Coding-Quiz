import React from 'react';
import Auth from '../utils/auth';

function Nav() {
    
    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="tabs tabs-transparent">
                    <li className="tab right"><a href="/" onClick={() => Auth.logout()}>Logout</a></li>
                    <li className="tab right"><a href="/dashboard">Dashboard</a></li>
                    <li className="tab right"><a href="/highscore">View Highscores</a></li>
                </ul>
            )
        } else {
            return (
                <ul className="tabs tabs-transparent">
                    <li className="tab right"><a href="/signup">Sign Up</a></li>
                    <li className="tab right"><a href="/login">Log In</a></li>
                    <li className="tab right"><a href="/highscore">View Highscores</a></li>
                </ul>
            )
        }
    }

    return (
        <nav className="nav-extended black">
            <div className="nav-content">
                {showNavigation()}
            </div>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo center">Coding Quiz</a>
            </div>
            <div className="progress cyan">
                <div className="indeterminate white"></div>
            </div>
        </nav>
    )
}

export default Nav;