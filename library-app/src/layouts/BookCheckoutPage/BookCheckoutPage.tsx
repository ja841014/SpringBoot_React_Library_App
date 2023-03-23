import { useEffect, useInsertionEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import BookModel from "../../models/BookModel";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from '@okta/okta-react';
import ReviewRequestModel from "../../models/ReviewRequestModel";


export const BookCheckoutPage = () => {

    interface BookParams {
        bookId: string;
    }

    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    const[book, setBook] = useState<BookModel>();
    const[isLoading, setIsLoading] = useState(true);

    // Loans Count state
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const[isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoadingReview, setIsLoadingReview] = useState(true);
    const [totalStars, setTotalStars] = useState(0);

    // get bookId from url
    const bookParams  = useParams<BookParams>();
    const bookId = bookParams.bookId;

    // Is Book Check out
    const[isCheckedOut, setIsCheckedOut] = useState(false)
    const[isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

    //is review left
    const[isReviewLeft, setIsReviewLeft] = useState(false);
    const[isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    // get book information from backend
    useEffect(() => {
        api.getBook({id: bookId})
        .then((res) => {
            const responsedata = res.data;

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
            
        })
        .catch((error) => {
            console.error("Loading Book Error")
            setIsLoading(false)
            setHttpError(error.message)
            throw new Error(error.message);
        })

    }, [isCheckedOut]); 
    // get book review
    useEffect(() => {
        api.getReviewByBookId({id: bookId, page: 0, size: 10})
        .then((res) => {
            const responsedata = res.data.content;

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
            }

            if(reviews) {
                const round = (Math.round((weightedStarReview / reviews.length) * 2) / 2).toFixed(1);
                console.log("round Star: " + weightedStarReview + ", "+ reviews.length + ", "+ round)
                setTotalStars(Number(round));
            }
            setReviews(reviews);
            setIsLoadingReview(false)

        })
        .catch((error) => {

            console.error("Loading Review Error")
            setIsLoadingReview(false)
            setHttpError(error.message)
            throw new Error(error.message);
        })
    }, [isReviewLeft]);
    // to see whether the user leave the review or not
    useEffect(() => {
        if(authState && authState.isAuthenticated) {

            const requestOptions = oktaHeaderSetup();

            api.isLeftReview({params: bookId, headers: requestOptions})
            .then((res) => {
                const responseData = res.data;
                console.log("isLeftReview");
                console.log(responseData);
                if(responseData) {
                    setIsReviewLeft(true);
                }
            })
            .catch((error) => {
                console.error("Loading isLeftReview Error")
                setIsLoadingUserReview(false)
                setHttpError(error.message)
                throw new Error(error.message);
            })
        }
        setIsLoadingUserReview(false)
    })
    // get current user's checkout how many book already
    useEffect(() => {
        if(authState && authState.isAuthenticated) {

            const requestOptions = oktaHeaderSetup();

            api.getCurrentLoansCountByUser({requestOptions: requestOptions})
            .then((res) => {
                const responsedata = res.data;
                console.log("getCurrentLoansCountByUser");
                console.log(responsedata);
                setCurrentLoansCount(responsedata);

            })
            .catch( (error) => {
                console.error("Loading LoadingCurrentLoansCount Error")
                setIsLoadingCurrentLoansCount(false)
                setHttpError(error.message)
                throw new Error(error.message);
            })
        }
        setIsLoadingCurrentLoansCount(false);
        
    }, [authState, isCheckedOut]);
    // get current user checkout current book or not
    useEffect(() => {
        
        if(authState && authState.isAuthenticated) {

            const requestOptions = oktaHeaderSetup();

            api.isCheckoutByUser({params: bookId, headers: requestOptions})
            .then((res) => {
                const responseData = res.data;
                console.log("isCheckoutByUser");
                console.log(responseData);
                if(responseData) {
                    setIsCheckedOut(true);
                }
            })
            .catch((error) => {
                console.error("Loading LoadingCurrentLoansCount Error")
                setIsLoadingBookCheckedOut(false)
                setHttpError(error.message)
                throw new Error(error.message);
            })
        }
        setIsLoadingBookCheckedOut(false)

    }, [authState])

    if(isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckedOut || isLoadingUserReview) {
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

    function checkoutBook() {
        const requestOptions = oktaHeaderSetup();
    
        api.checkoutBook({params: bookId, headers: requestOptions})
        .then((res) => {
            const responseData = res.data;
            console.log("checkoutBook");
            if(responseData) {
                setIsCheckedOut(true);
            }
        })
        .catch((error) => {
            console.error("Loading checkoutBook Error")
            setIsLoadingBookCheckedOut(false)
            setHttpError(error.message)
            throw new Error(error.message);
        })
    }

    function submitReview(star: number, reviewDescription: string) {

        const requestOptions = oktaHeaderSetup();
        let bookId: number = 0;
        if(book?.id) {
            bookId = book.id;
        }
        const reviewRequestModel = new ReviewRequestModel(star, bookId, reviewDescription);

        api.submitReview({data: reviewRequestModel, headers: requestOptions})
        .then((res) => {
            const responseData = res.data;
            console.log("submitReview");
            console.log(responseData);
            setIsReviewLeft(true);

        })
        .catch((error) => {
            console.error("submitReview Error")
            setHttpError(error.message)
            throw new Error(error.message);
        })
    }

    function oktaHeaderSetup() {
        const requestOptions = {
            headers : {
                "Authorization": `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": 'application/json'
            }
        };
        return requestOptions;
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
                    <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount} 
                        isCheckedOut={isCheckedOut} isAuthenticated={authState?.isAuthenticated} checkoutBook={checkoutBook}
                        isReviewLeft = {isReviewLeft} submitReview = {submitReview}
                    />
                    
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
                <CheckoutAndReviewBox book={book} mobile={true} currentLoansCount={currentLoansCount} 
                    isCheckedOut={isCheckedOut} isAuthenticated={authState?.isAuthenticated} checkoutBook={checkoutBook}
                    isReviewLeft = {isReviewLeft} submitReview = {submitReview}
                />
                
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    );
}