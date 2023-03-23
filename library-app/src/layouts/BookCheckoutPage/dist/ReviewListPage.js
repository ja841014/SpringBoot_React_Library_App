"use strict";
exports.__esModule = true;
exports.ReviewListPage = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../../api");
var Pagination_1 = require("../Utils/Pagination");
var Review_1 = require("../Utils/Review");
var SpinnerLoading_1 = require("../Utils/SpinnerLoading");
exports.ReviewListPage = function () {
    // get bookId from url
    var bookParams = react_router_dom_1.useParams();
    var bookId = bookParams.bookId;
    var _a = react_1.useState([]), reviews = _a[0], setReviews = _a[1];
    var _b = react_1.useState(null), httpError = _b[0], setHttpError = _b[1];
    var _c = react_1.useState(true), isLoadingReviews = _c[0], setIsLoadingReviews = _c[1];
    var _d = react_1.useState(1), currentPage = _d[0], setCurrentPage = _d[1];
    var reviewsPerPage = react_1.useState(5)[0];
    var _e = react_1.useState(0), totalAmountOfReviews = _e[0], setTotalAmountOfReviews = _e[1];
    var _f = react_1.useState(0), totalPages = _f[0], setTotalPages = _f[1];
    // get book review
    react_1.useEffect(function () {
        api_1["default"].getReviewByBookId({ id: bookId, page: 0, size: 10 })
            .then(function (res) {
            var responsedata = res.data.content;
            setTotalAmountOfReviews(res.data.totalElements);
            setTotalPages(res.data.totalPages);
            var reviews = [];
            for (var key in responsedata) {
                reviews.push({
                    id: responsedata[key].id,
                    userEmail: responsedata[key].userEmail,
                    date: responsedata[key].date,
                    rating: responsedata[key].rating,
                    book_id: responsedata[key].bookId,
                    reviewDescription: responsedata[key].reviewDescription
                });
            }
            setReviews(reviews);
            setIsLoadingReviews(false);
        })["catch"](function (error) {
            console.error("Loading Review Error");
            setIsLoadingReviews(false);
            setHttpError(error.message);
            throw new Error(error.message);
        });
    }, [currentPage]);
    if (isLoadingReviews) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: "container m-5" },
            React.createElement("p", null, httpError)));
    }
    var indexOfLastReview = currentPage * reviewsPerPage;
    var indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    var lastItemIdx = reviewsPerPage * currentPage <= totalAmountOfReviews ? reviewsPerPage * currentPage : totalAmountOfReviews;
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    return (React.createElement("div", { className: "container mt-5" },
        React.createElement("div", null,
            React.createElement("h3", null,
                "Comments: (",
                reviews.length,
                ")")),
        React.createElement("p", null,
            indexOfFirstReview + 1,
            " to ",
            lastItemIdx,
            " of ",
            totalAmountOfReviews,
            " items:"),
        React.createElement("div", { className: "row" }, reviews.map(function (review) { return (React.createElement(Review_1.Review, { review: review, key: review.id })); })),
        totalPages > 1 && React.createElement(Pagination_1.Pagination, { currentPage: currentPage, totalPages: totalPages, paginate: paginate })));
};
