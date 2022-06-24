import instance from "./instance";

export const respTableRows = {

    getRows (userName) {
        return instance.get(`responseTable/get?userName=${userName}`)
            .then(response => { return response.data });
    }
}

