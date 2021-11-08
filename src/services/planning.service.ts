import axios from 'axios';
import { SalaPlanning } from '../models/SalaPlanning';

const apiUrl = 'http://localhost:8080/planning';

export const planningService = {

    async cadastrarSalaPlanning(data: any) {
        const endpoint = `${apiUrl}/cadastrar`
        return axios.post(endpoint, data);
    },

    async buscarSalasPlanningPorIdUsuario(idUser: number){
        const endpoint = `${apiUrl}/buscarSalasPorIdUsuario/${idUser}`;
        return axios.get(endpoint);
    },

    async buscarDadosSalaPorId(idSala: number) {
        const endpoint = `${apiUrl}/buscarSalaPorId/${idSala}`;
        return axios.get(endpoint);
    },

    async buscarIntegrantesEquipePorIdSala(idSala: number) {
        const endpoint = `${apiUrl}/buscarIntegrantesEquipePorIdSala/${idSala}`;
        return axios.get(endpoint);
    }

}