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
exports.PaymentPage = void 0;
var okta_react_1 = require("@okta/okta-react");
var react_stripe_js_1 = require("@stripe/react-stripe-js");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var api_1 = require("../../../api");
var PaymentInfoRequest_1 = require("../../../models/PaymentInfoRequest");
var SpinnerLoading_1 = require("../../Utils/SpinnerLoading");
exports.PaymentPage = function () {
    var authState = okta_react_1.useOktaAuth().authState;
    var _a = react_1.useState(false), httpError = _a[0], setHttpError = _a[1];
    var _b = react_1.useState(false), submitDisabled = _b[0], setSubmitDisabled = _b[1];
    var _c = react_1.useState(0), fees = _c[0], setFees = _c[1];
    var _d = react_1.useState(true), loadingFees = _d[0], setLoadingFees = _d[1];
    react_1.useEffect(function () {
        if (authState && authState.isAuthenticated) {
            var requestOptions = oktaHeaderSetup();
            api_1["default"].paymentDetail({ headers: requestOptions })
                .then(function (res) {
                var responsedata = res.data;
                if (responsedata.amount === null) {
                    console.log("undefined");
                    setFees(0);
                }
                else {
                    setFees(responsedata.amount);
                }
                setLoadingFees(false);
            })["catch"](function (err) {
                console.error("Get paymentDetail Wrong");
                setLoadingFees(false);
                setHttpError(err.message);
            });
        }
    }, [authState]);
    var elements = react_stripe_js_1.useElements();
    var stripe = react_stripe_js_1.useStripe();
    function checkout() {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var paymentInfo, requestHeaders;
            return __generator(this, function (_b) {
                if (!stripe || !elements || !elements.getElement(react_stripe_js_1.CardElement)) {
                    return [2 /*return*/];
                }
                setSubmitDisabled(true);
                paymentInfo = new PaymentInfoRequest_1["default"](Math.round(fees * 100), 'USD', (_a = authState === null || authState === void 0 ? void 0 : authState.accessToken) === null || _a === void 0 ? void 0 : _a.claims.sub);
                requestHeaders = oktaHeaderSetup();
                api_1["default"].createPaymentIntent({ data: paymentInfo, headers: requestHeaders })
                    .then(function (res) {
                    var _a;
                    var stripeResponseJson = res.data;
                    stripe.confirmCardPayment(stripeResponseJson.client_secret, {
                        payment_method: {
                            card: elements.getElement(react_stripe_js_1.CardElement),
                            billing_details: {
                                email: (_a = authState === null || authState === void 0 ? void 0 : authState.accessToken) === null || _a === void 0 ? void 0 : _a.claims.sub
                            }
                        }
                    }, { handleActions: false }).then(function (result) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (result.error) {
                                    setSubmitDisabled(false);
                                    alert('There was an error');
                                }
                                else {
                                    stripePaymentComplete(requestHeaders);
                                }
                                return [2 /*return*/];
                            });
                        });
                    });
                    setHttpError(false);
                })["catch"](function (err) {
                    setHttpError(true);
                    setSubmitDisabled(false);
                    throw new Error('Something went wrong!');
                });
                return [2 /*return*/];
            });
        });
    }
    function stripePaymentComplete(requestHeaders) {
        api_1["default"].stripePaymentComplete({ headers: requestHeaders })
            .then(function (res) {
            setFees(0);
            setSubmitDisabled(false);
        })["catch"](function (err) {
            setHttpError(true);
            setSubmitDisabled(false);
            throw new Error('Something went wrong!');
        });
    }
    function oktaHeaderSetup() {
        var _a;
        var requestOptions = {
            headers: {
                "Authorization": "Bearer " + ((_a = authState === null || authState === void 0 ? void 0 : authState.accessToken) === null || _a === void 0 ? void 0 : _a.accessToken),
                "Content-Type": 'application/json'
            }
        };
        return requestOptions.headers;
    }
    if (loadingFees) {
        return (React.createElement(SpinnerLoading_1.SpinnerLoading, null));
    }
    if (httpError) {
        return (React.createElement("div", { className: 'container m-5' },
            React.createElement("p", null, httpError)));
    }
    return (React.createElement("div", { className: 'container' },
        fees > 0 && React.createElement("div", { className: 'card mt-3' },
            React.createElement("h5", { className: 'card-header' },
                "Fees pending: ",
                React.createElement("span", { className: 'text-danger' },
                    "$",
                    fees)),
            React.createElement("div", { className: 'card-body' },
                React.createElement("h5", { className: 'card-title mb-3' }, "Credit Card"),
                React.createElement(react_stripe_js_1.CardElement, { id: 'card-element' }),
                React.createElement("button", { disabled: submitDisabled, type: 'button', className: 'btn btn-md btn-primary text-white mt-3', onClick: checkout }, "Pay fees"))),
        fees === 0 &&
            React.createElement("div", { className: 'mt-3' },
                React.createElement("h5", null, "You have no fees!"),
                React.createElement(react_router_dom_1.Link, { type: 'button', className: 'btn btn-primary ', to: 'search' }, "Explore top books")),
        submitDisabled && React.createElement(SpinnerLoading_1.SpinnerLoading, null)));
};
