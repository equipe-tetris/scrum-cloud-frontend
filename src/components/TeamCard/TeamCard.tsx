import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Equipe } from '../../models/Equipe';
import './TeamCard.css';

function TeamCard(props: any) {

    if(props.equipe) {
        return ( 
            <Link to={`/time/${props?.equipe?.id}`}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props?.equipe?.nome}</h5>
                    <p className="card-text">{props?.equipe?.descricao}</p>
                </div>
            </div>
            </Link>
        )
    } else {
        return (
            <> </>
        )
    }
  
}

export default TeamCard;