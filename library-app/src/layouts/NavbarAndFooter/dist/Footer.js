"use strict";
exports.__esModule = true;
exports.Footer = void 0;
var react_router_dom_1 = require("react-router-dom");
exports.Footer = function () {
    return (React.createElement("div", { className: 'main-color' },
        React.createElement("footer", { className: 'container d-flex flex-wrap \n                justify-content-between align-items-center py-5 main-color' },
            React.createElement("p", { className: 'col-md-4 mb-0 text-white' }, "\u00A9 Example Library App, Inc"),
            React.createElement("ul", { className: 'nav navbar-dark col-md-4 justify-content-end' },
                React.createElement("li", { className: 'nav-item' },
                    React.createElement(react_router_dom_1.Link, { to: '/home', className: "nav-link px-2 text-white" }, "Home")),
                React.createElement("li", { className: 'nav-item' },
                    React.createElement(react_router_dom_1.Link, { to: '/search', className: "nav-link px-2 text-white" }, "Search Books"))))));
};
