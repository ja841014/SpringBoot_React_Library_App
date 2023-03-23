import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import ReviewModel from "../../models/ReviewModel";
import { Pagination } from "../Utils/Pagination";
import { Review } from "../Utils/Review";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const ReviewListPage = () => {

    interface BookParams {
        bookId: string;
    }

    // get bookId from url
    const bookParams  = useParams<BookParams>();
    const bookId = bookParams.bookId;


    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [httpError, setHttpError] = useState(null);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

   // get book review
   useEffect(() => {

        api.getReviewByBookId({id: bookId, page: 0, size: 10})
        .then((res) => {
            const responsedata = res.data.content;

            setTotalAmountOfReviews(res.data.totalElements)
            setTotalPages(res.data.totalPages)

            const reviews: ReviewModel[] = [];

            for(const key in responsedata) {
                reviews.push({
                    id: responsedata[key].id,
                    userEmail: responsedata[key].userEmail,
                    date: responsedata[key].date,
                    rating: responsedata[key].rating,
                    book_id: responsedata[key].bookId,
                    reviewDescription: responsedata[key].reviewDescription,
                })
            }

            setReviews(reviews);
            setIsLoadingReviews(false)

        })
        .catch((error) => {

            console.error("Loading Review Error")
            setIsLoadingReviews(false)
            setHttpError(error.message)
            throw new Error(error.message);
        })
    }, [currentPage]);

    if(isLoadingReviews) {
        return (
            <SpinnerLoading/>
        )
    }

    if(httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastReview: number = currentPage * reviewsPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;
    let lastItemIdx = reviewsPerPage * currentPage <= totalAmountOfReviews ? reviewsPerPage * currentPage : totalAmountOfReviews;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return(
        <div className="container mt-5">
            <div>
                <h3>Comments: ({reviews.length})</h3>
            </div>
            <p>
                {indexOfFirstReview + 1} to {lastItemIdx} of {totalAmountOfReviews} items:
            </p>
            <div className="row">
                {reviews.map(review => (
                    <Review review={review} key={review.id} />
                ))}
            </div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );

}