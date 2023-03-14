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
        console.log("getBook: " + JSON.stringify(params));
        return axios.get(`http://localhost:8080/api/books/${params.id}`);
    },

    getReviewByBookId(params: any) {
        console.log("getReviewByBookId: " + JSON.stringify(params));
        return axios.get(`http://localhost:8080/api/reviews/${params.id}`, {params});
    }
}

/**
 * 
 * getModelAssetTaglist(params) {
		return axios.get("/api/m/model_asset/fitting_room/tag/list", { params: params });
	},
 */