import React, { useState } from "react";

import { Modal } from 'react-bootstrap';
import { authService } from "../../services/auth.service";
import { teamService } from "../../services/team.service";

import './ModalTime.css'

const ModalTime = (props: any) => {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const onHandleSubmit = async(event: any) => {
        event.preventDefault();

        const userLogged = authService.getDataLoggedUser();

        const data = {
            nome: nome,
            descricao: descricao,
            usuario: userLogged.id
        }

        try {
            const res = await teamService.cadastrarEquipe(data);
            setNome('');
            setDescricao('');
        } catch(e) {
            console.log(e)
        }
    }



    return (
        <Modal className='modal-time' {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastre sua equipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onHandleSubmit} >
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Nome do time"
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />
                        <label htmlFor="floatingInput">Nome do time</label>
                    </div>
                    <div className="form-floating">
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            defaultValue="Descrição do seu time..."
                            value={descricao}
                            onChange={event => setDescricao(event.target.value)}
                        >
                        </textarea>
                    </div>

                    <br></br>
                    <div className='btnSubmit'>
                        <button type="submit" className="btn btn-outline-primary">Cadastrar</button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalTime;