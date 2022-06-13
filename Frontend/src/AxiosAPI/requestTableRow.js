import instance from "./instance";

export const requestTableRows = {

    getRows (userName) {
        return instance.get(`requestTable/rowActions/get?userName=${userName}`)
            .then(response => { return response.data });
    },

    postRows (newRowJson) {
        console.log({...newRowJson, userName: 'root'})
        return instance.post(`requestTable/rowActions/post`, {...newRowJson, userName: 'root'})
            .then(response => { console.log(response.data)  });
    },

    updateRows (updateJsonData) {
        return instance.post(`requestTable/rowActions/update`, updateJsonData)
            .then(response => {  return response.data });
    },

    deleteRow (idRequestTable) {
        return instance.delete(`requestTable/rowActions/delete?idRequestTable=${idRequestTable}`)
            .then(response => {  return response.data });
    }
}

