"use strict";
exports.__esModule = true;
exports.Navbar = void 0;
var react_router_dom_1 = require("react-router-dom");
exports.Navbar = function () {
    return (React.createElement("nav", { className: 'navbar navbar-expand-lg navbar-dark main-color py-3' },
        React.createElement("div", { className: 'container-fluid' },
            React.createElement("span", { className: 'navbar-brand' }, "Luv 2 Read"),
            React.createElement("button", { className: 'navbar-toggler', type: 'button', "data-bs-toggle": 'collapse', "data-bs-target": '#navbarNavDropdown', "aria-controls": 'navbarNavDropdown', "aria-expanded": 'false', "aria-label": 'Toggle Navigation' },
                React.createElement("span", { className: 'navbar-toggler-icon' })),
            React.createElement("div", { className: 'collapse navbar-collapse', id: 'navbarNavDropdown' },
                React.createElement("ul", { className: 'navbar-nav' },
                    React.createElement("li", { className: 'nav-item' },
                        React.createElement(react_router_dom_1.NavLink, { className: "nav-link", to: "/home" }, "Home")),
                    React.createElement("li", { className: 'nav-item' },
                        React.createElement(react_router_dom_1.NavLink, { className: "nav-link", to: "/search" }, "Search Book"))),
                React.createElement("ul", { className: 'navbar-nav ms-auto' },
                    React.createElement("li", { className: "nav-item m-1" }),
                    React.createElement(react_router_dom_1.NavLink, { type: "button", className: "btn btn-outline-light", to: "#" }, "Sign in"))))));
};
