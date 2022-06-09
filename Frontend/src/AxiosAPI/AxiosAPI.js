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

export const requestTableRowsAxiosAPI = {
    getRows (userName) {
        return instance.get(`reqTable?userName=${userName}`)
            .then(response => { return response.data });
    },

    postRows (newRowJson) {
        console.log({...newRowJson, userName: 'root'})
        return instance.post(`postReqTable`, {...newRowJson, userName: 'root'})
            .then(response => { console.log(response.data)  });
    },

    updateRows (updateJsonData) {
        return instance.post(`updateReqTable`, updateJsonData)
            .then(response => {  return response.data });
    }
}