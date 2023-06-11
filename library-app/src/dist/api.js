"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var baseURL = process.env.REACT_APP_API;
exports["default"] = {
    getAllBooks: function (params) {
        // remember add {} outside "params"
        console.log(process.env);
        return axios_1["default"].get(baseURL + "/books", { params: params });
    },
    /**
     *
     * @param params
     * @returns
     */
    getBook: function (params) {
        console.log("getBook: " + JSON.stringify(params));
        return axios_1["default"].get(baseURL + "/books/" + params.id);
    },
    // get book information
    getReviewByBookId: function (params) {
        console.log("getReviewByBookId: " + JSON.stringify(params));
        return axios_1["default"].get(baseURL + "/reviews/books/" + params.id, { params: params });
    },
    // get loans count by current user
    getCurrentLoansCountByUser: function (params) {
        console.log("getCurrentLoansCountByUser" + JSON.stringify(params));
        return axios_1["default"].get(baseURL + "/secure/loans/count", params.requestOptions);
    },
    // is book be cheked out bu the user
    isCheckoutByUser: function (req) {
        var headers = req.headers, params = req.params;
        console.log("API GET isCheckoutByUser" + JSON.stringify(req));
        var config = {
            "headers": headers.headers,
            "params": { "bookId": params }
        };
        return axios_1["default"].get(baseURL + "/secure/checkout", config);
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
        return axios_1["default"].put(baseURL + "/secure/checkout", null, config);
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
        return axios_1["default"].get(baseURL + "/reviews/secure/books", config);
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
        return axios_1["default"].post(baseURL + "/reviews/secure/review", data, config);
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
        return axios_1["default"].get(baseURL + "/secure/currentloans", config);
    },
    returnBook: function (req) {
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": { "bookId": params }
        };
        console.log("API PUT returnBook");
        console.log(req);
        return axios_1["default"].put(baseURL + "/secure/return", null, config);
    },
    renewLoan: function (req) {
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": { "bookId": params }
        };
        console.log("API PUT renewLoan()");
        console.log(req);
        return axios_1["default"].put(baseURL + "/secure/renewloan", null, config);
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
        return axios_1["default"].get(baseURL + "/histories/secure/", config);
    },
    submitNewQuestion: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers
        };
        console.log("API POST submitNewQuestion");
        console.log(req);
        return axios_1["default"].post(baseURL + "/messages/secure/", data, config);
    },
    getAllQuestionByUserEmail: function (req) {
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": params
        };
        console.log("API GET getAllQuestionByUserEmail");
        console.log(req);
        return axios_1["default"].get(baseURL + "/messages/secure/", config);
    },
    getAllQuestionByClosed: function (req) {
        var headers = req.headers, params = req.params;
        var config = {
            "headers": headers.headers,
            "params": params
        };
        console.log("API GET getAllQuestionByClosed");
        console.log(req);
        return axios_1["default"].get(baseURL + "/messages/secure/admin", config);
    },
    submitQuestionResponse: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers.headers
        };
        console.log("API PUT submitQuestionResponse");
        console.log(req);
        return axios_1["default"].put(baseURL + "/messages/secure/admin", data, config);
    },
    addNewBook: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers
        };
        console.log("API POST addNewBook");
        console.log(req);
        return axios_1["default"].post(baseURL + "/admin/secure/book/", data, config);
    },
    changeBookQuantity: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers,
            "params": data
        };
        console.log("API PUT changeBookQuantity");
        console.log(req);
        return axios_1["default"].put(baseURL + "/admin/secure/book/", null, config);
    },
    deleteBook: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers,
            "params": data
        };
        console.log("API DELETE deleteBook");
        console.log(req);
        return axios_1["default"]["delete"](baseURL + "/admin/secure/book/", config);
    },
    createPaymentIntent: function (req) {
        var headers = req.headers, data = req.data;
        var config = {
            "headers": headers
        };
        console.log("API POST createPaymentIntent");
        console.log(req);
        return axios_1["default"].post(baseURL + "/payment/secure/payment-intent", data, config);
    },
    stripePaymentComplete: function (req) {
        var headers = req.headers;
        var config = {
            "headers": headers
        };
        console.log("API PUT stripePaymentComplete");
        console.log(req);
        return axios_1["default"].put(baseURL + "/payment/secure/payment-complete", null, config);
    },
    paymentDetail: function (req) {
        var headers = req.headers;
        var config = {
            "headers": headers
        };
        console.log("API GET paymentDetail");
        console.log(req);
        return axios_1["default"].get(baseURL + "/payment/secure/payment-details", config);
    }
};
