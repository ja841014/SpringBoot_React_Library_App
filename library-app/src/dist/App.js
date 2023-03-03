"use strict";
exports.__esModule = true;
exports.App = void 0;
var react_1 = require("react");
require("./App.css");
var Navbar_1 = require("./layouts/NavbarAndFooter/Navbar");
var Footer_1 = require("./layouts/NavbarAndFooter/Footer");
var HomePage_1 = require("./layouts/HomePage/HomePage");
var SearchBookPage_1 = require("./layouts/SearchBookPage/SearchBookPage");
var react_router_dom_1 = require("react-router-dom");
var BookCheckoutPage_1 = require("./layouts/BookCheckoutPage/BookCheckoutPage");
exports.App = function () {
    return (react_1["default"].createElement("div", { className: 'd-flex flex-column min-vh-100' },
        react_1["default"].createElement(Navbar_1.Navbar, null),
        react_1["default"].createElement("div", { className: 'flex-grow-1' },
            react_1["default"].createElement(react_router_dom_1.Switch, null,
                react_1["default"].createElement(react_router_dom_1.Route, { path: '/', exact: true },
                    react_1["default"].createElement(react_router_dom_1.Redirect, { to: '/home' })),
                react_1["default"].createElement(react_router_dom_1.Route, { path: '/home' },
                    react_1["default"].createElement(HomePage_1.HomePage, null)),
                react_1["default"].createElement(react_router_dom_1.Route, { path: '/search' },
                    react_1["default"].createElement(SearchBookPage_1.SearchBookPage, null)),
                react_1["default"].createElement(react_router_dom_1.Route, { path: '/checkout/:bookId' },
                    react_1["default"].createElement(BookCheckoutPage_1.BookCheckoutPage, null)))),
        react_1["default"].createElement(Footer_1.Footer, null)));
};
