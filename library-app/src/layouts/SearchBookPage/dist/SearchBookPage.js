"use strict";
exports.__esModule = true;
exports.SearchBookPage = void 0;
var react_1 = require("react");
var api_1 = require("../../api");
var Pagination_1 = require("../Utils/Pagination");
var SpinnerLoading_1 = require("../Utils/SpinnerLoading");
var SearchBook_1 = require("./componenet/SearchBook");
exports.SearchBookPage = function () {
    var _a = react_1.useState([]), books = _a[0], setBooks = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState(null), httpError = _c[0], setHttpError = _c[1];
    var _d = react_1.useState(1), currentPage = _d[0], setCurrentPage = _d[1];
    var booksPerPage = react_1.useState(5)[0];
    var _e = react_1.useState(0), totalAmountOfBooks = _e[0], setTotalAmountOfBooks = _e[1];
    var _f = react_1.useState(0), totalPages = _f[0], setTotalPages = _f[1];
    // use Effect will call when this componenet is created 
    // then it will call each times something change in the array(second para) changes 
    react_1.useEffect(function () {
        // why we "currentPage - 1", because in pagination and through the API 0 is the first page.
        api_1["default"].getAllBooks({ page: currentPage - 1, size: booksPerPage }).then(function (res) {
            var loadedBooks = [];
            console.log(res);
            var responsedata = res.data.content;
            setTotalAmountOfBooks(res.data.totalElements);
            setTotalPages(res.data.totalPages);
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
    }, [currentPage]);
    if (isLoading) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: "container m-5" },
            React.createElement("p", null, httpError)));
    }
    var indexOfLastBook = currentPage * booksPerPage;
    var indexOfFirstBook = indexOfLastBook - booksPerPage;
    var lastItemIdx = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    var setSearch = function (val) {
    };
    var searchHandleChange = function () {
    };
    var categoryField = function () {
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: 'container' },
            React.createElement("div", null,
                React.createElement("div", { className: 'row mt-5' },
                    React.createElement("div", { className: 'col-6' },
                        React.createElement("div", { className: 'd-flex' },
                            React.createElement("input", { className: 'form-control me-2', type: 'search', placeholder: 'Search', "aria-labelledby": 'Search', onChange: function (e) { return setSearch(e.target.value); } }),
                            React.createElement("button", { className: 'btn btn-outline-success', onClick: function () { return searchHandleChange(); } }, "Search"))),
                    React.createElement("div", { className: 'col-4' },
                        React.createElement("div", { className: 'dropdown' },
                            React.createElement("button", { className: 'btn btn-secondary dropdown-toggle', type: 'button', id: 'dropdownMenuButton1', "data-bs-toggle": 'dropdown', "aria-expanded": 'false' }),
                            React.createElement("ul", { className: 'dropdown-menu', "aria-labelledby": 'dropdownMenuButton1' })))),
                books.map(function (book) { return (React.createElement(SearchBook_1.SearchBook, { book: book, key: book.id })); }),
                totalPages > 1 &&
                    React.createElement(Pagination_1.Pagination, { currentPage: currentPage, totalPages: totalPages, paginate: paginate })))));
};
