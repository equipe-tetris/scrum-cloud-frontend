import React from 'react';
import './Login.css';

import Logo from '../../assets/imagens-projeto/logo-scrumcloud-bg.png';

function Login(){
    return (
        <div className="container">
                <div className="box-form">
                    <div className="logo">
                        <img src={Logo}></img>
                    </div>
            
                    <form>
                        <p>Seja bem vindo!</p>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                            <label htmlFor="floatingInput">E-mail</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"></input>
                            <label htmlFor="floatingPassword">Senha</label>
                        </div>
                        <span>Esqueceu sua senha?</span>
                        <br></br>
                        <button type="button" className="btn btn-outline-primary">Login</button>
                    </form>
                </div>   
        </div>  
    )
}

export default Login;