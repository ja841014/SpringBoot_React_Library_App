"use strict";
exports.__esModule = true;
exports.Heros = void 0;
var react_router_dom_1 = require("react-router-dom");
var okta_react_1 = require("@okta/okta-react");
exports.Heros = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    return (React.createElement("div", null,
        React.createElement("div", { className: 'd-none d-lg-block' },
            React.createElement("div", { className: 'row g-0 mt-5' },
                React.createElement("div", { className: 'col-sm-6 col-md-6' },
                    React.createElement("div", { className: 'col-image-left' })),
                React.createElement("div", { className: 'col-4 col-md-4 container d-flex justify-content-center align-items-center' },
                    React.createElement("div", { className: 'ml-2' },
                        React.createElement("h1", null, "What have you been reading?"),
                        React.createElement("p", { className: 'lead' }, "The library team would love to know what you have been reading. Whether it is to learn a new skill or grow within one, we will be able to provide the top content for you!"),
                        (authState === null || authState === void 0 ? void 0 : authState.isAuthenticated) ?
                            React.createElement(react_router_dom_1.Link, { className: "btn btn-primary btn-lg text-white", to: "/search" }, "Explore top books")
                            :
                                React.createElement(react_router_dom_1.Link, { className: "btn btn-primary btn-lg text-white", to: "/login" }, "Sign Up")))),
            React.createElement("div", { className: 'row g-0' },
                React.createElement("div", { className: 'col-4 col-md-4 container d-flex \n                        justify-content-center align-items-center' },
                    React.createElement("div", { className: 'ml-2' },
                        React.createElement("h1", null, "Our collection is always changing!"),
                        React.createElement("p", { className: 'lead' }, "Try to check in daily as our collection is always changing! We work nonstop to provide the most accurate book selection possible for our Luv 2 Read students! We are diligent about our book selection and our books are always going to be our top priority."))),
                React.createElement("div", { className: 'col-sm-6 col-md-6' },
                    React.createElement("div", { className: 'col-image-right' })))),
        React.createElement("div", { className: 'd-lg-none' },
            React.createElement("div", { className: 'container' },
                React.createElement("div", { className: 'm-2' },
                    React.createElement("div", { className: 'col-image-left' }),
                    React.createElement("div", { className: 'mt-2' },
                        React.createElement("h1", null, "What have you been reading?"),
                        React.createElement("p", { className: 'lead' }, "The library team would love to know what you have been reading. Whether it is to learn a new skill or grow within one, we will be able to provide the top content for you!"),
                        (authState === null || authState === void 0 ? void 0 : authState.isAuthenticated) ?
                            React.createElement(react_router_dom_1.Link, { className: "btn btn-primary btn-lg text-white", to: "/search" }, "Explore top books")
                            :
                                React.createElement(react_router_dom_1.Link, { className: "btn btn-primary btn-lg text-white", to: "/login" }, "Sign Up"))),
                React.createElement("div", { className: 'm-2' },
                    React.createElement("div", { className: 'col-image-right' }),
                    React.createElement("div", { className: 'mt-2' },
                        React.createElement("h1", null, "Our collection is always changing!"),
                        React.createElement("p", { className: 'lead' }, "Try to check in daily as our collection is always changing! We work nonstop to provide the most accurate book selection possible for our Luv 2 Read students! We are diligent about our book selection and our books are always going to be our top priority.")))))));
};
