import React, { useState } from "react";

import "./Register.css";

import avatar from "../../assets/imagens-projeto/avatar.png";
import { useEffect } from "react";
import API from "../../config/api";

const Register = () => {

  const[nome, setNome] = useState('');
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  const[confirmarSenha, setConfirmarSenha] = useState('');
  const[tipoUsuario, setTipoUsuario] = useState('');

  const onSubmitHandler = (event: any) => {
    event.preventDefault();

    if(senha === confirmarSenha) {
      
      API.post('usuario/cadastrar', {
        nome: nome,
        email: email,
        senha: senha,
        tipoUsuario: tipoUsuario
      }).then((res) => console.log(res));

      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      setTipoUsuario('');
      
    } else {
      console.log('Senha não são iguais')
    }
  }

   return (
    <div className="container-register">
      <div className="box-form">
        <div className="avatar">
            <img src={avatar}></img>
        </div>

          <form onSubmit={onSubmitHandler}>
            <p>Cadastro</p>
            <div className="form-floating">
                <input 
                  type="text" 
                  className="form-control" 
                  id="floatingInput" 
                  placeholder="Nome completo"
                  value={nome} 
                  onChange={event => setNome(event.target.value)}
                />
                <label htmlFor="floatingInput">Nome</label>
            </div>
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
            <div className="form-floating">
                <input 
                  type="password" 
                  className="form-control" 
                  id="floatingPassword" 
                  placeholder="Confirme a Senha" 
                  value={confirmarSenha}
                  onChange={event => setConfirmarSenha(event.target.value)}
                />
                <label htmlFor="floatingPassword">Confirme a senha</label>
            </div>                   
            <br></br>
            <button type="submit" className="btn btn-outline-primary">Cadastrar</button>
          </form>
      </div>   
    </div>  
)
}; 

export default Register;