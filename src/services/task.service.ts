import axios from 'axios';

const apiUrl = 'http://localhost:8080/task';

export const taskService = {

    async buscarTasksPorIdSala(idSala: number) {
        const endpoint = `${apiUrl}/buscarTasksPorIdSala/${idSala}`;
        return axios.get(endpoint);
    }
}