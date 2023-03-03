import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const BookCheckoutPage = () => {

    const[book, setBook] = useState<BookModel>();
    const[isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const bookId  = useParams();

    useEffect(() => {
        api.getBook({id: bookId}).then((res) => {
            
            const responsedata = res.data;
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

    return(
        <div>
            <h3>
                Hello World
            </h3>
        </div>
    );
}