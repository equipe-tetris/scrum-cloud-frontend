import React, { useState } from "react";

import "./Register.css";

import avatar from "../../assets/imagens-projeto/avatar.png";


const Register = () => {


  const[nome, setNome] = useState('');
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  const[confirmarSenha, setConfirmarSenha] = useState('');
  const[tipoUsuario, setTipoUsuario] = useState('');



   return (
    <div className="container-register">
      <div className="box-form">
        <div className="avatar">
            <img src={avatar}></img>
        </div>

          <form>
            
            <p>Cadastro</p>
            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="Nome completo"></input>
                <label htmlFor="floatingInput">Nome</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                <label htmlFor="floatingInput">E-mail</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"></input>
                <label htmlFor="floatingPassword">Senha</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Confirme a Senha"></input>
                <label htmlFor="floatingPassword">Confirme a senha</label>
            </div>        
            <br></br>
            <span className="label">Qual será seu papel?</span>
            <br></br>
            <input className="form-check-input" type="radio" name="tipoUser" id="tipoUser" value="SM"></input>
              <label className="form-check-label" htmlFor="exampleRadios1">
                Scrum Master
              </label>
            <input className="form-check-input" type="radio" name="tipoUser" id="tipoUser" value="DEV"></input>
              <label className="form-check-label" htmlFor="exampleRadios1">
                Desenvolvedor
              </label>
            <br></br>
            <button type="button" className="btn btn-outline-primary">Cadastrar</button>
          </form>
      </div>   
    </div>  
)
}; 

export default Register;