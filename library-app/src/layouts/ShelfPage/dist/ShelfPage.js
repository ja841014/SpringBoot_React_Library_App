"use strict";
exports.__esModule = true;
exports.ShelfPage = void 0;
var react_1 = require("react");
var HistoryPage_1 = require("./components/HistoryPage");
var Loans_1 = require("./components/Loans");
exports.ShelfPage = function () {
    var _a = react_1.useState(false), historyClick = _a[0], setHistoryClick = _a[1];
    return (React.createElement("div", { className: 'container' },
        React.createElement("div", { className: 'mt-3' },
            React.createElement("nav", null,
                React.createElement("div", { className: 'nav nav-tabs', id: 'nav-tab', role: 'tablist' },
                    React.createElement("button", { onClick: function () { return setHistoryClick(false); }, className: 'nav-link active', id: 'nav-loans-tab', "data-bs-toggle": 'tab', "data-bs-target": '#nav-loans', type: 'button', role: 'tab', "aria-controls": 'nav-loans', "aria-selected": 'true' }, "Loans"),
                    React.createElement("button", { onClick: function () { return setHistoryClick(true); }, className: 'nav-link', id: 'nav-history-tab', "data-bs-toggle": 'tab', "data-bs-target": '#nav-history', type: 'button', role: 'tab', "aria-controls": 'nav-history', "aria-selected": 'false' }, "Your History"))),
            React.createElement("div", { className: 'tab-content', id: 'nav-tabContent' },
                React.createElement("div", { className: 'tab-pane fade show active', id: 'nav-loans', role: 'tabpanel', "aria-labelledby": 'nav-loans-tab' },
                    React.createElement(Loans_1.Loans, null)),
                React.createElement("div", { className: 'tab-pane fade', id: 'nav-history', role: 'tabpanel', "aria-labelledby": 'nav-history-tab' }, historyClick ?
                    React.createElement(HistoryPage_1.HistoryPage, null)
                    :
                        React.createElement(React.Fragment, null))))));
};
