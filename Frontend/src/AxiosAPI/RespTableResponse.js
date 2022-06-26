import instance from "./instance";

export const respTableAnswer = {

    postAnswer (answer) {
        return instance.post(`responseTable/post`, {...answer})
            .then(response => { return response.status });
    }
}

