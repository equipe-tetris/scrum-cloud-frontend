import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { votacaoService } from '../../services/votacao.service';

function ValorVoto(props) {

    const [valorVoto, setValorVoto] = useState('');

    // const buscarVotoPorIdTaskAndUsuario = async() => {
    //     try {
    //         const res = await votacaoService.buscarVotoPorIdTaskAndUsuario(props?.idTask, props?.idUser);

    //         setValorVoto(res.data);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // useEffect(() => {
    //     buscarVotoPorIdTaskAndUsuario();
    // }, [])

    return (
        <>
                <Typography
                    style={{
                        fontWeight: 'bold',
                        fontSize: '13px',
                        fontFamily: 'Segoe UI',
                     }}
                >
                    {valorVoto ? valorVoto : ''}
                </Typography>
             
        </>
    )
}

export default ValorVoto;