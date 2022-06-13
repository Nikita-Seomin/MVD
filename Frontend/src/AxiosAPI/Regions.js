import instance from "./instance";

export const regions = {
    getRegions () {
        return instance.get(`requestTable/regions/get`)
            .then(response => { return response.data });
    }
}