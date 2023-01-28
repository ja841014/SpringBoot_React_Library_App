import axios from "axios";

export default {
    getAllBooks(params: any) {
        // remember add {} outside "params"
        return axios.get("http://localhost:8080/api/books", {params});
    },
    // fetchTheBooks() {

    // }
}

/**
 * 
 * getModelAssetTaglist(params) {
		return axios.get("/api/m/model_asset/fitting_room/tag/list", { params: params });
	},
 */