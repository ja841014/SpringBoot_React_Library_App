"use strict";
exports.__esModule = true;
exports.Loans = void 0;
var okta_react_1 = require("@okta/okta-react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../../../api");
var SpinnerLoading_1 = require("../../Utils/SpinnerLoading");
var LoansModal_1 = require("./LoansModal");
exports.Loans = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    var _a = react_1.useState(null), httpError = _a[0], setHttpError = _a[1];
    // current Loans
    var _b = react_1.useState([]), shelfCurrentLoans = _b[0], setShelfCurrentLoans = _b[1];
    var _c = react_1.useState(true), isLoadingUserLoans = _c[0], setIsLoadingUserLoans = _c[1];
    var _d = react_1.useState(false), checkout = _d[0], setCheckout = _d[1];
    react_1.useEffect(function () {
        if (authState && authState.isAuthenticated) {
            var requestOptions = oktaHeaderSetup();
            api_1["default"].getLoansDetail({ headers: requestOptions })
                .then(function (res) {
                var responseData = res.data;
                var shelfAllLoans = Object.keys(responseData).map(function (key) { return ({
                    book: responseData[key].book,
                    daysLeft: responseData[key].daysLeft
                }); });
                setShelfCurrentLoans(shelfAllLoans);
                setIsLoadingUserLoans(false);
            })["catch"](function (error) {
                setIsLoadingUserLoans(false);
                setHttpError(error.message);
            });
        }
    }, [authState, checkout]);
    if (isLoadingUserLoans) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: "container m-5" },
            React.createElement("p", null, httpError)));
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
    function returnBook(bookId) {
        var requestOptions = oktaHeaderSetup();
        api_1["default"].returnBook({ params: bookId, headers: requestOptions })
            .then(function (res) {
            setCheckout(!checkout);
        })["catch"](function (error) {
            setHttpError(error.message);
        });
    }
    function renewLoan(bookId) {
        var requestOptions = oktaHeaderSetup();
        api_1["default"].renewLoan({ params: bookId, headers: requestOptions })
            .then(function (res) {
            setCheckout(!checkout);
        })["catch"](function (error) {
            setHttpError(error.message);
        });
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: 'd-none d-lg-block mt-2' }, shelfCurrentLoans.length > 0 ?
            React.createElement(React.Fragment, null,
                React.createElement("h5", null, "Current Loans: "),
                shelfCurrentLoans.map(function (shelfCurrentLoan) {
                    var _a, _b;
                    return (React.createElement("div", { key: shelfCurrentLoan.book.id },
                        React.createElement("div", { className: 'row mt-3 mb-3' },
                            React.createElement("div", { className: 'col-4 col-md-4 container' }, ((_a = shelfCurrentLoan.book) === null || _a === void 0 ? void 0 : _a.img) ?
                                React.createElement("img", { src: (_b = shelfCurrentLoan.book) === null || _b === void 0 ? void 0 : _b.img, width: '226', height: '349', alt: 'Book' })
                                :
                                    React.createElement("img", { src: require('./../../../Images/BooksImages/book-luv2code-1000.png'), width: '226', height: '349', alt: 'Book' })),
                            React.createElement("div", { className: 'card col-3 col-md-3 container d-flex' },
                                React.createElement("div", { className: 'card-body' },
                                    React.createElement("div", { className: 'mt-3' },
                                        React.createElement("h4", null, "Loan Options"),
                                        shelfCurrentLoan.daysLeft > 0 &&
                                            React.createElement("p", { className: 'text-secondary' },
                                                "Due in ",
                                                shelfCurrentLoan.daysLeft,
                                                " days."),
                                        shelfCurrentLoan.daysLeft === 0 &&
                                            React.createElement("p", { className: 'text-success' }, "Due Today."),
                                        shelfCurrentLoan.daysLeft < 0 &&
                                            React.createElement("p", { className: 'text-danger' },
                                                "Past due by ",
                                                shelfCurrentLoan.daysLeft,
                                                " days."),
                                        React.createElement("div", { className: 'list-group mt-3' },
                                            React.createElement("button", { className: 'list-group-item list-group-item-action', "aria-current": 'true', "data-bs-toggle": 'modal', "data-bs-target": "#modal" + shelfCurrentLoan.book.id }, "Manage Loan"),
                                            React.createElement(react_router_dom_1.Link, { to: '/search', className: 'list-group-item list-group-item-action' }, "Search more books?"))),
                                    React.createElement("hr", null),
                                    React.createElement("p", { className: 'mt-3' }, "Help other find their adventure by reviewing your loan."),
                                    React.createElement(react_router_dom_1.Link, { className: 'btn btn-primary', to: "/checkout/" + shelfCurrentLoan.book.id }, "Leave a review")))),
                        React.createElement("hr", null),
                        React.createElement(LoansModal_1.LoansModal, { shelfCurrentLoan: shelfCurrentLoan, mobile: false, returnBook: returnBook, renewLoan: renewLoan })));
                }))
            :
                React.createElement(React.Fragment, null,
                    React.createElement("h3", { className: 'mt-3' }, "Currently no loans"),
                    React.createElement(react_router_dom_1.Link, { className: 'btn btn-primary', to: "search" }, "Search for a new book"))),
        React.createElement("div", { className: 'container d-lg-none mt-2' }, shelfCurrentLoans.length > 0 ?
            React.createElement(React.Fragment, null,
                React.createElement("h5", { className: 'mb-3' }, "Current Loans: "),
                shelfCurrentLoans.map(function (shelfCurrentLoan) {
                    var _a, _b;
                    return (React.createElement("div", { key: shelfCurrentLoan.book.id },
                        React.createElement("div", { className: 'd-flex justify-content-center align-items-center' }, ((_a = shelfCurrentLoan.book) === null || _a === void 0 ? void 0 : _a.img) ?
                            React.createElement("img", { src: (_b = shelfCurrentLoan.book) === null || _b === void 0 ? void 0 : _b.img, width: '226', height: '349', alt: 'Book' })
                            :
                                React.createElement("img", { src: require('./../../../Images/BooksImages/book-luv2code-1000.png'), width: '226', height: '349', alt: 'Book' })),
                        React.createElement("div", { className: 'card d-flex mt-5 mb-3' },
                            React.createElement("div", { className: 'card-body container' },
                                React.createElement("div", { className: 'mt-3' },
                                    React.createElement("h4", null, "Loan Options"),
                                    shelfCurrentLoan.daysLeft > 0 &&
                                        React.createElement("p", { className: 'text-secondary' },
                                            "Due in ",
                                            shelfCurrentLoan.daysLeft,
                                            " days."),
                                    shelfCurrentLoan.daysLeft === 0 &&
                                        React.createElement("p", { className: 'text-success' }, "Due Today."),
                                    shelfCurrentLoan.daysLeft < 0 &&
                                        React.createElement("p", { className: 'text-danger' },
                                            "Past due by ",
                                            shelfCurrentLoan.daysLeft,
                                            " days."),
                                    React.createElement("div", { className: 'list-group mt-3' },
                                        React.createElement("button", { className: 'list-group-item list-group-item-action', "aria-current": 'true', "data-bs-toggle": 'modal', "data-bs-target": "#mobilemodal" + shelfCurrentLoan.book.id }, "Manage Loan"),
                                        React.createElement(react_router_dom_1.Link, { to: 'search', className: 'list-group-item list-group-item-action' }, "Search more books?"))),
                                React.createElement("hr", null),
                                React.createElement("p", { className: 'mt-3' }, "Help other find their adventure by reviewing your loan."),
                                React.createElement(react_router_dom_1.Link, { className: 'btn btn-primary', to: "/checkout/" + shelfCurrentLoan.book.id }, "Leave a review"))),
                        React.createElement("hr", null),
                        React.createElement(LoansModal_1.LoansModal, { shelfCurrentLoan: shelfCurrentLoan, mobile: true, returnBook: returnBook, renewLoan: renewLoan })));
                })) :
            React.createElement(React.Fragment, null,
                React.createElement("h3", { className: 'mt-3' }, "Currently no loans"),
                React.createElement(react_router_dom_1.Link, { className: 'btn btn-primary', to: "search" }, "Search for a new book")))));
};
