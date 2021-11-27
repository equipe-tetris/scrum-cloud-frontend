import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Equipe } from '../../models/Equipe';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import AssessmentIcon from '@mui/icons-material/Assessment';
import HailIcon from '@mui/icons-material/Hail';

import './TeamCard.css';
import { FormControlUnstyled } from '@mui/material';

function TeamCard(props: any) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

     const handleClose = () => {
        setOpen(false);
    };

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
    } else if(props.salaPlanning){
        return (
            <>
                <div className="card-container">
                    <Link to={`/planningpokerroom/${props?.salaPlanning?.id}`}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{props?.salaPlanning?.nome}</h5>
                                <p className="card-text">{props?.salaPlanning?.descricao}</p>
                                <p className="card-text">Equipe: {props?.salaPlanning?.nomeEquipe}</p>
                            </div>
                        </div>
                    </Link>
                    <div className="btn-container">
                        <Button variant="outlined"><AssessmentIcon /></Button>
                        <Button variant="outlined" onClick={handleClickOpen}><HailIcon /></Button>
                    </div>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Selecione um Scrum Master</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Escolha um usuário para se tornar o Scrum Master privisório desta sala.
                            </DialogContentText>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button onClick={handleClose}>Salvar</Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </>  
        )
    } else {
        return (
            <> </>
        )
    }
  
}

export default TeamCard;