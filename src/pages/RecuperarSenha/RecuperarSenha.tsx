import React from 'react';
import './RecuperarSenha.css'

import Logo from '../../assets/imagens-projeto/logo-scrumcloud-bg.png';

function RecuperarSenha(){
    return (
        <div className="container-recuperar-senha">
                <div className="box-form">
                    <div className="logo">
                        <img src={Logo}></img>
                    </div>
            
                    <form>
                        <p>Confirme seus dados</p>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                            <label htmlFor="floatingInput">E-mail</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"></input>
                            <label htmlFor="floatingPassword">Confirme seu e-mail</label>
                        </div>
                        <button type="button" className="btn btn-outline-primary">Enviar</button>
                    </form>
                </div>   
        </div>  
    )
}

export default RecuperarSenha;