import React, { useState } from 'react';
import './Login.css'

import Logo from '../../assets/imagens-projeto/logo-scrumcloud-bg.png';

import { Link, Redirect, useLocation, Route, useHistory} from 'react-router-dom';
import API from '../../config/api';
import { authService } from '../../services/auth.service';

function Login(){

    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');

    const history = useHistory();

    const sendLogin = async (event: any) => {
        event.preventDefault();

        let data = {
            email: email,
            senha: senha
        }

       try {
           let res = await authService.authenticate(data);
           authService.setLoggedUser(res.data);

           setEmail('');
           setSenha('');

         history.push('/home/dashboard');
       } catch (error) {
           console.log(error)
       }

        
    }



    return (
        <div className="container-login">
                <div className="box-form">
                    <div className="logo">
                        <img src={Logo}></img>
                    </div>
            
                    <form onSubmit={sendLogin}>
                        <p>Seja bem vindo!</p>
                        <div className="form-floating">
                            <input 
                                type="email" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="name@example.com" 
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            <label htmlFor="floatingInput">E-mail</label>
                        </div>
                        <div className="form-floating">
                            <input 
                                type="password" 
                                className="form-control" 
                                id="floatingPassword" 
                                placeholder="Senha" 
                                value={senha}
                                onChange={event => setSenha(event.target.value)}
                            />
                            <label htmlFor="floatingPassword">Senha</label>
                        </div>
                        <Link to='/recuperar-senha'>Esqueceu sua senha?</Link>
                        <br></br>
                        <button type="submit" className="btn btn-outline-primary">Login</button>
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