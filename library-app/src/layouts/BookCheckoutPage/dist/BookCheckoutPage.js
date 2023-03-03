"use strict";
exports.__esModule = true;
exports.BookCheckoutPage = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../../api");
var SpinnerLoading_1 = require("../Utils/SpinnerLoading");
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
        React.createElement("h3", null, "Hello World")));
};
