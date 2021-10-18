import axios from 'axios';

const apiUrl = 'http://localhost:8080/equipe';

export const teamService = {

    async cadastrarEquipe(data: any) {
        const endpoint = `${apiUrl}/cadastrar`
        return axios.post(endpoint, data);
    },

    async buscarTimesPorIdUsuario(id: number) {
        const endpoint = `${apiUrl}/buscarPorIdUsuario/${id}`
        return axios.get(endpoint);
    },

    async buscarIntegrantesEquipe(id: number) {
        const endpoint = `${apiUrl}/buscarIntegrantesEquipe/${id}`
        return axios.get(endpoint);
    },

    async buscarTimePorId(id: number) {
        const endpoint = `${apiUrl}/buscarPorId/${id}`
        return axios.get(endpoint);
    },

    async buscarEquipesComboBoxPorUsuario(id: number) {
        const endpoint = `${apiUrl}/buscarEquipesComboBoxPorUsuario/${id}`
        return axios.get(endpoint);
    }


}