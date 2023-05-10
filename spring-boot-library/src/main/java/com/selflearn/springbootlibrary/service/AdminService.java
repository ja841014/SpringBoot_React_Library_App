package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.BookRepository;
import com.selflearn.springbootlibrary.entity.Book;
import com.selflearn.springbootlibrary.requestmodels.AddBookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {
    private BookRepository bookRepository;

    @Autowired
    public AdminService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    public void changeBookQuantity(Long bookId, int scale) throws Exception {
        Optional<Book> book  = bookRepository.findById(bookId);
        if(!book.isPresent()) {
            throw new Exception("Book not found");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + scale);
        book.get().setCopies(book.get().getCopies() + scale);

        bookRepository.save(book.get());

    }

    public void postNewBook(AddBookRequest addBookRequest) throws Exception {
        Book book = new Book(addBookRequest.getTitle(), addBookRequest.getAuthor(), addBookRequest.getDescription(),
                addBookRequest.getCopies(), addBookRequest.getCategory(), addBookRequest.getImg());
        bookRepository.save(book);
    }


}
