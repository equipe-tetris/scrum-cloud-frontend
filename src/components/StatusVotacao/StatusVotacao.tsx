import React, { useEffect, useState } from 'react';
import { votacaoService } from '../../services/votacao.service';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAlt from '@mui/icons-material/ThumbDownAlt';

function StatusVotacao(props: any){

    const [status, setStatus ] = useState(false);
    const [listVotos, setListVotos] = useState([]);

    const statusTask = async() => {
        try {

            const res = await votacaoService.statusTaskVotacao(1);

            buscarVotoOnList();

            setListVotos(res.data);
          
        } catch(e) {
          console.log(e)
        }
      }
    
      useEffect(() => {
        statusTask();
        
      })


      const buscarVotoOnList = () => {
          let votoAux = listVotos.find(item => {
              return item?.idUser == props?.userId
          })

          if(votoAux != undefined) {
              setStatus(true);
          }
      }


    if(status) {
        return (
            <div>
                <ThumbUpIcon />
            </div>
        )
    } else {
        return (
            <div>
                <ThumbDownAltIcon />
            </div>
        )
    }
   
}

export default StatusVotacao;