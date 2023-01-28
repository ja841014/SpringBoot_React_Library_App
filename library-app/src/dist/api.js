"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
exports["default"] = {
    getAllBooks: function (params) {
        // remember add {} outside "params"
        return axios_1["default"].get("http://localhost:8080/api/books", { params: params });
    }
};
/**
 *
 * getModelAssetTaglist(params) {
        return axios.get("/api/m/model_asset/fitting_room/tag/list", { params: params });
    },
 */ 
