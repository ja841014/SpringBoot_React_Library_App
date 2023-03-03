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
        console.log(params.id.bookId);
        return axios_1["default"].get("http://localhost:8080/api/books/" + params.id.bookId);
    }
};
/**
 *
 * getModelAssetTaglist(params) {
        return axios.get("/api/m/model_asset/fitting_room/tag/list", { params: params });
    },
 */ 
