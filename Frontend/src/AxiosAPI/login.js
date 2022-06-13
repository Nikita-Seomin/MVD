import instance from "./instance";

export const login = {
    getUsers () {
        return instance.get(`LogIn`)
            .then(response => { return response.data });
    },

    postSession (login, password) {
        return instance.post(`auth/login`, {login,password})
            .then(response => { return response.data });
    }
}