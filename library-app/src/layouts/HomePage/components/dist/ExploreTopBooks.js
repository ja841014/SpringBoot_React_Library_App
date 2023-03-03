"use strict";
exports.__esModule = true;
exports.ExploreTopBooks = void 0;
var react_router_dom_1 = require("react-router-dom");
exports.ExploreTopBooks = function () {
    return (React.createElement("div", { className: 'p-5 mb-4 bg-dark header' },
        React.createElement("div", { className: 'container-fluid py-5 text-white \n                d-flex justify-content-center align-items-center' },
            React.createElement("div", null,
                React.createElement("h1", { className: 'display-5 fw-bold' }, "Find your next adventure"),
                React.createElement("p", { className: 'col-md-8 fs-4' }, "Where would you like to go next?"),
                React.createElement(react_router_dom_1.Link, { type: "button", className: "btn btn-primary btn-lg text-white", to: "/search" }, "Explore top books")))));
};
