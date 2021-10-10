import axios from 'axios';
import { Usuario } from '../models/Usuario';

const apiUrl = 'http://localhost:8080/usuario';

export const usuarioService = {
    
    async cadastroDev(data: Usuario, idTime: number) {
        const endpoint = `${apiUrl}/cadastro-dev/${idTime}`;
        return axios.post(endpoint, data);
    },

    async cadastroSM(data: Usuario) {
        const endpoint = `${apiUrl}/cadastrar`;
        return axios.post(endpoint, data);
    }
}