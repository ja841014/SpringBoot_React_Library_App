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
    // get book information
    getReviewByBookId: function (params) {
        console.log("getReviewByBookId: " + JSON.stringify(params));
        return axios_1["default"].get("http://localhost:8080/api/reviews/books/" + params.id, { params: params });
    },
    // get loans count by current user
    getCurrentLoansCountByUser: function (params) {
        console.log("getCurrentLoansCountByUser" + JSON.stringify(params));
        return axios_1["default"].get("http://localhost:8080/api/secure/loans/count", params.requestOptions);
    },
    // is book be cheked out bu the user
    isCheckoutByUser: function (req) {
        var headers = req.headers, params = req.params;
        console.log("API GET isCheckoutByUser" + JSON.stringify(req));
        var config = {
            "headers": headers.headers,
            "params": { "bookId": params }
        };
        return axios_1["default"].get("http://localhost:8080/api/secure/checkout", config);
    },
    // checkout a book
    checkoutBook: function (req) {
        console.log("API PUT checkoutBook" + JSON.stringify(req));
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": { "bookId": params }
        };
        // put(url, requestBody, config(such as headers, params))
        return axios_1["default"].put("http://localhost:8080/api/secure/checkout", null, config);
    },
    isLeftReview: function (req) {
        console.log("isLeftReview: " + JSON.stringify(req));
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": { "bookId": params }
        };
        console.log("API GET isLeftReview");
        console.log(req);
        return axios_1["default"].get("http://localhost:8080/api/reviews/secure/books", config);
    },
    // submit a review
    submitReview: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers.headers
        };
        console.log("API POST submitReview");
        console.log(req);
        /**
         * headers
         * data
         * params
         */
        return axios_1["default"].post("http://localhost:8080/api/reviews/secure/review", data, config);
    },
    getLoansDetail: function (req) {
        var headers = req.headers;
        var config = {
            "headers": headers.headers
        };
        console.log("API GET getLoansDetail");
        console.log(req);
        /**
         * headers
         * data
         * params
         */
        return axios_1["default"].get("http://localhost:8080/api/secure/currentloans", config);
    },
    returnBook: function (req) {
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": { "bookId": params }
        };
        console.log("API PUT returnBook");
        console.log(req);
        return axios_1["default"].put("http://localhost:8080/api/secure/return", null, config);
    },
    renewLoan: function (req) {
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": { "bookId": params }
        };
        console.log("API PUT renewLoan()");
        console.log(req);
        return axios_1["default"].put("http://localhost:8080/api/secure/renewloan", null, config);
    },
    getHistory: function (req) {
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": params
        };
        console.log("API Get getHistory()");
        console.log(req);
        /**
         * headers
         * data
         * params
         */
        return axios_1["default"].get("http://localhost:8080/api/histories/secure/", config);
    },
    submitNewQuestion: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers
        };
        console.log("API POST submitNewQuestion");
        console.log(req);
        return axios_1["default"].post("http://localhost:8080/api/messages/secure/", data, config);
    },
    getAllQuestionByUserEmail: function (req) {
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": params
        };
        console.log("API GET getAllQuestionByUserEmail");
        console.log(req);
        return axios_1["default"].get("http://localhost:8080/api/messages/secure/", config);
    },
    getAllQuestionByClosed: function (req) {
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": params
        };
        console.log("API GET getAllQuestionByClosed");
        console.log(req);
        return axios_1["default"].get("http://localhost:8080/api/messages/secure/admin", config);
    },
    submitQuestionResponse: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers.headers
        };
        console.log("API PUT submitQuestionResponse");
        console.log(req);
        return axios_1["default"].put("http://localhost:8080/api/messages/secure/admin", data, config);
    },
    addNewBook: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers
        };
        console.log("API POST addNewBook");
        console.log(req);
        return axios_1["default"].post("http://localhost:8080/api/admin/secure/book/", data, config);
    },
    changeBookQuantity: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers,
            "params": data
        };
        console.log("API PUT changeBookQuantity");
        console.log(req);
        return axios_1["default"].put("http://localhost:8080/api/admin/secure/book/", null, config);
    },
    deleteBook: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers,
            "params": data
        };
        console.log("API DELETE deleteBook");
        console.log(req);
        return axios_1["default"]["delete"]("http://localhost:8080/api/admin/secure/book/", config);
    }
};
