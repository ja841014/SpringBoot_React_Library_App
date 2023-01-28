"use strict";
exports.__esModule = true;
exports.Pagination = void 0;
exports.Pagination = function (props) {
    var pageNumbers = [];
    for (var i = 1; i <= props.totalPages; i++) {
        pageNumbers.push(i);
    }
    return (React.createElement("nav", { "aria-label": "..." },
        React.createElement("ul", { className: 'pagination' },
            React.createElement("li", { className: 'page-item', onClick: function () { return props.paginate(1); } },
                React.createElement("button", { className: 'page-link' }, "First Page")),
            pageNumbers.map(function (number) { return (React.createElement("li", { key: number, onClick: function () { return props.paginate(number); }, className: 'page-item ' + (props.currentPage === number ? 'active' : '') },
                React.createElement("button", { className: 'page-link' }, number))); }),
            React.createElement("li", { className: 'page-item', onClick: function () { return props.paginate(props.totalPages); } },
                React.createElement("button", { className: 'page-link' }, "Last Page")))));
};
