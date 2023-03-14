"use strict";
exports.__esModule = true;
exports.Carousel = void 0;
var react_1 = require("react");
var ReturnBook_1 = require("./ReturnBook");
var api_1 = require("../../../api");
var SpinnerLoading_1 = require("../../Utils/SpinnerLoading");
var react_router_dom_1 = require("react-router-dom");
exports.Carousel = function () {
    // paranthesis of type array and initial is empty array
    var _a = react_1.useState([]), books = _a[0], setBooks = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState(null), httpError = _c[0], setHttpError = _c[1];
    // use Effect will call when this componenet is created 
    // then it will call each times something change in the array(second para) changes 
    react_1.useEffect(function () {
        api_1["default"].getAllBooks({ page: '0', size: '9' }).then(function (res) {
            var loadedBooks = [];
            console.log("Carousel get all:");
            console.log(res);
            var responsedata = res.data.content;
            for (var key in responsedata) {
                loadedBooks.push({
                    id: responsedata[key].id,
                    title: responsedata[key].title,
                    author: responsedata[key].author,
                    description: responsedata[key].description,
                    copies: responsedata[key].copies,
                    copiesAvailable: responsedata[key].copiesAvailable,
                    category: responsedata[key].category,
                    img: responsedata[key].img
                });
            }
            setBooks(loadedBooks);
            setIsLoading(false);
            // console.log(books)
        }, (function (error) {
            console.error("Error");
            setIsLoading(false);
            setHttpError(error.message);
            throw new Error(error.message);
        }));
    }, []);
    if (isLoading) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: "container m-5" },
            React.createElement("p", null, httpError)));
    }
    return (React.createElement("div", { className: 'container mt-5', style: { height: 550 } },
        React.createElement("div", { className: 'homepage-carousel-title' },
            React.createElement("h3", null, "Find your next \"I stayed up too late reading\" book.")),
        React.createElement("div", { id: 'carouselExampleControls', className: 'carousel carousel-dark slide mt-5 \n                d-none d-lg-block', "data-bs-interval": 'false' },
            React.createElement("div", { className: 'carousel-inner' },
                React.createElement("div", { className: 'carousel-item active' },
                    React.createElement("div", { className: 'row d-flex justify-content-center align-items-center' }, books.slice(0, 3).map(function (book) { return (React.createElement(ReturnBook_1.ReturnBook, { key: book.author, book: book })); }))),
                React.createElement("div", { className: 'carousel-item' },
                    React.createElement("div", { className: 'row d-flex justify-content-center align-items-center' }, books.slice(3, 6).map(function (book) { return (React.createElement(ReturnBook_1.ReturnBook, { key: book.author, book: book })); }))),
                React.createElement("div", { className: 'carousel-item' },
                    React.createElement("div", { className: 'row d-flex justify-content-center align-items-center' }, books.slice(6, 9).map(function (book) { return (React.createElement(ReturnBook_1.ReturnBook, { key: book.author, book: book })); })))),
            React.createElement("button", { className: 'carousel-control-prev', type: 'button', "data-bs-target": '#carouselExampleControls', "data-bs-slide": 'prev' },
                React.createElement("span", { className: 'carousel-control-prev-icon', "aria-hidden": 'true' }),
                React.createElement("span", { className: 'visually-hidden' }, "Previous")),
            React.createElement("button", { className: 'carousel-control-next', type: 'button', "data-bs-target": '#carouselExampleControls', "data-bs-slide": 'next' },
                React.createElement("span", { className: 'carousel-control-next-icon', "aria-hidden": 'true' }),
                React.createElement("span", { className: 'visually-hidden' }, "Next"))),
        React.createElement("div", { className: 'd-lg-none mt-3' }, React.createElement(ReturnBook_1.ReturnBook, { key: books[5].author, book: books[5] })),
        React.createElement("div", { className: 'homepage-carousel-title mt-3' },
            React.createElement(react_router_dom_1.Link, { className: "btn btn-outline-secondary btn-lg", to: "/search" }, "View More"))));
};
