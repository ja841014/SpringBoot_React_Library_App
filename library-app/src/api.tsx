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
        
        console.log("API GET isCheckoutByUser" + JSON.stringify(req));

        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params": {"bookId": params}
        }

        return axios.get("http://localhost:8080/api/secure/checkout", config);
    },
    // checkout a book
    checkoutBook(req : any) {
        console.log("API PUT checkoutBook" + JSON.stringify(req));

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

        console.log("API GET isLeftReview")
        console.log(req);

        return axios.get(`http://localhost:8080/api/reviews/secure/books`, config);
    },
    // submit a review
    submitReview(req: any) {
        const {headers, data}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
        }
        console.log("API POST submitReview")
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
        console.log("API GET getLoansDetail")
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
        console.log("API PUT returnBook")
        console.log(req)
        return axios.put(`http://localhost:8080/api/secure/return`, null, config);
    },

    renewLoan(req: any) {
        const {headers, params}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params": {"bookId": params}
        }
        console.log("API PUT renewLoan()")
        console.log(req)
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
    },

    submitNewQuestion(req: any) {
        const {headers, data}  = req;
        let config = {
            "headers": headers, // {"Authorization":.....}
        }
        console.log("API POST submitNewQuestion");
        console.log(req);

        return axios.post(`http://localhost:8080/api/messages/secure/`, data, config);
    },

    getAllQuestionByUserEmail(req: any) {
        const {headers, params}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params" : params,
        }
        console.log("API GET getAllQuestionByUserEmail");
        console.log(req);

        return axios.get(`http://localhost:8080/api/messages/secure/`, config);
    },

    getAllQuestionByClosed(req: any) {
        const {headers, params}  = req;
        let config = {
            "headers": headers.headers, // {"Authorization":.....}
            "params" : params,
        }
        console.log("API GET getAllQuestionByClosed");
        console.log(req);

        return axios.get(`http://localhost:8080/api/messages/secure/admin`, config);
    },

    submitQuestionResponse(req: any) {
        const {headers, data}  = req;
        const config = {
            "headers": headers.headers
        }
        console.log("API PUT submitQuestionResponse");
        console.log(req);
        return axios.put(`http://localhost:8080/api/messages/secure/admin`, data, config)
    },

    addNewBook(req: any) {
        const {headers, data}  = req;
        let config = {
            "headers": headers, // {"Authorization":.....}
        }
        console.log("API POST addNewBook");
        console.log(req);

        return axios.post(`http://localhost:8080/api/admin/secure/book/`, data, config);
    },





}