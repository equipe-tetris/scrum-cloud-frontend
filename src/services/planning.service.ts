import axios from 'axios';
import { SalaPlanning } from '../models/SalaPlanning';

const apiUrl = 'http://localhost:8080/planning';

export const planningService = {

    async cadastrarSalaPlanning(data: any) {
        const endpoint = `${apiUrl}/cadastrar`
        return axios.post(endpoint, data);
    }

}