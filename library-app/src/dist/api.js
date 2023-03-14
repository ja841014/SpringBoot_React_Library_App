"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
exports["default"] = {
    getAllBooks: function (params) {
        // remember add {} outside "params"
        return axios_1["default"].get("http://localhost:8080/api/books", { params: params });
    },
    /**
     *
     * @param params
     * @returns
     */
    getBook: function (params) {
        console.log("getBook: " + JSON.stringify(params));
        return axios_1["default"].get("http://localhost:8080/api/books/" + params.id);
    },
    getReviewByBookId: function (params) {
        console.log("getReviewByBookId: " + JSON.stringify(params));
        return axios_1["default"].get("http://localhost:8080/api/reviews/" + params.id, { params: params });
    }
};
/**
 *
 * getModelAssetTaglist(params) {
        return axios.get("/api/m/model_asset/fitting_room/tag/list", { params: params });
    },
 */ 
