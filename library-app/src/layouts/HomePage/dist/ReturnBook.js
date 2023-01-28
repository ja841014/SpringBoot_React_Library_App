"use strict";
exports.__esModule = true;
exports.ReturnBook = void 0;
var react_1 = require("react");
exports.ReturnBook = function () {
    return (react_1["default"].createElement("div", { className: "col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3" },
        react_1["default"].createElement("div", { className: "text-center" },
            react_1["default"].createElement("img", { src: require("./../Images/BooksImages/book-luv2code-1000.png"), width: '151', height: '233', alt: "book" }),
            react_1["default"].createElement("h6", { className: "mt-2" }, " Book"),
            react_1["default"].createElement("p", null, " Luv2Code"),
            react_1["default"].createElement("a", { className: "btn primary-color text-white", href: "#" }, " Reserve"))));
};
