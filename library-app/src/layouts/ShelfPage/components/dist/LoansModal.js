"use strict";
exports.__esModule = true;
exports.LoansModal = void 0;
exports.LoansModal = function (props) {
    var _a, _b;
    return (React.createElement("div", { className: 'modal fade', id: props.mobile ? "mobilemodal" + props.shelfCurrentLoan.book.id :
            "modal" + props.shelfCurrentLoan.book.id, "data-bs-backdrop": 'static', "data-bs-keyboard": 'false', "aria-labelledby": 'staticBackdropLabel', "aria-hidden": 'true', key: props.shelfCurrentLoan.book.id },
        React.createElement("div", { className: 'modal-dialog' },
            React.createElement("div", { className: 'modal-content' },
                React.createElement("div", { className: 'modal-header' },
                    React.createElement("h5", { className: 'modal-title', id: 'staticBackdropLabel' }, "Loan Options"),
                    React.createElement("button", { type: 'button', className: 'btn-close', "data-bs-dismiss": 'modal', "aria-label": 'Close' })),
                React.createElement("div", { className: 'modal-body' },
                    React.createElement("div", { className: 'container' },
                        React.createElement("div", { className: 'mt-3' },
                            React.createElement("div", { className: 'row' },
                                React.createElement("div", { className: 'col-2' }, ((_a = props.shelfCurrentLoan.book) === null || _a === void 0 ? void 0 : _a.img) ?
                                    React.createElement("img", { src: (_b = props.shelfCurrentLoan.book) === null || _b === void 0 ? void 0 : _b.img, width: '56', height: '87', alt: 'Book' })
                                    :
                                        React.createElement("img", { src: require('./../../../Images/BooksImages/book-luv2code-1000.png'), width: '56', height: '87', alt: 'Book' })),
                                React.createElement("div", { className: 'col-10' },
                                    React.createElement("h6", null, props.shelfCurrentLoan.book.author),
                                    React.createElement("h4", null, props.shelfCurrentLoan.book.title))),
                            React.createElement("hr", null),
                            props.shelfCurrentLoan.daysLeft > 0 &&
                                React.createElement("p", { className: 'text-secondary' },
                                    "Due in ",
                                    props.shelfCurrentLoan.daysLeft,
                                    " days."),
                            props.shelfCurrentLoan.daysLeft === 0 &&
                                React.createElement("p", { className: 'text-success' }, "Due Today."),
                            props.shelfCurrentLoan.daysLeft < 0 &&
                                React.createElement("p", { className: 'text-danger' },
                                    "Past due by ",
                                    props.shelfCurrentLoan.daysLeft,
                                    " days."),
                            React.createElement("div", { className: 'list-group mt-3' },
                                React.createElement("button", { onClick: function () { return props.returnBook(props.shelfCurrentLoan.book.id); }, "data-bs-dismiss": 'modal', className: 'list-group-item list-group-item-action', "aria-current": 'true' }, "Return Book"),
                                React.createElement("button", { onClick: props.shelfCurrentLoan.daysLeft < 0 ?
                                        function (event) { return event.preventDefault(); }
                                        :
                                            function () { return props.renewLoan(props.shelfCurrentLoan.book.id); }, "data-bs-dismiss": 'modal', className: props.shelfCurrentLoan.daysLeft < 0 ?
                                        'list-group-item list-group-item-action inactiveLink' :
                                        'list-group-item list-group-item-action' }, props.shelfCurrentLoan.daysLeft < 0 ?
                                    'Late dues cannot be renewed' : 'Renew loan for 7 days'))))),
                React.createElement("div", { className: 'modal-footer' },
                    React.createElement("button", { type: 'button', className: 'btn btn-secondary', "data-bs-dismiss": 'modal' }, "Close"))))));
};
