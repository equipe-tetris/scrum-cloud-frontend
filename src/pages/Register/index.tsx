import React from "react";
import  ImageUploading from 'react-images-uploading'; 

import "./index.css";

import avatar from "../../assets/imagens-projeto/avatar.png";


const Register = () => {
  return (
    <div className="container">
      <div className="box-form">
        <div className="avatar">
            <img src={avatar}></img>
        </div>

          <form>
            
            <button type="button" className="btn btn-outline-secund">Inclua sua Foto </button>
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
                <input type="text" className="form-control" id="floatingInput" placeholder="Usuário"></input>
                <label htmlFor="floatingInput">Usuário</label>
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
            <button type="button" className="btn btn-outline-primary">Cadastrar</button>
          </form>
      </div>   
    </div>  
)
}; 

export default Register;