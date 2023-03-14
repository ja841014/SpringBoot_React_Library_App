package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.BookRepository;
import com.selflearn.springbootlibrary.dao.CheckoutRepository;
import com.selflearn.springbootlibrary.entity.Book;
import com.selflearn.springbootlibrary.entity.Checkout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;
    @Autowired
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findBookByUserEmail(userEmail).size();
    }
    public boolean checkoutBookByUser(String userEmail, Long bookId)  {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if(validateCheckout != null) {
            return true;
        }
        return false;
    }


    public Book checkoutBook(String userEmail, Long bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);
        System.out.println("checkoutBook: " + book.isPresent());
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if(!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book does not exist or already checked out by user");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId()
        );
        checkoutRepository.save(checkout);
        return book.get();
    }

    public Book findById(Long id) {
        return bookRepository.findById(id).get();
    }
    public Page<Book> findByTitleContainingAndCategoryContaining(int page, int size, String title, String category) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findByTitleContainingAndCategoryContaining(title, category, pageable);
    }
    public Page<Book> findByTitleContaining(int page, int size, String title) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findByTitleContaining(title, pageable);
    }

    public Page<Book> findByCategoryContaining(int page, int size, String category) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findByCategoryContaining(category, pageable);
    }
}
