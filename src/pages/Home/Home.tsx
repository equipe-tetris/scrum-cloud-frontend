import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Redirect, useLocation, Route, useHistory} from 'react-router-dom';
import ModalTime from '../../components/ModalTime/ModalTime';
import TeamCard from '../../components/TeamCard/TeamCard';
import { Equipe } from '../../models/Equipe';
import { authService } from '../../services/auth.service';
import { planningService } from '../../services/planning.service';
import { teamService } from '../../services/team.service';

import './Home.css'

function Home() {
    const userLogged = authService.getDataLoggedUser();

    const [modalShow, setModalShow] = useState(false);
    const [equipes, setEquipes] = useState([]);
    const [salasPlanning, setSalasPlanning] = useState([]);


    const buscarTimes = async() => {
        try {
            const res = await teamService.buscarTimesPorIdUsuario(userLogged.id);

            setEquipes(res.data);
        } catch(e) { console.log(e); }
    }

    const buscarSalasPorIdUsuario = async() => {
        try {
            const res = await planningService.buscarSalasPlanningPorIdUsuario(userLogged.id);

            setSalasPlanning(res.data);
        } catch(e) {
            console.log(e)
        }
    }

    const history = useHistory();

    function GotoNextPage()
    {
        history.push( "/configurationroom" );
    }

    useEffect(() => {
       buscarTimes();
       buscarSalasPorIdUsuario();
       console.log(salasPlanning)
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
                {
                 salasPlanning.length > 0 ? 
                 salasPlanning.map((sala, index) => (
                     <TeamCard 
                        key={sala.id} 
                        salaPlanning={sala} 
                    />
                )) : console.log('loading')
            
                }
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