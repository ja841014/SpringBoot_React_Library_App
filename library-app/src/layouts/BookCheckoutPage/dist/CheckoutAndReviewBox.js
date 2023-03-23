"use strict";
exports.__esModule = true;
exports.CheckoutAndReviewBox = void 0;
var react_router_dom_1 = require("react-router-dom");
var LeaveAReview_1 = require("../Utils/LeaveAReview");
exports.CheckoutAndReviewBox = function (props) {
    var _a, _b;
    function buttonRender() {
        if (!props.isAuthenticated) {
            return (React.createElement(react_router_dom_1.Link, { to: '/login', className: "btn btn-success btn-lg" }, "Sign In"));
        }
        if (!props.isCheckedOut && props.currentLoansCount < 5) {
            return (React.createElement("button", { className: "btn btn-success btn-lg", onClick: function () { return props.checkoutBook(); } }, "Checkout"));
        }
        else if (props.isCheckedOut) {
            return (React.createElement("p", null,
                React.createElement("b", null, "Book checked out. Enjoy.")));
        }
        else if (props.currentLoansCount >= 5) {
            return (React.createElement("p", { className: "text-danger" }, "Too many book checked out."));
        }
    }
    function reviewRender() {
        if (!props.isAuthenticated) {
            return (React.createElement("div", null,
                React.createElement("hr", null),
                React.createElement("p", null, "Sign in to be able to leave a review.")));
        }
        if (props.isReviewLeft) {
            return (React.createElement("p", null,
                React.createElement("b", null, "Thank you for your review!")));
        }
        else {
            return (React.createElement(LeaveAReview_1.LeaveAReview, { submitReview: props.submitReview }));
        }
    }
    return (React.createElement("div", { className: props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5' },
        React.createElement("div", { className: 'card-body container' },
            React.createElement("div", { className: 'mt-3' },
                React.createElement("p", null,
                    React.createElement("b", null,
                        props.currentLoansCount,
                        "/5 "),
                    "books checked out"),
                React.createElement("hr", null),
                props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                    React.createElement("h4", { className: 'text-success' }, "Available")
                    :
                        React.createElement("h4", { className: 'text-danger' }, "Wait List"),
                React.createElement("div", { className: 'row' },
                    React.createElement("p", { className: 'col-6 lead' },
                        React.createElement("b", null, (_a = props.book) === null || _a === void 0 ? void 0 :
                            _a.copies,
                            " "),
                        "copies"),
                    React.createElement("p", { className: 'col-6 lead' },
                        React.createElement("b", null, (_b = props.book) === null || _b === void 0 ? void 0 :
                            _b.copiesAvailable,
                            " "),
                        "available"))),
            buttonRender(),
            React.createElement("hr", null),
            React.createElement("p", { className: 'mt-3' }, "This number can change until placing order has been complete."),
            reviewRender())));
};
