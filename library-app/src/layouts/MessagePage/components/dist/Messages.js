"use strict";
exports.__esModule = true;
exports.Messages = void 0;
var react_1 = require("react");
var okta_react_1 = require("@okta/okta-react");
var SpinnerLoading_1 = require("../../Utils/SpinnerLoading");
var Pagination_1 = require("../../Utils/Pagination");
var api_1 = require("../../../api");
exports.Messages = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    var _a = react_1.useState(true), isLoadingMessages = _a[0], setIsLoadingMessages = _a[1];
    var _b = react_1.useState(null), httpError = _b[0], setHttpError = _b[1];
    // Messages
    var _c = react_1.useState([]), messages = _c[0], setMessages = _c[1];
    // Pagination
    var messagesPerPage = react_1.useState(5)[0];
    var _d = react_1.useState(1), currentPage = _d[0], setCurrentPage = _d[1];
    var _e = react_1.useState(0), totalPages = _e[0], setTotalPages = _e[1];
    react_1.useEffect(function () {
        if (authState && authState.isAuthenticated) {
            var requestOptions = oktaHeaderSetup();
            var params = { page: currentPage - 1, size: messagesPerPage };
            api_1["default"].getAllQuestionByUserEmail({ headers: requestOptions, params: params })
                .then(function (res) {
                var responseData = res.data.content;
                setTotalPages(res.data.totalPages);
                var allMessages = Object.keys(responseData).map(function (key) { return ({
                    title: responseData[key].title,
                    question: responseData[key].question,
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    adminEmail: responseData[key].adminEmail,
                    response: responseData[key].response
                }); });
                setMessages(allMessages);
                setIsLoadingMessages(false);
                window.scrollTo(0, 0);
            })["catch"](function (err) {
                console.error("getAllQuestionByUserEmail Error" + err.messages);
                setIsLoadingMessages(false);
                setHttpError(err.messages);
            });
        }
    }, [authState, currentPage]);
    if (isLoadingMessages) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: 'container m-5' },
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
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    return (React.createElement("div", { className: 'mt-2' },
        messages.length > 0 ?
            React.createElement(React.Fragment, null,
                React.createElement("h5", null, "Current Q/A: "),
                messages.map(function (message) { return (React.createElement("div", { key: message.id },
                    React.createElement("div", { className: 'card mt-2 shadow p-3 bg-body rounded' },
                        React.createElement("h5", null,
                            "Case #",
                            message.id,
                            ": ",
                            message.title),
                        React.createElement("h6", null, message.userEmail),
                        React.createElement("p", null, message.question),
                        React.createElement("hr", null),
                        React.createElement("div", null,
                            React.createElement("h5", null, "Response: "),
                            message.response && message.adminEmail ?
                                React.createElement(React.Fragment, null,
                                    React.createElement("h6", null,
                                        message.adminEmail,
                                        " (admin)"),
                                    React.createElement("p", null, message.response))
                                :
                                    React.createElement("p", null,
                                        React.createElement("i", null, "Pending response from administration. Please be patient.")))))); }))
            :
                React.createElement("h5", null, "All questions you submit will be shown here"),
        totalPages > 1 && React.createElement(Pagination_1.Pagination, { currentPage: currentPage, totalPages: totalPages, paginate: paginate })));
};
