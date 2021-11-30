import axios from 'axios';

const apiUrl = 'http://localhost:8080/alerta';

export const alertaService = {

    async buscarAlertasPorIdSalaAndIdUser(idSala: number, idUser: number) {
        const endpoint = `${apiUrl}/buscarAlertasPorIdSalaAndIdUser?idSala=${idSala}&idUser=${idUser}`;
        return axios.get(endpoint);
    }
}