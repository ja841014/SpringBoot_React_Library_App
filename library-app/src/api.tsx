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
    // get book information
    getReviewByBookId(params: any) {
        console.log("getReviewByBookId: " + JSON.stringify(params));
        return axios.get(`http://localhost:8080/api/reviews/books/${params.id}`, {params});
    },

    // get loans count by current user
    getCurrentLoansCountByUser(params: {requestOptions: any}) {
        console.log("getCurrentLoansCountByUser" + JSON.stringify(params));
        return axios.get("http://localhost:8080/api/secure/loans/count", params.requestOptions);
    },
    // is book be cheked out bu the user
    isCheckoutByUser(req : any) {
        const {headers, params}  = req;
        
        console.log("isCheckoutByUser" + JSON.stringify(req));

        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params": {"bookId": params}
        }

        return axios.get("http://localhost:8080/api/secure/checkout", config);
    },
    // checkout a book
    checkoutBook(req : any) {
        console.log("checkoutBook" + JSON.stringify(req));

        const {headers, params}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params": {"bookId": params}
        }
        // put(url, requestBody, config(such as headers, params))
        return axios.put(`http://localhost:8080/api/secure/checkout`, null, config);
    },

    isLeftReview(req : any) {
        console.log("isLeftReview: " + JSON.stringify(req));
        const {headers, params}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params": {"bookId": params}
        }
        return axios.get(`http://localhost:8080/api/reviews/secure/books`, config);
    },
    // submit a review
    submitReview(req: any) {
        const {headers, data}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
        }
        console.log(req);
        /**
         * headers
         * data
         * params
         */
        return axios.post(`http://localhost:8080/api/reviews/secure/review`, data, config);
    },

    getLoansDetail(req: any) {
        const {headers}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
        }
        console.log(req);
        /**
         * headers
         * data
         * params
         */
        return axios.get(`http://localhost:8080/api/secure/currentloans`, config);
    },

    returnBook(req: any) {
        const {headers, params}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params": {"bookId": params}
        }
        return axios.put(`http://localhost:8080/api/secure/return`, null, config);
    },

    renewLoan(req: any) {
        const {headers, params}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params": {"bookId": params}
        }
        console.log("API Put renewLoan()")
        console.log(config)
        return axios.put(`http://localhost:8080/api/secure/renewloan`, null, config);
    },

    getHistory(req: any) {
        const {headers, params}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params" : params,
        }
        console.log("API Get getHistory()")
        console.log(req);
        /**
         * headers
         * data
         * params
         */
        return axios.get(`http://localhost:8080/api/histories/secure/`, config);
    }

}