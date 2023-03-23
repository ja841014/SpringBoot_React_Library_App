"use strict";
exports.__esModule = true;
exports.SearchBookPage = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
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
    var _g = react_1.useState(''), title = _g[0], setTitle = _g[1];
    var _h = react_1.useState(''), search = _h[0], setSearch = _h[1];
    var _j = react_1.useState("Book Category"), categorySelection = _j[0], setCategorySelection = _j[1];
    // use Effect will call when this componenet is created 
    // then it will call each times something change in the array(second para) changes 
    react_1.useEffect(function () {
        // why we "currentPage - 1", because in pagination and through the API 0 is the first page.
        api_1["default"].getAllBooks({ page: currentPage - 1, size: booksPerPage, title: title, category: categorySelection }).then(function (res) {
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
        })["catch"](function (error) {
            console.error("Error");
            setIsLoading(false);
            setHttpError(error.message);
            throw new Error(error.message);
        });
        // it will scroll the page to the top
        window.scroll(0, 0);
    }, [currentPage, search, categorySelection]);
    if (isLoading) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: "container m-5" },
            React.createElement("p", null, httpError)));
    }
    var searchHandleChange = function () {
        setCurrentPage(1);
        setSearch(title);
    };
    var categoryField = function (value) {
        setCurrentPage(1);
        setCategorySelection(value);
    };
    var indexOfLastBook = currentPage * booksPerPage;
    var indexOfFirstBook = indexOfLastBook - booksPerPage;
    var lastItemIdx = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    return (React.createElement("div", null,
        React.createElement("div", { className: 'container' },
            React.createElement("div", null,
                React.createElement("div", { className: 'row mt-5' },
                    React.createElement("div", { className: 'col-6' },
                        React.createElement("div", { className: 'd-flex' },
                            React.createElement("input", { className: 'form-control me-2', type: 'search', placeholder: 'Search', "aria-labelledby": 'Search', onChange: function (e) { return setTitle(e.target.value); } }),
                            React.createElement("button", { className: 'btn btn-outline-success', onClick: function () { return searchHandleChange(); } }, "Search"))),
                    React.createElement("div", { className: 'col-4' },
                        React.createElement("div", { className: 'dropdown' },
                            React.createElement("button", { className: 'btn btn-secondary dropdown-toggle', type: 'button', id: 'dropdownMenuButton1', "data-bs-toggle": 'dropdown', "aria-expanded": 'false' }, categorySelection),
                            React.createElement("ul", { className: 'dropdown-menu', "aria-labelledby": 'dropdownMenuButton1' },
                                React.createElement("li", { onClick: function () { return categoryField('All'); } },
                                    React.createElement("button", { className: 'dropdown-item' }, "All")),
                                React.createElement("li", { onClick: function () { return categoryField('FE'); } },
                                    React.createElement("button", { className: 'dropdown-item' }, "Front End")),
                                React.createElement("li", { onClick: function () { return categoryField('BE'); } },
                                    React.createElement("button", { className: 'dropdown-item' }, "Back End")),
                                React.createElement("li", { onClick: function () { return categoryField('Data'); } },
                                    React.createElement("button", { className: 'dropdown-item' }, "Data")),
                                React.createElement("li", { onClick: function () { return categoryField('DevOps'); } },
                                    React.createElement("button", { className: 'dropdown-item' }, "DevOps")))))),
                totalAmountOfBooks > 0 ?
                    React.createElement(React.Fragment, null,
                        React.createElement("div", { className: 'mt-3' },
                            React.createElement("h5", null,
                                "Number of results: (",
                                totalAmountOfBooks,
                                ")")),
                        React.createElement("p", null,
                            indexOfFirstBook + 1,
                            " to ",
                            lastItemIdx,
                            " of ",
                            totalAmountOfBooks,
                            " items:"),
                        books.map(function (book) { return (React.createElement(SearchBook_1.SearchBook, { book: book, key: book.id })); }))
                    :
                        React.createElement("div", { className: 'm-5' },
                            React.createElement("h3", null, "Can't find what you are looking for?"),
                            React.createElement(react_router_dom_1.Link, { type: 'button', className: 'btn btn-primary btn-md px-4 me-md-2 fw-bold text-white', to: '/home' }, "Library Services")),
                totalPages > 1 &&
                    React.createElement(Pagination_1.Pagination, { currentPage: currentPage, totalPages: totalPages, paginate: paginate })))));
};
