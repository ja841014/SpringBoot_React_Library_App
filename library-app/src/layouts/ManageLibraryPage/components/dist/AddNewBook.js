"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AddNewBook = void 0;
var okta_react_1 = require("@okta/okta-react");
var react_1 = require("react");
var api_1 = require("../../../api");
var AddBookRequest_1 = require("../../../models/AddBookRequest");
exports.AddNewBook = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    // New Book
    var _a = react_1.useState(''), title = _a[0], setTitle = _a[1];
    var _b = react_1.useState(''), author = _b[0], setAuthor = _b[1];
    var _c = react_1.useState(''), description = _c[0], setDescription = _c[1];
    var _d = react_1.useState(0), copies = _d[0], setCopies = _d[1];
    var _e = react_1.useState('Category'), category = _e[0], setCategory = _e[1];
    var _f = react_1.useState(null), selectedImage = _f[0], setSelectedImage = _f[1];
    // Displays
    var _g = react_1.useState(false), displayWarning = _g[0], setDisplayWarning = _g[1];
    var _h = react_1.useState(false), displaySuccess = _h[0], setDisplaySuccess = _h[1];
    function categoryField(category) {
        setCategory(category);
    }
    function submitNewBook() {
        if ((authState === null || authState === void 0 ? void 0 : authState.isAuthenticated) && title !== '' && author !== '' && category !== 'Category'
            && description !== '' && copies >= 0) {
            var requestOptions = oktaHeaderSetup();
            var AddBookRequestModel = new AddBookRequest_1["default"](title, author, description, copies, category, selectedImage);
            api_1["default"].addNewBook({ data: AddBookRequestModel, headers: requestOptions.headers })
                .then(function (res) {
                setTitle('');
                setAuthor('');
                setDescription('');
                setCopies(0);
                setCategory('Category');
                setSelectedImage(null);
                setDisplayWarning(false);
                setDisplaySuccess(true);
            })["catch"](function (err) {
                setDisplayWarning(true);
                setDisplaySuccess(false);
                console.error("admin submit new book failed", err.message);
                throw new Error(err.message);
            });
        }
        else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }
    function base64ConversionForImages(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (e.target.files[0]) {
                    console.log(-1);
                    getBase64(e.target.files[0]);
                    console.log(0);
                }
                console.log(1);
                return [2 /*return*/];
            });
        });
    }
    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result);
            console.log(2);
        };
        reader.onerror = function (err) {
            console.error("error", err);
        };
        console.log(3);
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
    return (React.createElement("div", { className: 'container mt-5 mb-5' },
        displaySuccess &&
            React.createElement("div", { className: 'alert alert-success', role: 'alert' }, "Book added successfully"),
        displayWarning &&
            React.createElement("div", { className: 'alert alert-danger', role: 'alert' }, "All fields must be filled out"),
        React.createElement("div", { className: 'card' },
            React.createElement("div", { className: 'card-header' }, "Add a new book"),
            React.createElement("div", { className: 'card-body' },
                React.createElement("form", { method: 'POST' },
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: 'col-md-6 mb-3' },
                            React.createElement("label", { className: 'form-label' }, "Title"),
                            React.createElement("input", { type: "text", className: 'form-control', name: 'title', required: true, onChange: function (e) { return setTitle(e.target.value); }, value: title })),
                        React.createElement("div", { className: 'col-md-3 mb-3' },
                            React.createElement("label", { className: 'form-label' }, " Author "),
                            React.createElement("input", { type: "text", className: 'form-control', name: 'author', required: true, onChange: function (e) { return setAuthor(e.target.value); }, value: author })),
                        React.createElement("div", { className: 'col-md-3 mb-3' },
                            React.createElement("label", { className: 'form-label' }, " Category"),
                            React.createElement("button", { className: 'form-control btn btn-secondary dropdown-toggle', type: 'button', id: 'dropdownMenuButton1', "data-bs-toggle": 'dropdown', "aria-expanded": 'false' }, category),
                            React.createElement("ul", { id: 'addNewBookId', className: 'dropdown-menu', "aria-labelledby": 'dropdownMenuButton1' },
                                React.createElement("li", null,
                                    React.createElement("a", { onClick: function () { return categoryField('FE'); }, className: 'dropdown-item' }, "Front End")),
                                React.createElement("li", null,
                                    React.createElement("a", { onClick: function () { return categoryField('BE'); }, className: 'dropdown-item' }, "Back End")),
                                React.createElement("li", null,
                                    React.createElement("a", { onClick: function () { return categoryField('Data'); }, className: 'dropdown-item' }, "Data")),
                                React.createElement("li", null,
                                    React.createElement("a", { onClick: function () { return categoryField('DevOps'); }, className: 'dropdown-item' }, "DevOps"))))),
                    React.createElement("div", { className: 'col-md-12 mb-3' },
                        React.createElement("label", { className: 'form-label' }, "Description"),
                        React.createElement("textarea", { className: 'form-control', id: 'exampleFormControlTextarea1', rows: 3, onChange: function (e) { return setDescription(e.target.value); }, value: description })),
                    React.createElement("div", { className: 'col-md-3 mb-3' },
                        React.createElement("label", { className: 'form-label' }, "Copies"),
                        React.createElement("input", { type: 'number', className: 'form-control', name: 'Copies', required: true, onChange: function (e) { return setCopies(Number(e.target.value)); }, value: copies })),
                    React.createElement("input", { type: 'file', onChange: function (e) { return base64ConversionForImages(e); } }),
                    React.createElement("div", null,
                        React.createElement("button", { type: 'button', className: 'btn btn-primary mt-3', onClick: submitNewBook }, "Add Book")))))));
};
