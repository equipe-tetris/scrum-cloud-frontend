import axios from 'axios';

const apiUrl = 'http://localhost:8080/task';

export const taskService = {

    async buscarTasksPorIdSala(idSala: number) {
        const endpoint = `${apiUrl}/buscarTasksPorIdSala/${idSala}`;
        return axios.get(endpoint);
    },

    async mudarStatusTaskPorId(statusTask: string, idTask: number,  permitir: boolean) {
        const endpoint = `${apiUrl}/mudarStatusTaskPorId?statusTask=${statusTask}&idTask=${idTask}&permitir=${permitir}`;
        return axios.post(endpoint);
    },

    async getStatusTaskPorId(idTask: number) {
        const endpoint = `${apiUrl}/getStatusTaskPorId/${idTask}`;
        return axios.get(endpoint);
    }
}