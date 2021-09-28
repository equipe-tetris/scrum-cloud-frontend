import React from 'react';
import './Login.css'

import Logo from '../../assets/imagens-projeto/logo-scrumcloud-bg.png';

import { Link } from 'react-router-dom';

function Login(){
    return (
        <div className="container-login">
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
                        <Link to='/recuperar-senha'>Esqueceu sua senha?</Link>
                        <br></br>
                        <button type="button" className="btn btn-outline-primary">Login</button>
                        <br></br>
                        <span>Ou</span>
                        <br></br>
                        <Link to='/cadastro'><button type="button" className="btn btn-outline-primary">Cadastre-se</button></Link>
                    </form>
                </div>   
        </div>  
    )
}

export default Login;