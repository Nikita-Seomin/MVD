import {loginAxiosAPI} from "../AxiosAPI/AxiosAPI";


export const getLogin = async () => {
    try {
        const response = loginAxiosAPI.getUsers().then(data => { return data } )
    }
    catch (e) {
        alert(e);
    }
}