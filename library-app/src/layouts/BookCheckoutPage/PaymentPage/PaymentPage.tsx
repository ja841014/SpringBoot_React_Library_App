import { useOktaAuth } from '@okta/okta-react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import PaymentInfoRequest from '../../../models/PaymentInfoRequest';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';


export const PaymentPage = () => {
    
    const {authState} = useOktaAuth();
    const [httpError, setHttpError] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [fees, setFees] = useState(0);
    const [loadingFees, setLoadingFees] = useState(true);

    useEffect(() => {

        if (authState && authState.isAuthenticated) {
            let requestOptions = oktaHeaderSetup();
            api.paymentDetail({headers: requestOptions})
            .then((res) => {
                const responsedata = res.data; 
                if(responsedata.amount === null) {
                    console.log("undefined")
                    setFees(0);
                }
                else {
                    setFees(responsedata.amount);
                }
                setLoadingFees(false);

            })
            .catch((err) => {
                console.error("Get paymentDetail Wrong")
                setLoadingFees(false);
                setHttpError(err.message);
            })
        }
        
    }, [authState]);

    const elements = useElements();
    const stripe = useStripe();

    async function checkout() {
        if (!stripe || !elements || !elements.getElement(CardElement)) {
            return;
        }

        setSubmitDisabled(true);

        let paymentInfo = new PaymentInfoRequest(Math.round(fees * 100), 'USD', authState?.accessToken?.claims.sub);
        let requestHeaders = oktaHeaderSetup();

        api.createPaymentIntent({data: paymentInfo, headers: requestHeaders})
        .then((res) => {
            let stripeResponseJson = res.data;

            stripe.confirmCardPayment(
                stripeResponseJson.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement)!,
                        billing_details: {
                            email: authState?.accessToken?.claims.sub
                        }
                    }
                }, {handleActions: false}
            ).then(
                async function (result: any) {
                    if (result.error) {
                        setSubmitDisabled(false)
                        alert('There was an error')
                    } else {
                        stripePaymentComplete(requestHeaders);
                    }
                }
            );
            setHttpError(false);

        })
        .catch((err) => {
            setHttpError(true);
            setSubmitDisabled(false);
            throw new Error('Something went wrong!');
        })
        
    }

    function stripePaymentComplete(requestHeaders: any) {
        api.stripePaymentComplete({headers: requestHeaders})
        .then((res) => {
            setFees(0);
            setSubmitDisabled(false);

        })
        .catch((err) => {
            setHttpError(true)
            setSubmitDisabled(false)
            throw new Error('Something went wrong!')
        })
    }

    function oktaHeaderSetup() {
        const requestOptions = {
            headers : {
                "Authorization": `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": 'application/json'
            }
        };
        return requestOptions.headers;
    }


    if (loadingFees) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }


    return(
        <div className='container'>
            {fees > 0 && <div className='card mt-3'>
                <h5 className='card-header'>Fees pending: <span className='text-danger'>${fees}</span></h5>
                <div className='card-body'>
                    <h5 className='card-title mb-3'>Credit Card</h5>
                    <CardElement id='card-element' />
                    <button disabled={submitDisabled} type='button' className='btn btn-md btn-primary text-white mt-3' 
                        onClick={checkout}>
                        Pay fees
                    </button>
                </div>
            </div>}

            {fees === 0 && 
                <div className='mt-3'>
                    <h5>You have no fees!</h5>
                    <Link type='button' className='btn btn-primary ' to='search'>
                        Explore top books
                    </Link>
                </div>
            }
            {submitDisabled && <SpinnerLoading/>}
        </div>
    );
}