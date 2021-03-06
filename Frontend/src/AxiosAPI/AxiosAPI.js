import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000/"
});

export const loginAxiosAPI = {
    getUsers () {
        return instance.get(`LogIn`)
            .then(response => { return response.data });
    },

    postSession (login, password) {
        return instance.post(`auth/login`, {login,password})
            .then(response => { return response.data });
    }
}