"use strict";
exports.__esModule = true;
var PaymentInfoRequest = /** @class */ (function () {
    function PaymentInfoRequest(amount, currency, receiptEmail) {
        this.amount = amount;
        this.currency = currency;
        this.receiptEmail = receiptEmail;
    }
    return PaymentInfoRequest;
}());
exports["default"] = PaymentInfoRequest;
