import React, { useState } from 'react';
import { useEffect } from 'react';
import { votacaoService } from '../../services/votacao.service';

function ValorVoto(props) {

    const [valorVoto, setValorVoto] = useState('');

    const buscarVotoPorIdTaskAndUsuario = async() => {
        try {
            const res = await votacaoService.buscarVotoPorIdTaskAndUsuario(props?.idTask, props?.idUser);

            setValorVoto(res.data);
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        buscarVotoPorIdTaskAndUsuario();
    }, [])

    return (
        <>
            {valorVoto ? valorVoto : ''} 
        </>
    )
}

export default ValorVoto;