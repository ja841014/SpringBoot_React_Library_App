import { useEffect, useState } from "react";
import api from "../../../api";
import BookModel from "../../../models/BookModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ChangeQuantityOfBook } from "./ChangeQuantityOfBook";

export const ChangeQuantityOfBooks = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [bookDelete, setBookDelete] = useState(false);
    
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
        
    }, [currentPage, bookDelete]);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    const deleteBook = () => setBookDelete(!bookDelete);

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItemIdx = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <div className='container mt-5'>
            {totalAmountOfBooks > 0 ?
                <>
                    <div className='mt-3'>
                        <h3>Number of results: ({totalAmountOfBooks})</h3>
                    </div>
                    <p>
                        {indexOfFirstBook + 1} to {lastItemIdx} of {totalAmountOfBooks} items: 
                    </p>
                    {books.map(book => (
                       <ChangeQuantityOfBook book={book} key={book.id} deleteBook={deleteBook}/>
                    ))}
                </>
                :
                <h5>Add a book before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}