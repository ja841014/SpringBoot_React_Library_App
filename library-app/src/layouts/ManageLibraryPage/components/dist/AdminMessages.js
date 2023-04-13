"use strict";
exports.__esModule = true;
exports.AdminMessages = void 0;
var okta_react_1 = require("@okta/okta-react");
var react_1 = require("react");
var api_1 = require("../../../api");
var AdminMessageRequest_1 = require("../../../models/AdminMessageRequest");
var Pagination_1 = require("../../Utils/Pagination");
var SpinnerLoading_1 = require("../../Utils/SpinnerLoading");
var AdminMessage_1 = require("./AdminMessage");
// import { AdminMessage } from './AdminMessage';
exports.AdminMessages = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    // Normal Loading Pieces
    var _a = react_1.useState(true), isLoadingMessages = _a[0], setIsLoadingMessages = _a[1];
    var _b = react_1.useState(null), httpError = _b[0], setHttpError = _b[1];
    // Messages endpoint State
    var _c = react_1.useState([]), messages = _c[0], setMessages = _c[1];
    var messagesPerPage = react_1.useState(5)[0];
    // Pagination
    var _d = react_1.useState(1), currentPage = _d[0], setCurrentPage = _d[1];
    var _e = react_1.useState(0), totalPages = _e[0], setTotalPages = _e[1];
    // Recall useEffect
    var _f = react_1.useState(false), btnSubmit = _f[0], setBtnSubmit = _f[1];
    react_1.useEffect(function () {
        if (authState && authState.isAuthenticated) {
            var requestOptions = oktaHeaderSetup();
            var params = { page: currentPage - 1, size: messagesPerPage };
            api_1["default"].getAllQuestionByClosed({ headers: requestOptions, params: params })
                .then(function (res) {
                var responseData = res.data.content;
                console.log(responseData);
                var openedMessage = Object.keys(responseData).map(function (key) { return ({
                    title: responseData[key].title,
                    question: responseData[key].question,
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail
                }); });
                setTotalPages(res.data.totalPages);
                setMessages(openedMessage);
                setIsLoadingMessages(false);
                window.scrollTo(0, 0);
            })["catch"](function (error) {
                console.error("getAllQuestionByClosed error");
                setIsLoadingMessages(false);
                setHttpError(error.message);
            });
        }
    }, [currentPage, authState, btnSubmit]);
    function submitResponseToQuestion(id, response) {
        if (authState && authState.isAuthenticated && id !== null && response !== '') {
            var requestOptions = oktaHeaderSetup();
            var adminMessageRequest = new AdminMessageRequest_1["default"](id, response);
            api_1["default"].submitQuestionResponse({ data: adminMessageRequest, headers: requestOptions })
                .then(function (res) {
                setBtnSubmit(!btnSubmit);
            })["catch"](function (err) {
                console.error("submitQuestionResponse error");
                setHttpError(err.message);
            });
        }
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
    if (isLoadingMessages) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: 'container m-5' },
            React.createElement("p", null, httpError)));
    }
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    return (React.createElement("div", { className: 'mt-3' },
        messages.length > 0 ?
            React.createElement(React.Fragment, null,
                React.createElement("h5", null, "Pending Q/A: "),
                messages.map(function (message) { return (React.createElement(AdminMessage_1.AdminMessage, { message: message, key: message.id, submitResponseToQuestion: submitResponseToQuestion })); }))
            :
                React.createElement("h5", null, "No pending Q/A"),
        totalPages > 1 && React.createElement(Pagination_1.Pagination, { currentPage: currentPage, totalPages: totalPages, paginate: paginate })));
};
