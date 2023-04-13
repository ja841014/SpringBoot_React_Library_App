"use strict";
exports.__esModule = true;
exports.ChangeQuantityOfBooks = void 0;
var react_1 = require("react");
exports.ChangeQuantityOfBooks = function () {
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
    return (React.createElement("div", null));
};
