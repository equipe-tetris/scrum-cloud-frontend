import React from 'react';
import { useHistory } from 'react-router';
import { authService } from '../../services/auth.service';

import './Navbar.css'

import Logo from '../../assets/imagens-projeto/logo-scrumcloud-bg.png';

function Navbar() {

    const isLogged = authService.isAuthenticated();

    const logout = () => {
        authService.logout();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#"><img src={Logo} /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/home/dashboard">Dashboard <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="logout">
                        <a onClick={() => logout} className="nav-link" href="/"><i className="fas fa-user"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
    
}

export default Navbar;