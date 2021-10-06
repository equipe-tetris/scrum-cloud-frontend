import axios from 'axios';

const apiUrl = 'http://localhost:8080/usuario';

export const UsuarioService = {
    
    async cadastroDev(data: any, idTime: number) {
        const endpoint = `${apiUrl}/cadastrar`
        return axios.post(endpoint, data);
    } 
}