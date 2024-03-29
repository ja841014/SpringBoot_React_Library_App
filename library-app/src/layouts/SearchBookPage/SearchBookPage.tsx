import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import BookModel from "../../models/BookModel";
import { Pagination } from "../Utils/Pagination";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./componenet/SearchBook";


export const SearchBookPage = () => {
    
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');
    const [categorySelection, setCategorySelection] = useState("Book Category");



    // use Effect will call when this componenet is created 
    // then it will call each times something change in the array(second para) changes 
    useEffect(() => {
        // why we "currentPage - 1", because in pagination and through the API 0 is the first page.
        api.getAllBooks({ page: currentPage - 1, size: booksPerPage, title: title, category: categorySelection }).then((res) => {
            const loadedBooks: BookModel[] = [];
            console.log(res);
            const responsedata = res.data.content;

            setTotalAmountOfBooks(res.data.totalElements)
            setTotalPages(res.data.totalPages)

            for (const key in responsedata) {

                loadedBooks.push({
                    id: responsedata[key].id,
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

        }).catch((error) => {
            console.error("Error")
            setIsLoading(false)
            setHttpError(error.message)
            throw new Error(error.message);
        })
        // it will scroll the page to the top
        window.scroll(0, 0);
    }, [currentPage, search, categorySelection]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const searchHandleChange = () => {
        setCurrentPage(1);
        setSearch(title);
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        setCategorySelection(value);
        
    }


    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItemIdx = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setTitle(e.target.value)} />
                                <button className='btn btn-outline-success'
                                    onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('All')}>
                                        <button className='dropdown-item' >
                                            All
                                        </button>
                                    </li>
                                    <li onClick={() => categoryField('FE')}>
                                        <button className='dropdown-item' >
                                            Front End
                                        </button>
                                    </li>
                                    <li onClick={() => categoryField('BE')}>
                                        <button className='dropdown-item'>
                                            Back End
                                        </button>
                                    </li>
                                    <li onClick={() => categoryField('Data')}>
                                        <button className='dropdown-item' >
                                            Data
                                        </button>
                                    </li>
                                    <li onClick={() => categoryField('DevOps')}>
                                        <button className='dropdown-item'>
                                            DevOps
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* {books.map(book => (
                        <SearchBook book={book} key={book.id} />
                    ))} */}
                    {totalAmountOfBooks > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({totalAmountOfBooks})</h5>
                            </div>
                            <p>
                                {indexOfFirstBook + 1} to {lastItemIdx} of {totalAmountOfBooks} items:
                            </p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id} />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <Link type='button' className='btn btn-primary btn-md px-4 me-md-2 fw-bold text-white'
                                to='/home'>Library Services</Link>
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}