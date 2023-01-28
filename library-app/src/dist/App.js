"use strict";
exports.__esModule = true;
exports.App = void 0;
var react_1 = require("react");
require("./App.css");
var Navbar_1 = require("./layouts/NavbarAndFooter/Navbar");
var Footer_1 = require("./layouts/NavbarAndFooter/Footer");
var SearchBookPage_1 = require("./layouts/SearchBookPage/SearchBookPage");
exports.App = function () {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(Navbar_1.Navbar, null),
        react_1["default"].createElement(SearchBookPage_1.SearchBookPage, null),
        react_1["default"].createElement(Footer_1.Footer, null)));
};
