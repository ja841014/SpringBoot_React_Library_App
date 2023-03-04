"use strict";
exports.__esModule = true;
exports.CheckoutAndReviewBox = void 0;
exports.CheckoutAndReviewBox = function (props) {
    var _a, _b;
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
            React.createElement("hr", null),
            React.createElement("p", { className: 'mt-3' }, "This number can change until placing order has been complete."))));
};
