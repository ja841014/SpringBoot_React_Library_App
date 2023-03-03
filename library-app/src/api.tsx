import axios from "axios";

export default {
    getAllBooks(params: any) {
        // remember add {} outside "params"
        return axios.get("http://localhost:8080/api/books", {params});
    },
    /**
     * 
     * @param params 
     * @returns 
     */
    getBook(params: any) {
        console.log(params.id.bookId)
        return axios.get(`http://localhost:8080/api/books/${params.id.bookId}`);
    }
}

/**
 * 
 * getModelAssetTaglist(params) {
		return axios.get("/api/m/model_asset/fitting_room/tag/list", { params: params });
	},
 */