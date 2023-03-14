"use strict";
exports.__esModule = true;
exports.LibraryServices = void 0;
var react_router_dom_1 = require("react-router-dom");
var okta_react_1 = require("@okta/okta-react");
exports.LibraryServices = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    return (React.createElement("div", { className: 'container my-5' },
        React.createElement("div", { className: 'row p-4 align-items-center border shadow-lg' },
            React.createElement("div", { className: 'col-lg-7 p-3' },
                React.createElement("h1", { className: 'display-4 fw-bold' }, "Can't find what you are looking for?"),
                React.createElement("p", { className: 'lead' }, "If you cannot find what you are looking for, send our library admin's a personal message!"),
                React.createElement("div", { className: 'd-grid gap-2 justify-content-md-start mb-4 mb-lg-3' }, (authState === null || authState === void 0 ? void 0 : authState.isAuthenticated) ?
                    React.createElement(react_router_dom_1.Link, { className: "btn btn-primary btn-lg text-white px-4 me-md-2 fw-bold", type: 'button', to: "/" }, "Library Services")
                    :
                        React.createElement(react_router_dom_1.Link, { className: "btn btn-primary btn-lg text-white px-4 me-md-2 fw-bold", type: 'button', to: "/login" }, "Sign Up"))),
            React.createElement("div", { className: 'col-lg-4 offset-lg-1 shadow-lg lost-image' }))));
};
