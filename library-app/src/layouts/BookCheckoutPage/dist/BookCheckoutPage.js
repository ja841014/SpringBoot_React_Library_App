"use strict";
exports.__esModule = true;
exports.BookCheckoutPage = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../../api");
var SpinnerLoading_1 = require("../Utils/SpinnerLoading");
var StarsReview_1 = require("../Utils/StarsReview");
var CheckoutAndReviewBox_1 = require("./CheckoutAndReviewBox");
exports.BookCheckoutPage = function () {
    var _a = react_1.useState(), book = _a[0], setBook = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState(null), httpError = _c[0], setHttpError = _c[1];
    var bookId = react_router_dom_1.useParams();
    react_1.useEffect(function () {
        api_1["default"].getBook({ id: bookId }).then(function (res) {
            var responsedata = res.data;
            console.log(responsedata);
            var loadedBook = {
                id: responsedata.id,
                title: responsedata.title,
                author: responsedata.author,
                description: responsedata.description,
                copies: responsedata.copies,
                copiesAvailable: responsedata.copiesAvailable,
                category: responsedata.category,
                img: responsedata.img
            };
            setBook(loadedBook);
            setIsLoading(false);
        }, (function (error) {
            console.error("Error");
            setIsLoading(false);
            setHttpError(error.message);
            throw new Error(error.message);
        }));
    }, []);
    if (isLoading) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: "container m-5" },
            React.createElement("p", null, httpError)));
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: 'container d-none d-lg-block' },
            React.createElement("div", { className: 'row mt-5' },
                React.createElement("div", { className: 'col-sm-2 col-md-2' }, (book === null || book === void 0 ? void 0 : book.img) ?
                    React.createElement("img", { src: book === null || book === void 0 ? void 0 : book.img, width: '226', height: '349', alt: 'Book' })
                    :
                        React.createElement("img", { src: require('./../../Images/BooksImages/book-luv2code-1000.png'), width: '226', height: '349', alt: 'Book' })),
                React.createElement("div", { className: 'col-4 col-md-4 container' },
                    React.createElement("div", { className: 'ml-2' },
                        React.createElement("h2", null, book === null || book === void 0 ? void 0 : book.title),
                        React.createElement("h5", { className: 'text-primary' }, book === null || book === void 0 ? void 0 : book.author),
                        React.createElement("p", { className: 'lead' }, book === null || book === void 0 ? void 0 : book.description),
                        React.createElement(StarsReview_1.StarsReview, { rating: 4, size: 32 }))),
                React.createElement(CheckoutAndReviewBox_1.CheckoutAndReviewBox, { book: book, mobile: false })),
            React.createElement("hr", null)),
        React.createElement("div", { className: 'container d-lg-none mt-5' },
            React.createElement("div", { className: 'd-flex justify-content-center alighn-items-center' }, (book === null || book === void 0 ? void 0 : book.img) ?
                React.createElement("img", { src: book === null || book === void 0 ? void 0 : book.img, width: '226', height: '349', alt: 'Book' })
                :
                    React.createElement("img", { src: require('./../../Images/BooksImages/book-luv2code-1000.png'), width: '226', height: '349', alt: 'Book' })),
            React.createElement("div", { className: 'mt-4' },
                React.createElement("div", { className: 'ml-2' },
                    React.createElement("h2", null, book === null || book === void 0 ? void 0 : book.title),
                    React.createElement("h5", { className: 'text-primary' }, book === null || book === void 0 ? void 0 : book.author),
                    React.createElement("p", { className: 'lead' }, book === null || book === void 0 ? void 0 : book.description),
                    React.createElement(StarsReview_1.StarsReview, { rating: 4, size: 32 }))),
            React.createElement(CheckoutAndReviewBox_1.CheckoutAndReviewBox, { book: book, mobile: true }),
            React.createElement("hr", null))));
};
