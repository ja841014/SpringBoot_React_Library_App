"use strict";
exports.__esModule = true;
exports.AdminMessage = void 0;
var react_1 = require("react");
exports.AdminMessage = function (props) {
    var _a = react_1.useState(''), response = _a[0], setResponse = _a[1];
    var _b = react_1.useState(false), displayWarning = _b[0], setDisplayWarning = _b[1];
    function submitBtn() {
        if (props.message.id !== null && response !== '') {
            props.submitResponseToQuestion(props.message.id, response);
            setDisplayWarning(false);
        }
        else {
            setDisplayWarning(true);
        }
    }
    return (React.createElement("div", { key: props.message.id },
        React.createElement("div", { className: "card mt-2 shadow p-3 bg-body rounded" },
            React.createElement("h5", null,
                "Case #",
                props.message.id,
                " : ",
                props.message.title),
            React.createElement("h6", null, props.message.userEmail),
            React.createElement("p", null, props.message.question),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h5", null, "Response: "),
                React.createElement("form", { action: "PUT" },
                    displayWarning &&
                        React.createElement("div", null,
                            React.createElement("div", { className: "alert alert-danger", role: 'alert' }, "All fields must be filled out")),
                    React.createElement("div", { className: "col-md-12 mb-3" },
                        React.createElement("label", { className: "form-label" }, "Description"),
                        React.createElement("textarea", { className: "form-control", id: 'exampleFormControlTextarea1', rows: 3, onChange: function (e) { return setResponse(e.target.value); }, value: response })),
                    React.createElement("div", null,
                        React.createElement("button", { type: "button", className: "btn btn-primary mt-3", onClick: submitBtn }, "Submit Response")))))));
};
