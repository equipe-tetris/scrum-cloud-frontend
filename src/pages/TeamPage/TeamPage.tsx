import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NewUserTeam from '../../components/NewUserTeam/NewUserTeam';
import { authService } from '../../services/auth.service';
import { teamService } from '../../services/team.service';

import './TeamPage.css';

function TimePage() {

    const { id } = useParams<{id?: string}>();

    const idNumber = Number(id);

    const [equipes, setEquipes] = useState([]);

    const buscarUsuariosPorEquipe = async() => {
        try {
            const res = await teamService.buscarIntegrantesEquipe(idNumber);

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
                        <input type="text" className="form-control" value={`/link-do-cadastro/${idNumber}`} aria-label="Recipient's username" aria-describedby="button-addon2" disabled/>
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="far fa-copy"></i></button>
                    </div>
                </div>
                
            </div>

        )
    } else {
        return (
            <h1>555</h1>
        )
    }
    
  
    
}

export default TimePage;