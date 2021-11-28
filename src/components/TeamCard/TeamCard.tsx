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
import fileSaver from 'file-saver';

import LinearProgress from '@mui/material/LinearProgress';

import AssessmentIcon from '@mui/icons-material/Assessment';
import HailIcon from '@mui/icons-material/Hail';

import './TeamCard.css';
import { FormControlUnstyled } from '@mui/material';
import { planningService } from '../../services/planning.service';
import { useEffect } from 'react';
import { authService } from '../../services/auth.service';

function TeamCard(props: any) {
    const userLogged = authService.getDataLoggedUser();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listComboIntegrantes, setListComboIntegrantes] = useState([]);

    const idSala = props?.salaPlanning?.id;

    const handleClickOpen = () => {
        setOpen(true);
    };

     const handleClose = () => {
        setOpen(false);
    };

    const downloadRelatorio = async(idSala: number) => {
        setLoading(true);
        try {

            const now = formatarData();

            const res = await planningService.downloadRelatorioVotacao(idSala);

            const blob = new Blob([res.data], { type: "application/octet-stream" });
            fileSaver.saveAs(blob, `Relatório de Votacao - ${now}.xlsx`);

            setLoading(false);
        } catch(e) {
            console.log(e)
        }
    }

    const buscarComboIntegrantesSala = async() => {
        try {
            if(idSala) {
                const res = await planningService.buscarComboIntegrantesSala(idSala);
                setListComboIntegrantes(res.data);
            }
          
        } catch(e) {
            console.log(e)
        }
    }

    const formatarData = () => {
        const data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
    }

    useEffect(() => {
        buscarComboIntegrantesSala()
    }, [idSala]);

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
                    {
                        userLogged?.tipoUsuario === 'SM' ? (
                            <div className="btn-container">
                                { !!loading && ( <LinearProgress /> ) }
                                <Button variant="outlined" onClick={() => downloadRelatorio(props?.salaPlanning?.id)}><AssessmentIcon /></Button>
                                <Button variant="outlined" onClick={handleClickOpen}><HailIcon /></Button>
                            </div>
                        ) : (<></>)
                    }
                    
                   
                    
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Selecione um Scrum Master</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Escolha um usuário para se tornar o Scrum Master privisório desta sala.
                            </DialogContentText>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="demo-simple-select-standard-label">Integrante</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>Nenhum</em>
                                    </MenuItem>
                                    {
                                        listComboIntegrantes.map((user: any) => (
                                            <MenuItem key={user?.id} value={user?.id}>{user?.label}</MenuItem>
                                        ))
                                    }
                                    
                                
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