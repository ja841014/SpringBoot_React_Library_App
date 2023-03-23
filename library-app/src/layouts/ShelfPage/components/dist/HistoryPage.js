"use strict";
exports.__esModule = true;
exports.HistoryPage = void 0;
var okta_react_1 = require("@okta/okta-react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../../../api");
var Pagination_1 = require("../../Utils/Pagination");
var SpinnerLoading_1 = require("../../Utils/SpinnerLoading");
exports.HistoryPage = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    var _a = react_1.useState(true), isLoadingHistory = _a[0], setIsLoadingHistory = _a[1];
    var _b = react_1.useState(null), httpError = _b[0], setHttpError = _b[1];
    // Histories
    var _c = react_1.useState([]), histories = _c[0], setHistories = _c[1];
    // Pagination
    var _d = react_1.useState(1), currentPage = _d[0], setCurrentPage = _d[1];
    var _e = react_1.useState(0), totalPages = _e[0], setTotalPages = _e[1];
    var _f = react_1.useState(0), totalAmountOfHistories = _f[0], setTotalAmountOfHistories = _f[1];
    var historiesPerPage = 5;
    react_1.useEffect(function () {
        if (authState && authState.isAuthenticated) {
            var requestOptions = oktaHeaderSetup();
            var params = { page: currentPage - 1, size: historiesPerPage };
            api_1["default"].getHistory({ headers: requestOptions, params: params })
                .then(function (res) {
                var responseData = res.data.content;
                console.log(responseData);
                setTotalAmountOfHistories(res.data.totalElements);
                setTotalPages(res.data.totalPages);
                var histories = Object.keys(responseData).map(function (key) { return ({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    checkoutDate: responseData[key].checkoutDate,
                    returnDate: responseData[key].returnDate,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    img: responseData[key].img
                }); });
                setHistories(histories);
                setIsLoadingHistory(false);
            })["catch"](function (error) {
                setIsLoadingHistory(false);
                setHttpError(error.message);
            });
        }
    }, [authState, currentPage]);
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
    if (isLoadingHistory) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: 'container m-5' },
            React.createElement("p", null, httpError)));
    }
    // const indexOfLastBook: number = currentPage * historiesPerPage;
    // const indexOfFirstBook: number = indexOfLastBook - historiesPerPage;
    // let lastItemIdx = historiesPerPage * currentPage <= totalAmountOfHistories ? historiesPerPage * currentPage : totalAmountOfHistories
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    return (React.createElement("div", { className: 'mt-2' },
        histories.length > 0 ?
            React.createElement(React.Fragment, null,
                React.createElement("h5", null, "Recent History:"),
                histories.map(function (history) { return (React.createElement("div", { key: history.id },
                    React.createElement("div", { className: 'card mt-3 shadow p-3 mb-3 bg-body rounded' },
                        React.createElement("div", { className: 'row g-0' },
                            React.createElement("div", { className: 'col-md-2' },
                                React.createElement("div", { className: 'd-none d-lg-block' }, history.img ?
                                    React.createElement("img", { src: history.img, width: '123', height: '196', alt: 'Book' })
                                    :
                                        React.createElement("img", { src: require('./../../../Images/BooksImages/book-luv2code-1000.png'), width: '123', height: '196', alt: 'Default' })),
                                React.createElement("div", { className: 'd-lg-none d-flex justify-content-center align-items-center' }, history.img ?
                                    React.createElement("img", { src: history.img, width: '123', height: '196', alt: 'Book' })
                                    :
                                        React.createElement("img", { src: require('./../../../Images/BooksImages/book-luv2code-1000.png'), width: '123', height: '196', alt: 'Default' }))),
                            React.createElement("div", { className: 'col' },
                                React.createElement("div", { className: 'card-body' },
                                    React.createElement("h5", { className: 'card-title' },
                                        " ",
                                        history.author,
                                        " "),
                                    React.createElement("h4", null, history.title),
                                    React.createElement("p", { className: 'card-text' }, history.description),
                                    React.createElement("hr", null),
                                    React.createElement("p", { className: 'card-text' },
                                        " Checked out on: ",
                                        history.checkoutDate),
                                    React.createElement("p", { className: 'card-text' },
                                        " Returned on: ",
                                        history.returnDate))))),
                    React.createElement("hr", null))); }))
            :
                React.createElement(React.Fragment, null,
                    React.createElement("h3", { className: 'mt-3' }, "Currently no history: "),
                    React.createElement(react_router_dom_1.Link, { className: 'btn btn-primary', to: 'search' }, "Search for new book")),
        totalPages > 1 && React.createElement(Pagination_1.Pagination, { currentPage: currentPage, totalPages: totalPages, paginate: paginate })));
};
