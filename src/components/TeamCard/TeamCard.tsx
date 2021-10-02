import React from 'react';
import './TeamCard.css';

const TeamCard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">ScrumCloud</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">Descrição do time</p>
            </div>
        </div>
    )
}

export default TeamCard;