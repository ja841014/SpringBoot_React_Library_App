"use strict";
exports.__esModule = true;
exports.Carousel = void 0;
var ReturnBook_1 = require("./ReturnBook");
exports.Carousel = function () {
    return (React.createElement("div", { className: 'container mt-5', style: { height: 550 } },
        React.createElement("div", { className: 'homepage-carousel-title' },
            React.createElement("h3", null, "Find your next \"I stayed up too late reading\" book.")),
        React.createElement("div", { id: 'carouselExampleControls', className: 'carousel carousel-dark slide mt-5 \n                d-none d-lg-block', "data-bs-interval": 'false' },
            React.createElement("div", { className: 'carousel-inner' },
                React.createElement("div", { className: 'carousel-item active' },
                    React.createElement("div", { className: 'row d-flex justify-content-center align-items-center' },
                        React.createElement(ReturnBook_1.ReturnBook, null),
                        React.createElement(ReturnBook_1.ReturnBook, null),
                        React.createElement(ReturnBook_1.ReturnBook, null))),
                React.createElement("div", { className: 'carousel-item' },
                    React.createElement("div", { className: 'row d-flex justify-content-center align-items-center' },
                        React.createElement(ReturnBook_1.ReturnBook, null),
                        React.createElement(ReturnBook_1.ReturnBook, null),
                        React.createElement(ReturnBook_1.ReturnBook, null))),
                React.createElement("div", { className: 'carousel-item' },
                    React.createElement("div", { className: 'row d-flex justify-content-center align-items-center' },
                        React.createElement(ReturnBook_1.ReturnBook, null),
                        React.createElement(ReturnBook_1.ReturnBook, null),
                        React.createElement(ReturnBook_1.ReturnBook, null)))),
            React.createElement("button", { className: 'carousel-control-prev', type: 'button', "data-bs-target": '#carouselExampleControls', "data-bs-slide": 'prev' },
                React.createElement("span", { className: 'carousel-control-prev-icon', "aria-hidden": 'true' }),
                React.createElement("span", { className: 'visually-hidden' }, "Previous")),
            React.createElement("button", { className: 'carousel-control-next', type: 'button', "data-bs-target": '#carouselExampleControls', "data-bs-slide": 'next' },
                React.createElement("span", { className: 'carousel-control-next-icon', "aria-hidden": 'true' }),
                React.createElement("span", { className: 'visually-hidden' }, "Next"))),
        React.createElement("div", { className: 'd-lg-none mt-3' },
            React.createElement(ReturnBook_1.ReturnBook, null)),
        React.createElement("div", { className: 'homepage-carousel-title mt-3' },
            React.createElement("a", { className: "btn btn-outline-secondary btn-lg", href: "#" }, "View More"))));
};
