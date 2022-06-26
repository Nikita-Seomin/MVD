import instance from "./instance";

export const respTableRows = {

    postAnswer (answer) {
        return instance.post(`requestTable/rowActions/post`, {answer})
            .then(response => { response.status });
    },
}

