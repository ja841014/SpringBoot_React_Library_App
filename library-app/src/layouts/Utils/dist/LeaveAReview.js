"use strict";
exports.__esModule = true;
exports.LeaveAReview = void 0;
var react_1 = require("react");
var StarsReview_1 = require("./StarsReview");
exports.LeaveAReview = function (props) {
    var _a = react_1.useState(0), star = _a[0], setStar = _a[1];
    var _b = react_1.useState(false), displayInput = _b[0], setDisplayInput = _b[1];
    var _c = react_1.useState(''), reviewDescription = _c[0], setReviewDescription = _c[1];
    function starValue(val) {
        setStar(val);
        setDisplayInput(true);
    }
    return (React.createElement("div", { className: 'dropdown', style: { cursor: 'pointer' } },
        React.createElement("h5", { className: 'dropdown-toggle', id: 'dropdownMenuButton1', "data-bs-toggle": 'dropdown' }, "Leave a review?"),
        React.createElement("ul", { id: 'submitReviewRating', className: 'dropdown-menu', "aria-labelledby": 'dropdownMenuButton1' },
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(0); }, className: 'dropdown-item' }, "0 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(.5); }, className: 'dropdown-item' }, ".5 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(1); }, className: 'dropdown-item' }, "1 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(1.5); }, className: 'dropdown-item' }, "1.5 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(2); }, className: 'dropdown-item' }, "2 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(2.5); }, className: 'dropdown-item' }, "2.5 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(3); }, className: 'dropdown-item' }, "3 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(3.5); }, className: 'dropdown-item' }, "3.5 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(4); }, className: 'dropdown-item' }, "4 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(4.5); }, className: 'dropdown-item' }, "4.5 star")),
            React.createElement("li", null,
                React.createElement("button", { onClick: function () { return starValue(5); }, className: 'dropdown-item' }, "5 star"))),
        React.createElement(StarsReview_1.StarsReview, { rating: star, size: 32 }),
        displayInput &&
            React.createElement("form", { method: 'POST', action: '#' },
                React.createElement("hr", null),
                React.createElement("div", { className: 'mb-3' },
                    React.createElement("label", { className: 'form-label' }, "Description"),
                    React.createElement("textarea", { className: 'form-control', id: 'submitReviewDescription', placeholder: 'Optional', rows: 3, onChange: function (e) { return setReviewDescription(e.target.value); } })),
                React.createElement("div", null,
                    React.createElement("button", { type: 'button', onClick: function () { return props.submitReview(star, reviewDescription); }, className: 'btn btn-primary mt-3' }, "Submit Review")))));
};
