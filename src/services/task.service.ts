import axios from 'axios';

const apiUrl = 'http://localhost:8080/task';

export const taskService = {

    async buscarTasksPorIdSala(idSala: number) {
        const endpoint = `${apiUrl}/buscarTasksPorIdSala/${idSala}`;
        return axios.get(endpoint);
    },

    async mudarStatusTaskPorId(statusTask: string, idTask: number) {
        const endpoint = `${apiUrl}/mudarStatusTaskPorId?statusTask=${statusTask}&idTask=${idTask}`;
        return axios.post(endpoint);
    },

    async getStatusTaskPorId(idTask: number) {
        const endpoint = `${apiUrl}/getStatusTaskPorId/${idTask}`;
        return axios.get(endpoint);
    },

    async setValorFinalPorIdTask(idTask: number, valorFinalTask: string) {
        const endpoint = `${apiUrl}/setValorFinalPorIdTask?idTask=${idTask}&valorTask=${valorFinalTask}`;
        return axios.post(endpoint);
    },

    async getValorFinalTaskPorId(idTask: number) {
        const endpoint = `${apiUrl}/getValorFinalTaskPorId/${idTask}`;
        return axios.get(endpoint);
    },

    async buscarTaskAtualParaVotacaoPorIdSala(idSala: number) {
        const endpoint = `${apiUrl}/buscarTaskAtualParaVotacaoPorIdSala/${idSala}`;
        return axios.get(endpoint);
    }
}