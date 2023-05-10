import { useEffect, useState } from "react";
import api from "../../../api";
import { useOktaAuth } from '@okta/okta-react';

export const ChangeQuantityOfBook = (props: any) => {

    const {authState} = useOktaAuth();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, serRemaining] = useState<number>(0);

    useEffect(() => {
        const fetchBookInstate = () => {
            props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
            props.book.copiesAvailable ? serRemaining(props.book.copiesAvailable): serRemaining(0);
        }
        fetchBookInstate();
    }, [])


    function increaseQuantity() {

        let requestOptions = oktaHeaderSetup();

        api.changeBookQuantity({data:{bookId: props.book.id, scale: 1}, headers: requestOptions})
        .then((res) => {
            setQuantity(quantity + 1)
            serRemaining(remaining + 1)
        })
        .catch((err) => {
            console.error("Error!!" + err.message)
            throw new Error(err.message);
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


    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.book.img ?
                            <img src={props.book.img} width='123' height='196' alt='Book' />
                            :
                            <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} 
                                width='123' height='196' alt='Book' />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {props.book.img ?
                            <img src={props.book.img} width='123' height='196' alt='Book' />
                            :
                            <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} 
                                width='123' height='196' alt='Book' />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.book.author}</h5>
                        <h4>{props.book.title}</h4>
                        <p className='card-text'> {props.book.description} </p>
                    </div>
                </div>
                <div className='mt-3 col-md-4'>
                    <div className='d-flex justify-content-center algin-items-center'>
                        <p>Total Quantity: <b>{quantity}</b></p>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <p>Books Remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className='mt-3 col-md-1'>
                    <div className='d-flex justify-content-start'>
                        <button className='m-1 btn btn-md btn-danger' onClick={deleteBook}>Delete</button>
                    </div>
                </div>
                <button className='m1 btn btn-md main-color text-white' onClick={increaseQuantity}>Add Quantity</button>
                <button className='m1 btn btn-md btn-warning' onClick={decreaseQuantity}>Decrease Quantity</button>
            </div>
        </div>
    );
}