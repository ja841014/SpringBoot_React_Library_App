"use strict";
exports.__esModule = true;
exports.ChangeQuantityOfBooks = void 0;
var react_1 = require("react");
var api_1 = require("../../../api");
var Pagination_1 = require("../../Utils/Pagination");
var SpinnerLoading_1 = require("../../Utils/SpinnerLoading");
var ChangeQuantityOfBook_1 = require("./ChangeQuantityOfBook");
exports.ChangeQuantityOfBooks = function () {
    var _a = react_1.useState([]), books = _a[0], setBooks = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState(null), httpError = _c[0], setHttpError = _c[1];
    var _d = react_1.useState(1), currentPage = _d[0], setCurrentPage = _d[1];
    var booksPerPage = react_1.useState(5)[0];
    var _e = react_1.useState(0), totalAmountOfBooks = _e[0], setTotalAmountOfBooks = _e[1];
    var _f = react_1.useState(0), totalPages = _f[0], setTotalPages = _f[1];
    var _g = react_1.useState(false), bookDelete = _g[0], setBookDelete = _g[1];
    var _h = react_1.useState(''), title = _h[0], setTitle = _h[1];
    var _j = react_1.useState(''), search = _j[0], setSearch = _j[1];
    var _k = react_1.useState("Book Category"), categorySelection = _k[0], setCategorySelection = _k[1];
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
    }, [currentPage, bookDelete]);
    if (isLoading) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: 'container m-5' },
            React.createElement("p", null, httpError)));
    }
    var deleteBook = function () { return setBookDelete(!bookDelete); };
    var indexOfLastBook = currentPage * booksPerPage;
    var indexOfFirstBook = indexOfLastBook - booksPerPage;
    var lastItemIdx = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    return (React.createElement("div", { className: 'container mt-5' },
        totalAmountOfBooks > 0 ?
            React.createElement(React.Fragment, null,
                React.createElement("div", { className: 'mt-3' },
                    React.createElement("h3", null,
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
                books.map(function (book) { return (React.createElement(ChangeQuantityOfBook_1.ChangeQuantityOfBook, { book: book, key: book.id, deleteBook: deleteBook })); }))
            :
                React.createElement("h5", null, "Add a book before changing quantity"),
        totalPages > 1 && React.createElement(Pagination_1.Pagination, { currentPage: currentPage, totalPages: totalPages, paginate: paginate })));
};
