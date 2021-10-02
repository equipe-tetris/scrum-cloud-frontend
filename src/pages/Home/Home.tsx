import React from 'react';
import ModalCadastro from '../../components/ModalCadastro/ModalCadastro';
import TeamCard from '../../components/TeamCard/TeamCard';

import './Home.css'

function Home() {

    const showModal = () => {

    }

    return (
        <div className="container-home">
            <p className="dashboard-title">Seus times</p>
            <hr></hr>
            <div className="teams-cards">
                <TeamCard />
                <div className="box-new-team">
                    <div className="new-team"><i className="fas fa-plus"></i></div>
                </div>
            </div>
            <p className="dashboard-title">Suas salas de Planning Poker</p>
            <hr></hr>
            <div className="teams-cards">
                <TeamCard />
                <div className="box-new-team">
                    <div onClick={showModal} className="new-team"><i className="fas fa-plus"></i></div>
                </div>
            </div>
            <p className="dashboard-title">Suas salas de Retrospective</p>
            <hr></hr>
            <div className="teams-cards">
                <TeamCard />
                <div className="box-new-team">
                    <div className="new-team"><i className="fas fa-plus"></i></div>
                </div>
            </div>

            <ModalCadastro />
        </div>
    )
}

export default Home;