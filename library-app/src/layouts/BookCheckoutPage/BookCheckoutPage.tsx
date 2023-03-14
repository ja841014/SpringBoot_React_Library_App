import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import BookModel from "../../models/BookModel";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {

    interface BookParams {
        bookId: string;
    }

    const[book, setBook] = useState<BookModel>();
    const[isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);
    // get bookId from url
    const bookParams  = useParams<BookParams>();
    const bookId = bookParams.bookId;

    // get book information from backend
    useEffect(() => {
        api.getBook({id: bookId}).then((res) => {
            
            const responsedata = res.data;
            console.log("book data");
            console.log(responsedata);

            const loadedBook : BookModel = {
                id : responsedata.id,
                title: responsedata.title,
                author: responsedata.author,
                description: responsedata.description,
                copies: responsedata.copies,
                copiesAvailable: responsedata.copiesAvailable,
                category: responsedata.category,
                img: responsedata.img,
            };
            
            
            setBook(loadedBook);
            setIsLoading(false);
            
            
        }, (error => {
            console.error("Loading Book Error")
            setIsLoading(false)
            setHttpError(error.message)
            throw new Error(error.message);
        }))

    }, []); 

    useEffect(() => {
        api.getReviewByBookId({id: bookId, page: 0, size: 10}).then((res) => {
            const responsedata = res.data.content;
            console.log("review Data: ");
            console.log(responsedata);

            const reviews: ReviewModel[] = [];

            let weightedStarReview: number = 0;

            for(const key in responsedata) {
                reviews.push({
                    id: responsedata[key].id,
                    userEmail: responsedata[key].userEmail,
                    date: responsedata[key].date,
                    rating: responsedata[key].rating,
                    book_id: responsedata[key].bookId,
                    reviewDescription: responsedata[key].reviewDescription,
                })
                weightedStarReview = weightedStarReview + responsedata[key].rating;
                console.log("weightedStarReview: " + weightedStarReview)
            }

            if(reviews) {
                const round = (Math.round((weightedStarReview / reviews.length) * 2) / 2).toFixed(1);
                console.log("round Star: " + weightedStarReview + ", "+ reviews.length + ", "+ round)
                setTotalStars(Number(round));
            }
            setReviews(reviews);
            setIsLoadingReview(false)

        }, (error => {

            console.error("Loading Review Error")
            setIsLoadingReview(false)
            setHttpError(error.message)
            throw new Error(error.message);
        }) )
    }, []);

    if(isLoading || isLoadingReview) {
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

    return(
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt='Book' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                                height='349' alt='Book' />
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{book?.title}</h2>
                            <h5 className='text-primary'>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
                    {/* currentLoansCount={currentLoansCount} 
                        isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} 
                        checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview} */}
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>

            {/** Mobile versino */}
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center alighn-items-center'>
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                            height='349' alt='Book' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                {/* currentLoansCount={currentLoansCount} 
                    isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} 
                    checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview} */}
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    );
}