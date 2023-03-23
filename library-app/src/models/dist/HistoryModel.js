"use strict";
exports.__esModule = true;
var HistoryModel = /** @class */ (function () {
    function HistoryModel(id, userEmail, checkoutDate, returnDate, title, author, description, img) {
        this.id = id;
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.title = title;
        this.author = author;
        this.description = description;
        this.img = img;
    }
    return HistoryModel;
}());
exports["default"] = HistoryModel;
