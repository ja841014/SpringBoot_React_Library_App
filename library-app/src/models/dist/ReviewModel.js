"use strict";
exports.__esModule = true;
var ReviewModel = /** @class */ (function () {
    function ReviewModel(id, userEmail, date, rating, book_id, reviewDescription) {
        this.id = id;
        this.userEmail = userEmail;
        this.date = date;
        this.rating = rating;
        this.book_id = book_id;
        this.reviewDescription = reviewDescription;
    }
    return ReviewModel;
}());
exports["default"] = ReviewModel;
