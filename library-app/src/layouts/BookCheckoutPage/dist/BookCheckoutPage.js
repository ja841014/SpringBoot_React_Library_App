"use strict";
exports.__esModule = true;
exports.BookCheckoutPage = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../../api");
var SpinnerLoading_1 = require("../Utils/SpinnerLoading");
var StarsReview_1 = require("../Utils/StarsReview");
var CheckoutAndReviewBox_1 = require("./CheckoutAndReviewBox");
var LatestReviews_1 = require("./LatestReviews");
exports.BookCheckoutPage = function () {
    var _a = react_1.useState(), book = _a[0], setBook = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState(null), httpError = _c[0], setHttpError = _c[1];
    // Review State
    var _d = react_1.useState([]), reviews = _d[0], setReviews = _d[1];
    var _e = react_1.useState(0), totalStars = _e[0], setTotalStars = _e[1];
    var _f = react_1.useState(true), isLoadingReview = _f[0], setIsLoadingReview = _f[1];
    // get bookId from url
    var bookParams = react_router_dom_1.useParams();
    var bookId = bookParams.bookId;
    // get book information from backend
    react_1.useEffect(function () {
        api_1["default"].getBook({ id: bookId }).then(function (res) {
            var responsedata = res.data;
            console.log("book data");
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
            console.error("Loading Book Error");
            setIsLoading(false);
            setHttpError(error.message);
            throw new Error(error.message);
        }));
    }, []);
    react_1.useEffect(function () {
        api_1["default"].getReviewByBookId({ id: bookId, page: 0, size: 10 }).then(function (res) {
            var responsedata = res.data.content;
            console.log("review Data: ");
            console.log(responsedata);
            var reviews = [];
            var weightedStarReview = 0;
            for (var key in responsedata) {
                reviews.push({
                    id: responsedata[key].id,
                    userEmail: responsedata[key].userEmail,
                    date: responsedata[key].date,
                    rating: responsedata[key].rating,
                    book_id: responsedata[key].bookId,
                    reviewDescription: responsedata[key].reviewDescription
                });
                weightedStarReview = weightedStarReview + responsedata[key].rating;
                console.log("weightedStarReview: " + weightedStarReview);
            }
            if (reviews) {
                var round = (Math.round((weightedStarReview / reviews.length) * 2) / 2).toFixed(1);
                console.log("round Star: " + weightedStarReview + ", " + reviews.length + ", " + round);
                setTotalStars(Number(round));
            }
            setReviews(reviews);
            setIsLoadingReview(false);
        }, (function (error) {
            console.error("Loading Review Error");
            setIsLoadingReview(false);
            setHttpError(error.message);
            throw new Error(error.message);
        }));
    }, []);
    if (isLoading || isLoadingReview) {
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
                        React.createElement(StarsReview_1.StarsReview, { rating: totalStars, size: 32 }))),
                React.createElement(CheckoutAndReviewBox_1.CheckoutAndReviewBox, { book: book, mobile: false })),
            React.createElement("hr", null),
            React.createElement(LatestReviews_1.LatestReviews, { reviews: reviews, bookId: book === null || book === void 0 ? void 0 : book.id, mobile: false })),
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
                    React.createElement(StarsReview_1.StarsReview, { rating: totalStars, size: 32 }))),
            React.createElement(CheckoutAndReviewBox_1.CheckoutAndReviewBox, { book: book, mobile: true }),
            React.createElement("hr", null),
            React.createElement(LatestReviews_1.LatestReviews, { reviews: reviews, bookId: book === null || book === void 0 ? void 0 : book.id, mobile: true }))));
};
