import React, { useEffect, useState, useCallback } from 'react';
import { votacaoService } from '../../services/votacao.service';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAlt from '@mui/icons-material/ThumbDownAlt';

function StatusVotacao(props: any){

    const [status, setStatus ] = useState(<ThumbDownAltIcon />);

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
        setInterval(() => {
            statusTask()
        }, 2000)
    }, []);

    
    return (
            <div>
                {status} 
            </div>
        )
    
   
}

export default StatusVotacao;