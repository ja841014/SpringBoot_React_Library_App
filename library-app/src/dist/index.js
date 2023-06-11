"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_1 = require("./App");
require("./index.css");
var react_router_dom_1 = require("react-router-dom");
var stripe_js_1 = require("@stripe/stripe-js");
var react_stripe_js_1 = require("@stripe/react-stripe-js");
var stripePromise = stripe_js_1.loadStripe('pk_test_51ND1RnJRJbQ8b793bNC0qIFSZqbVQaVDm4OD3r3z7tjlSyHkWwXor7igqowmzbbuYETkZ3pJNHs5mZUOOId9DDbe00Nhm7PsPR');
var root = client_1["default"].createRoot(document.getElementById('root'));
root.render(
// <React.StrictMode>
react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
    react_1["default"].createElement(react_stripe_js_1.Elements, { stripe: stripePromise },
        react_1["default"].createElement(App_1.App, null)))
// </React.StrictMode>
);
