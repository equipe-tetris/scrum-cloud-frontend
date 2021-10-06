import axios from 'axios';
import { useHistory } from 'react-router';

const apiUrl = 'http://localhost:8080/usuario';


export const authService = {

    async authenticate(data: any) {
        const endpoint = `${apiUrl}/login`
        return axios.post(endpoint, data);
    },

    setLoggedUser(data: any){
        let parsedData = JSON.stringify(data)
        localStorage.setItem("user", parsedData)
    },

    getDataLoggedUser(){
        const data = localStorage.getItem("user");
        return JSON.parse(data)
    },

    isAuthenticated(){
        let data = localStorage.getItem("user");
        if(!data) return false;
        try {
            let parsedData = JSON.parse(data)
            return true;
        } catch (error) {
            console.log(error)
            return null
        }
    },

    logout() {
        localStorage.clear();
    }


}