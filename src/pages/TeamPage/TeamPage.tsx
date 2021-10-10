import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NewUserTeam from '../../components/NewUserTeam/NewUserTeam';
import { authService } from '../../services/auth.service';
import { teamService } from '../../services/team.service';

import Table from 'react-bootstrap/Table';

import './TeamPage.css';

function TimePage() {

    const { id } = useParams<{id?: string}>();

    const idNumber = Number(id);

    const [equipes, setEquipes] = useState([]);

    const buscarUsuariosPorEquipe = async() => {
        try {
            const res = await teamService.buscarIntegrantesEquipe(idNumber);

            console.log(res.data)
            setEquipes(res.data);
        } catch(e) { console.log(e); }
    }

    useEffect(() => {
        buscarUsuariosPorEquipe();
    }, [id])

    if(equipes.length == 0) {
        return (
            <div className="container-team-page">
                <NewUserTeam />
                <div className="box-link">
                    <p>Ou, se preferir, copie o link e envie:</p>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={`http://localhost:3000/cadastro-dev/${idNumber}`} aria-label="Recipient's username" aria-describedby="button-addon2" disabled/>
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="far fa-copy"></i></button>
                    </div>
                </div>
                
            </div>

        )
    } else {
        return (
            <div className="container-user">
                <div className="title">
                    <span>Integrantes</span>
                </div>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipes?.map((item) => (
                            <tr key={item?.id}>
                                <td>{item?.nome}</td>
                                <td>{item?.email}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
    
  
    
}

export default TimePage;