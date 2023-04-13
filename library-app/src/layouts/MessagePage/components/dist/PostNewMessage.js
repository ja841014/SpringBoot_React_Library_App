"use strict";
exports.__esModule = true;
exports.PostNewMessage = void 0;
var okta_react_1 = require("@okta/okta-react");
var react_1 = require("react");
var api_1 = require("../../../api");
var MessageModel_1 = require("../../../models/MessageModel");
exports.PostNewMessage = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    var _a = react_1.useState(''), title = _a[0], setTitle = _a[1];
    var _b = react_1.useState(''), question = _b[0], setQuestion = _b[1];
    var _c = react_1.useState(false), displayWarning = _c[0], setDisplayWarning = _c[1];
    var _d = react_1.useState(false), displaySuccess = _d[0], setDisplaySuccess = _d[1];
    function submitNewQuestion() {
        if ((authState === null || authState === void 0 ? void 0 : authState.isAuthenticated) && title !== '' && question !== '') {
            var requestOptions = oktaHeaderSetup();
            var messageRequestModel = new MessageModel_1["default"](title, question);
            api_1["default"].submitNewQuestion({ data: messageRequestModel, headers: requestOptions.headers })
                .then(function (res) {
                setTitle('');
                setQuestion('');
                setDisplayWarning(false);
                setDisplaySuccess(true);
            })["catch"](function (error) {
                console.error(error.message);
                throw new Error(error.message);
            });
        }
        else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }
    function oktaHeaderSetup() {
        var _a;
        var requestOptions = {
            headers: {
                "Authorization": "Bearer " + ((_a = authState === null || authState === void 0 ? void 0 : authState.accessToken) === null || _a === void 0 ? void 0 : _a.accessToken),
                "Content-Type": 'application/json'
            }
        };
        return requestOptions;
    }
    return (React.createElement("div", { className: 'card mt-3' },
        React.createElement("div", { className: 'card-header' }, "Ask question to Luv 2 Read Admin"),
        React.createElement("div", { className: 'card-body' },
            React.createElement("form", { method: 'POST' },
                displayWarning &&
                    React.createElement("div", { className: 'alert alert-danger', role: 'alert' }, "All fields must be filled out"),
                displaySuccess &&
                    React.createElement("div", { className: 'alert alert-success', role: 'alert' }, "Question added successfully"),
                React.createElement("div", { className: 'mb-3' },
                    React.createElement("label", { className: 'form-label' }, "Title"),
                    React.createElement("input", { type: 'text', className: 'form-control', id: 'exampleFormControlInput1', placeholder: 'Title', onChange: function (e) { return setTitle(e.target.value); }, value: title })),
                React.createElement("div", { className: 'mb-3' },
                    React.createElement("label", { className: 'form-label' }, "Question"),
                    React.createElement("textarea", { className: 'form-control', id: 'exampleFormControlTextarea1', rows: 3, onChange: function (e) { return setQuestion(e.target.value); }, value: question })),
                React.createElement("div", null,
                    React.createElement("button", { type: 'button', className: 'btn btn-primary mt-3', onClick: submitNewQuestion }, "Submit Question"))))));
};
