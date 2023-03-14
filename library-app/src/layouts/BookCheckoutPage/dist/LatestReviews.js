"use strict";
exports.__esModule = true;
exports.LatestReviews = void 0;
var react_router_dom_1 = require("react-router-dom");
var Review_1 = require("../Utils/Review");
exports.LatestReviews = function (props) {
    return (React.createElement("div", { className: props.mobile ? 'mt-3' : 'row mt-5' },
        React.createElement("div", { className: props.mobile ? '' : 'col-sm-2 col-md-2' },
            React.createElement("h2", null, "Latest Reviews: ")),
        React.createElement("div", { className: 'col-sm-10 col-md-10' }, props.reviews.length > 0 ?
            React.createElement(React.Fragment, null,
                props.reviews.slice(0, 3).map(function (eachReview) { return (React.createElement(Review_1.Review, { review: eachReview, key: eachReview.id })); }),
                React.createElement("div", { className: 'm-3' },
                    React.createElement(react_router_dom_1.Link, { type: 'button', className: 'btn main-color btn-md text-white', to: "/reviewlist/" + props.bookId }, "Reach all reviews.")))
            :
                React.createElement("div", { className: 'm-3' },
                    React.createElement("p", { className: 'lead' }, "Currently there are no reviews for this book")))));
};
