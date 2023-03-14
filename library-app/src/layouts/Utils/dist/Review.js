"use strict";
exports.__esModule = true;
exports.Review = void 0;
var StarsReview_1 = require("./StarsReview");
exports.Review = function (props) {
    var date = new Date(props.review.date);
    // Converts a date and time to a string by using the current or specified locale.
    var longMonth = date.toLocaleString('en-us', { month: 'long' });
    var dateDay = date.getDate();
    var dateYear = date.getFullYear();
    var dateRender = longMonth + ' ' + dateDay + ', ' + dateYear;
    return (React.createElement("div", null,
        React.createElement("div", { className: 'col-sm-8 col-md-8' },
            React.createElement("h5", null, props.review.userEmail),
            React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col' }, dateRender),
                React.createElement("div", { className: 'col' },
                    React.createElement(StarsReview_1.StarsReview, { rating: props.review.rating, size: 16 }))),
            React.createElement("div", { className: 'mt-2' },
                React.createElement("p", null, props.review.reviewDescription))),
        React.createElement("hr", null)));
};
