"use strict";
exports.__esModule = true;
exports.SearchBook = void 0;
var react_router_dom_1 = require("react-router-dom");
exports.SearchBook = function (props) {
    return (React.createElement("div", { className: 'card mt-3 shadow p-3 mb-3 bg-body rounded' },
        React.createElement("div", { className: 'row g-0' },
            React.createElement("div", { className: 'col-md-2' },
                React.createElement("div", { className: 'd-none d-lg-block' }, props.book.img ?
                    React.createElement("img", { src: props.book.img, width: '123', height: '196', alt: 'Book' })
                    :
                        React.createElement("img", { src: require('../../../Images/BooksImages/book-luv2code-1000.png'), width: '123', height: '196', alt: 'Book' })),
                React.createElement("div", { className: 'd-lg-none d-flex justify-content-center \n                        align-items-center' }, props.book.img ?
                    React.createElement("img", { src: props.book.img, width: '123', height: '196', alt: 'Book' })
                    :
                        React.createElement("img", { src: require('../../../Images/BooksImages/book-luv2code-1000.png'), width: '123', height: '196', alt: 'Book' }))),
            React.createElement("div", { className: 'col-md-6' },
                React.createElement("div", { className: 'card-body' },
                    React.createElement("h5", { className: 'card-title' }, props.book.author),
                    React.createElement("h4", null, props.book.title),
                    React.createElement("p", { className: 'card-text' }, props.book.description))),
            React.createElement("div", { className: 'col-md-4 d-flex justify-content-center align-items-center' },
                React.createElement(react_router_dom_1.Link, { className: 'btn btn-primary', to: "/checkout/" + props.book.id }, "View Details")))));
};
