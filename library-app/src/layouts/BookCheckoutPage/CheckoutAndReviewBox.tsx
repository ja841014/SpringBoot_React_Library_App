import { Link } from "react-router-dom"
import api from "../../api"
import { LeaveAReview } from "../Utils/LeaveAReview"


export const CheckoutAndReviewBox = (props: any) => {


    function buttonRender() {
        if(!props.isAuthenticated) {
            return (
                <Link to={'/login'} className="btn btn-success btn-lg">Sign In</Link>
            )
        }
        
        if(!props.isCheckedOut && props.currentLoansCount < 5) {
            return (
                <button className="btn btn-success btn-lg" onClick={() => props.checkoutBook()}>Checkout</button>
            )
        }
        else if(props.isCheckedOut) {
            return (
                <p><b>Book checked out. Enjoy.</b></p>
            )
        }
        else if(props.currentLoansCount >= 5) {
            return (
                <p className="text-danger">Too many book checked out.</p>
            )
        }
    }

    function reviewRender() {
        if(!props.isAuthenticated) {
            return(
                <div>
                    <hr/>
                    <p>Sign in to be able to leave a review.</p>
                </div>
            );
        }
       
        if(props.isReviewLeft) {
            return(
                <p><b>Thank you for your review!</b></p>
            );
        }
        else {
            return(
                <LeaveAReview submitReview={ props.submitReview }/>
            );
        }
    }

    
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                {reviewRender()}
            </div>
        </div>
    );

}