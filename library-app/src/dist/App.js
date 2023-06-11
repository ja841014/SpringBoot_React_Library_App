"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var okta_auth_js_1 = require("@okta/okta-auth-js");
var okta_react_1 = require("@okta/okta-react");
var oktaConfig_1 = require("./lib/oktaConfig");
var LoginWidget_1 = require("./Auth/LoginWidget");
var ReviewListPage_1 = require("./layouts/BookCheckoutPage/ReviewListPage");
var ShelfPage_1 = require("./layouts/ShelfPage/ShelfPage");
var MessagePage_1 = require("./layouts/MessagePage/MessagePage");
var ManageLibraryPage_1 = require("./layouts/ManageLibraryPage/ManageLibraryPage");
var PaymentPage_1 = require("./layouts/BookCheckoutPage/PaymentPage/PaymentPage");
exports.App = function () {
    var oktaAuth = new okta_auth_js_1.OktaAuth(oktaConfig_1.oktaConfig);
    var history = react_router_dom_1.useHistory();
    // https://github.com/okta/okta-react
    var customAuthHandler = function () {
        history.push('/login');
    };
    var restoreOriginalUri = function (_oktaAuth, originalUri) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            history.replace(okta_auth_js_1.toRelativeUrl(originalUri || '/', window.location.origin));
            return [2 /*return*/];
        });
    }); };
    return (react_1["default"].createElement("div", { className: 'd-flex flex-column min-vh-100' },
        react_1["default"].createElement(okta_react_1.Security, { oktaAuth: oktaAuth, restoreOriginalUri: restoreOriginalUri, onAuthRequired: customAuthHandler },
            react_1["default"].createElement(Navbar_1.Navbar, null),
            react_1["default"].createElement("div", { className: 'flex-grow-1' },
                react_1["default"].createElement(react_router_dom_1.Switch, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/', exact: true },
                        react_1["default"].createElement(react_router_dom_1.Redirect, { to: '/home' })),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/home' },
                        react_1["default"].createElement(HomePage_1.HomePage, null)),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/search' },
                        react_1["default"].createElement(SearchBookPage_1.SearchBookPage, null)),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/reviewlist/:bookId' },
                        react_1["default"].createElement(ReviewListPage_1.ReviewListPage, null)),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/checkout/:bookId' },
                        react_1["default"].createElement(BookCheckoutPage_1.BookCheckoutPage, null)),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/login', render: function () { return react_1["default"].createElement(LoginWidget_1["default"], { oktaConfig: oktaConfig_1.oktaConfig }); } }),
                    react_1["default"].createElement(react_router_dom_1.Route, { path: '/login/callback', component: okta_react_1.LoginCallback }),
                    react_1["default"].createElement(okta_react_1.SecureRoute, { path: '/shelf' },
                        react_1["default"].createElement(ShelfPage_1.ShelfPage, null)),
                    react_1["default"].createElement(okta_react_1.SecureRoute, { path: '/messages' },
                        react_1["default"].createElement(MessagePage_1.MessagePage, null)),
                    react_1["default"].createElement(okta_react_1.SecureRoute, { path: '/admin' },
                        react_1["default"].createElement(ManageLibraryPage_1.ManageLibraryPage, null)),
                    react_1["default"].createElement(okta_react_1.SecureRoute, { path: '/fees' },
                        react_1["default"].createElement(PaymentPage_1.PaymentPage, null)))),
            react_1["default"].createElement(Footer_1.Footer, null))));
};
