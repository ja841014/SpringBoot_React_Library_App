"use strict";
exports.__esModule = true;
exports.MessagePage = void 0;
var react_1 = require("react");
var Messages_1 = require("./components/Messages");
var PostNewMessage_1 = require("./components/PostNewMessage");
exports.MessagePage = function () {
    var _a = react_1.useState(false), messagesClick = _a[0], setMessagesClick = _a[1];
    return (React.createElement("div", { className: 'container' },
        React.createElement("div", { className: 'mt-3 mb-2' },
            React.createElement("nav", null,
                React.createElement("div", { className: 'nav nav-tabs', id: 'nav-tab', role: 'tablist' },
                    React.createElement("button", { onClick: function () { return setMessagesClick(false); }, className: 'nav-link active', id: 'nav-send-message-tab', "data-bs-toggle": 'tab', "data-bs-target": '#nav-send-message', type: 'button', role: 'tab', "aria-controls": 'nav-send-message', "aria-selected": 'true' }, "Submit Question"),
                    React.createElement("button", { onClick: function () { return setMessagesClick(true); }, className: 'nav-link', id: 'nav-message-tab', "data-bs-toggle": 'tab', "data-bs-target": '#nav-message', type: 'button', role: 'tab', "aria-controls": 'nav-message', "aria-selected": 'false' }, "Q/A Response/Pending"))),
            React.createElement("div", { className: 'tab-content', id: 'nav-tabContent' },
                React.createElement("div", { className: 'tab-pane fade show active', id: 'nav-send-message', role: 'tabpanel', "aria-labelledby": 'nav-send-message-tab' },
                    React.createElement(PostNewMessage_1.PostNewMessage, null)),
                React.createElement("div", { className: 'tab-pane fade', id: 'nav-message', role: 'tabpanel', "aria-labelledby": 'nav-message-tab' }, messagesClick ? React.createElement(Messages_1.Messages, null) : React.createElement(React.Fragment, null))))));
};
