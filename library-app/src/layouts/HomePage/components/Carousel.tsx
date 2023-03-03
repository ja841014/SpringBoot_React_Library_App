import { useEffect, useState } from "react";
import { ReturnBook } from "./ReturnBook";
import BookModel from "../../../models/BookModel"
import api from "../../../api";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";


export const Carousel = () => {
    // paranthesis of type array and initial is empty array
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // use Effect will call when this componenet is created 
    // then it will call each times something change in the array(second para) changes 
    useEffect(() => {
        api.getAllBooks({page: '0', size: '9'}).then((res) => {
            const loadedBooks : BookModel[] = [];
            console.log(res);
            const responsedata = res.data.content;
            for(const key in responsedata) {
                
                loadedBooks.push({
                    id : responsedata[key].id,
                    title: responsedata[key].title,
                    author: responsedata[key].author,
                    description: responsedata[key].description,
                    copies: responsedata[key].copies,
                    copiesAvailable: responsedata[key].copiesAvailable,
                    category: responsedata[key].category,
                    img: responsedata[key].img,
                })
            }
            
            setBooks(loadedBooks);
            setIsLoading(false);
            
            // console.log(books)
            
        }, (error => {
            console.error("Error")
            setIsLoading(false)
            setHttpError(error.message)
            throw new Error(error.message);
        }))

    }, []); 

    if(isLoading) {
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

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {
                                books.slice(0, 3).map(book => (
                                    <ReturnBook 
                                        key = {book.author}
                                        book = {book}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {
                                books.slice(3, 6).map(book => (
                                    <ReturnBook 
                                        key = {book.author} 
                                        book = {book}
                                    />
                                ))
                            }
                        </div> 
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {
                                books.slice(6, 9).map(book => (
                                    <ReturnBook 
                                        key = {book.author} 
                                        book = {book}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <button className='carousel-control-prev' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                {
                    <ReturnBook 
                        key = {books[5].author}
                        book = {books[5]}
                    />
                }
                
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className="btn btn-outline-secondary btn-lg" to="/search">View More</Link>
            </div>
        </div>
    );
}