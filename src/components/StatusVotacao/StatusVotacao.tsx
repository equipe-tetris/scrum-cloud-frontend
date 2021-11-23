import React, { useEffect, useState, useCallback } from 'react';
import { votacaoService } from '../../services/votacao.service';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function StatusVotacao(props: any){

    const [status, setStatus ] = useState(<AccessTimeIcon />);

    const statusTask = async() => {
        try {
            const res = await votacaoService.statusTaskVotacao(props?.idTask);
            buscarVotoOnList(res.data);
        } catch(e) {
          console.log(e)
        }
      }

      const buscarVotoOnList = (listVotos) => {
          let votoAux = listVotos.find(item => {
              return item?.idUser == props?.userId
          })

          if(votoAux) {
              setStatus(<ThumbUpIcon />);
          }
      }

      useEffect(() => {
        statusTask()
    }, []);

    
    return (
            <div>
                {status} 
            </div>
        )
    
   
}

export default StatusVotacao;