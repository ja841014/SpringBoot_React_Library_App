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
var okta_react_1 = require("@okta/okta-react");
var ReviewRequestModel_1 = require("../../models/ReviewRequestModel");
exports.BookCheckoutPage = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    var _a = react_1.useState(null), httpError = _a[0], setHttpError = _a[1];
    var _b = react_1.useState(), book = _b[0], setBook = _b[1];
    var _c = react_1.useState(true), isLoading = _c[0], setIsLoading = _c[1];
    // Loans Count state
    var _d = react_1.useState(0), currentLoansCount = _d[0], setCurrentLoansCount = _d[1];
    var _e = react_1.useState(true), isLoadingCurrentLoansCount = _e[0], setIsLoadingCurrentLoansCount = _e[1];
    // Review State
    var _f = react_1.useState([]), reviews = _f[0], setReviews = _f[1];
    var _g = react_1.useState(true), isLoadingReview = _g[0], setIsLoadingReview = _g[1];
    var _h = react_1.useState(0), totalStars = _h[0], setTotalStars = _h[1];
    // get bookId from url
    var bookParams = react_router_dom_1.useParams();
    var bookId = bookParams.bookId;
    // Is Book Check out
    var _j = react_1.useState(false), isCheckedOut = _j[0], setIsCheckedOut = _j[1];
    var _k = react_1.useState(true), isLoadingBookCheckedOut = _k[0], setIsLoadingBookCheckedOut = _k[1];
    //is review left
    var _l = react_1.useState(false), isReviewLeft = _l[0], setIsReviewLeft = _l[1];
    var _m = react_1.useState(true), isLoadingUserReview = _m[0], setIsLoadingUserReview = _m[1];
    // get book information from backend
    react_1.useEffect(function () {
        api_1["default"].getBook({ id: bookId })
            .then(function (res) {
            var responsedata = res.data;
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
        })["catch"](function (error) {
            console.error("Loading Book Error");
            setIsLoading(false);
            setHttpError(error.message);
            throw new Error(error.message);
        });
    }, [isCheckedOut]);
    // get book review
    react_1.useEffect(function () {
        api_1["default"].getReviewByBookId({ id: bookId, page: 0, size: 10 })
            .then(function (res) {
            var responsedata = res.data.content;
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
            }
            if (reviews) {
                var round = (Math.round((weightedStarReview / reviews.length) * 2) / 2).toFixed(1);
                console.log("round Star: " + weightedStarReview + ", " + reviews.length + ", " + round);
                setTotalStars(Number(round));
            }
            setReviews(reviews);
            setIsLoadingReview(false);
        })["catch"](function (error) {
            console.error("Loading Review Error");
            setIsLoadingReview(false);
            setHttpError(error.message);
            throw new Error(error.message);
        });
    }, [isReviewLeft]);
    // to see whether the user leave the review or not
    react_1.useEffect(function () {
        if (authState && authState.isAuthenticated) {
            var requestOptions = oktaHeaderSetup();
            api_1["default"].isLeftReview({ params: bookId, headers: requestOptions })
                .then(function (res) {
                var responseData = res.data;
                console.log("isLeftReview");
                console.log(responseData);
                if (responseData) {
                    setIsReviewLeft(true);
                }
            })["catch"](function (error) {
                console.error("Loading isLeftReview Error");
                setIsLoadingUserReview(false);
                setHttpError(error.message);
                throw new Error(error.message);
            });
        }
        setIsLoadingUserReview(false);
    });
    // get current user's checkout how many book already
    react_1.useEffect(function () {
        if (authState && authState.isAuthenticated) {
            var requestOptions = oktaHeaderSetup();
            api_1["default"].getCurrentLoansCountByUser({ requestOptions: requestOptions })
                .then(function (res) {
                var responsedata = res.data;
                console.log("getCurrentLoansCountByUser");
                console.log(responsedata);
                setCurrentLoansCount(responsedata);
            })["catch"](function (error) {
                console.error("Loading LoadingCurrentLoansCount Error");
                setIsLoadingCurrentLoansCount(false);
                setHttpError(error.message);
                throw new Error(error.message);
            });
        }
        setIsLoadingCurrentLoansCount(false);
    }, [authState, isCheckedOut]);
    // get current user checkout current book or not
    react_1.useEffect(function () {
        if (authState && authState.isAuthenticated) {
            var requestOptions = oktaHeaderSetup();
            api_1["default"].isCheckoutByUser({ params: bookId, headers: requestOptions })
                .then(function (res) {
                var responseData = res.data;
                console.log("isCheckoutByUser");
                console.log(responseData);
                if (responseData) {
                    setIsCheckedOut(true);
                }
            })["catch"](function (error) {
                console.error("Loading LoadingCurrentLoansCount Error");
                setIsLoadingBookCheckedOut(false);
                setHttpError(error.message);
                throw new Error(error.message);
            });
        }
        setIsLoadingBookCheckedOut(false);
    }, [authState]);
    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckedOut || isLoadingUserReview) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: "container m-5" },
            React.createElement("p", null, httpError)));
    }
    function checkoutBook() {
        var requestOptions = oktaHeaderSetup();
        api_1["default"].checkoutBook({ params: bookId, headers: requestOptions })
            .then(function (res) {
            var responseData = res.data;
            console.log("checkoutBook");
            if (responseData) {
                setIsCheckedOut(true);
            }
        })["catch"](function (error) {
            console.error("Loading checkoutBook Error");
            setIsLoadingBookCheckedOut(false);
            setHttpError(error.message);
            throw new Error(error.message);
        });
    }
    function submitReview(star, reviewDescription) {
        var requestOptions = oktaHeaderSetup();
        var curBook;
        var reviewRequestModel = null;
        if (book) {
            curBook = book;
            reviewRequestModel = new ReviewRequestModel_1["default"](star, curBook, reviewDescription);
        }
        else {
            console.error("book is not set");
        }
        api_1["default"].submitReview({ data: reviewRequestModel, headers: requestOptions })
            .then(function (res) {
            var responseData = res.data;
            console.log("submitReview");
            console.log(responseData);
            setIsReviewLeft(true);
        })["catch"](function (error) {
            console.error("submitReview Error");
            setHttpError(error.message);
            throw new Error(error.message);
        });
    }
    function oktaHeaderSetup() {
        var _a;
        var requestOptions = {
            headers: {
                "Authorization": "Bearer " + ((_a = authState === null || authState === void 0 ? void 0 : authState.accessToken) === null || _a === void 0 ? void 0 : _a.accessToken),
                "Content-Type": 'application/json'
            }
        };
        return requestOptions;
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
                React.createElement(CheckoutAndReviewBox_1.CheckoutAndReviewBox, { book: book, mobile: false, currentLoansCount: currentLoansCount, isCheckedOut: isCheckedOut, isAuthenticated: authState === null || authState === void 0 ? void 0 : authState.isAuthenticated, checkoutBook: checkoutBook, isReviewLeft: isReviewLeft, submitReview: submitReview })),
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
            React.createElement(CheckoutAndReviewBox_1.CheckoutAndReviewBox, { book: book, mobile: true, currentLoansCount: currentLoansCount, isCheckedOut: isCheckedOut, isAuthenticated: authState === null || authState === void 0 ? void 0 : authState.isAuthenticated, checkoutBook: checkoutBook, isReviewLeft: isReviewLeft, submitReview: submitReview }),
            React.createElement("hr", null),
            React.createElement(LatestReviews_1.LatestReviews, { reviews: reviews, bookId: book === null || book === void 0 ? void 0 : book.id, mobile: true }))));
};
