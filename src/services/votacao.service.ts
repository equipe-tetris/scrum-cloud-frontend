import axios from 'axios';

const apiUrl = 'http://localhost:8080/votacao';

export const votacaoService = {

    async statusTaskVotacao(idTask: number) {
        const endpoint = `${apiUrl}/status-task/${idTask}`;
        return axios.get(endpoint);
    },

    
    async inserirVoto(data: any) {
        /*
        Estrutura inserirVoto = {
            idTask: *number*,
            idUsuario: *number*,
            valorVoto: *string*
        }
        */
        const endpoint = `${apiUrl}/inserirVoto`;
        return axios.post(endpoint, data);
    },

    async buscarInfoTaskPorId(idTask: number){
        const endpoint = `${apiUrl}/buscarInfoVotosPorIdTask/${idTask}`;
        return axios.get(endpoint); 
    },

    async buscarNumVotosPorIdTask(idTask: number) {
        const endpoint = `${apiUrl}/buscarNumVotosPorIdTask/${idTask}`;
        return axios.get(endpoint)
    }
}