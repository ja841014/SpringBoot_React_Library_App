import BookModel from "./BookModel";

class ReviewRequestModel {
    rating: number;
    book: BookModel;
    reviewDescription?: string;

    constructor(rating: number, book: BookModel, reviewDescription?: string) {
        this.rating = rating;
        this.book= book;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewRequestModel;