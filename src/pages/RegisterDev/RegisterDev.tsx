import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Equipe } from '../../models/Equipe';
import { teamService } from '../../services/team.service';
import { usuarioService } from '../../services/usuario.service';

import './RegisterDev.css';

function RegisterDev() {

    const { id } = useParams<{id?: string}>();

    const idNumber = Number(id);

    const [equipe, setEquipe] = useState<Equipe>();

    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[confirmarSenha, setConfirmarSenha] = useState('');

    const userDev = {
        nome: nome,
        email: email,
        senha: senha,
        tipoUsuario: "DEV"
    }

    const buscarTimePorId = async() => {
        try {
            const res = await teamService.buscarTimePorId(idNumber);

            setEquipe(res.data);
            
        } catch(e) { console.log(e); }
    }

    const inserirDev = async(event: any) => {
        event.preventDefault();

        try {
            const res = await usuarioService.cadastroDev(userDev, idNumber);

            setNome('');
            setEmail('');
            setSenha('');
            setConfirmarSenha('');

            console.log(res)
        } catch(e) {
            console.log(e)
        }
    }


    useEffect(() => {
        buscarTimePorId();
    }, [id]);

    return (
        <div className="container-register-dev">
            <div className="box-form">

                <form onSubmit={inserirDev}>
                    <p>Cadastro DEV</p>
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
                    <span>Dados do seu time: </span>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            value={`Equipe: ${equipe?.nome}`}
                            disabled
                        />
                    </div>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            value={`Scrum Master: ${equipe?.nomeUser}`}
                            disabled
                        />
                    </div>
                    <br></br>

                    <button type="submit" className="btn btn-outline-primary">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterDev;