import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

import './NewUserTeam.css';

const NewUserTeam = () => {

    const [email, setEmail] = useState('');
    const [listEmail, setListEmail] = useState([]);

    const onSubmitHandle = (event: any) => {
        event.preventDefault();

        setListEmail([...listEmail, email]);

        setEmail('');

    }

    return (
        <div className="container-new-team">
            <p>Insira o e-mail dos integrantes da equipe</p>
            <form onSubmit={onSubmitHandle}>
                <div className="input-group mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Inserir e-mail dos integrantes"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="submit"
                        id="button-addon2">
                        Inserir
                    </button>
                </div>
            </form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Integrante</th>
                    </tr>
                </thead>
                <tbody>
                {listEmail.map((item, index) => (
                    <tr key={index}>
                        <td >{item}</td>
                    </tr>
                    ))
                }
                </tbody>
            </Table>
            <button
                className="btn btn-outline-secondary"
                type="submit"
                id="button-addon2">
                Enviar
            </button>
        </div>
        

        
    )
} 

export default NewUserTeam;