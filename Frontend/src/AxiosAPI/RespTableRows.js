import instance from "./instance";

export const respTableRows = {

    getRows (userName) {
        return instance.get(`requestTable/rowActions/get?userName=${userName}`)
            .then(response => { return response.data });
    }
}

