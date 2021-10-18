import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Redirect, useLocation, Route, useHistory} from 'react-router-dom';
import ModalTime from '../../components/ModalTime/ModalTime';
import TeamCard from '../../components/TeamCard/TeamCard';
import { Equipe } from '../../models/Equipe';
import { authService } from '../../services/auth.service';
import { teamService } from '../../services/team.service';

import './Home.css'

function Home() {
    const [modalShow, setModalShow] = useState(false);

    const [equipes, setEquipes] = useState([]);

    const buscarTimes = async() => {
        try {
            const userLogged = authService.getDataLoggedUser();
            const res = await teamService.buscarTimesPorIdUsuario(userLogged.id);

            setEquipes(res.data);
        } catch(e) { console.log(e); }
    }

    const history = useHistory();

    function GotoNextPage()
    {
        history.push( "/configurationroom" );
    }

    useEffect(() => {
       buscarTimes();
    }, []);

    return (
        <div className="container-home">
            <p className="dashboard-title">Seus times</p>
            <hr></hr>
            <div className="teams-cards">
                {
                 equipes.length > 0 ? 
                 equipes.map((equipe, index) => (
                     <TeamCard 
                        key={equipe.id} 
                        equipe={equipe} 
                    />
                )) : console.log('loading')
            
                }
               
                <div className="box-new-team">
                    <div 
                       onClick={() => setModalShow(true)} 
                       className="new-team"><i className="fas fa-plus"></i>
                    </div>
                </div>
            </div>
            <p className="dashboard-title">Suas salas de Planning Poker</p>
            <hr></hr>
            <div className="teams-cards">
                <TeamCard />
                <div className="box-new-team">
                    <div onClick={() => GotoNextPage()} className="new-team"><i className="fas fa-plus"></i></div>
                </div>
            </div>
            <p className="dashboard-title">Suas salas de Retrospective</p>
            <hr></hr>
            <div className="teams-cards">
                <TeamCard />
                <div className="box-new-team">
                    <div 
                        onClick={() => setModalShow(true)} 
                        className="new-team">
                            <i 
                                className="fas fa-plus">
                                </i>
                                </div>
                </div>
            </div>

            <ModalTime show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default Home;