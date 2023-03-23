package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.BookRepository;
import com.selflearn.springbootlibrary.dao.CheckoutRepository;
import com.selflearn.springbootlibrary.dao.HistoryRepository;
import com.selflearn.springbootlibrary.entity.Book;
import com.selflearn.springbootlibrary.entity.Checkout;
import com.selflearn.springbootlibrary.entity.History;
import com.selflearn.springbootlibrary.responsemodels.ShelfCurrentLoansResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.concurrent.TimeUnit;


@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;
    private HistoryRepository historyRepository;
    @Autowired
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
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


    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findBookByUserEmail(userEmail).size();
    }
    public boolean checkoutBookByUser(String userEmail, Long bookId)  {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId_Id(userEmail, bookId);
        if(validateCheckout != null) {
            return true;
        }
        return false;
    }


    public Book checkoutBook(String userEmail, Long bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);
        System.out.println("checkoutBook: " + book.isPresent());
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId_Id(userEmail, bookId);

        if(!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book does not exist or already checked out by user");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get()
        );
        checkoutRepository.save(checkout);
        return book.get();
    }

    public List<ShelfCurrentLoansResponse> currentLoansResponseList(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();
        // get all this user checkout
        List<Checkout> checkouts = checkoutRepository.findBookByUserEmail(userEmail);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (Checkout checkout : checkouts) {

            Date d1 = sdf.parse(checkout.getReturnDate());
            Date d2 = sdf.parse(LocalDate.now().toString());

            TimeUnit time = TimeUnit.DAYS;

            long difference_In_Time = time.convert(d1.getTime() - d2.getTime(),
                    TimeUnit.MILLISECONDS);
            System.out.println("Checkout join Book");
            System.out.println(checkout.getBookId());
            shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(checkout.getBookId(), (int) difference_In_Time));
        }

        return shelfCurrentLoansResponses;
    }

    public void returnBook(String userEmail, Long bookId) throws Exception{
        Checkout validCheckout = checkoutRepository.findByUserEmailAndBookId_Id(userEmail, bookId);
        if(validCheckout == null) {
            throw new Exception("Book does not exist or user do not checkout rhe book");
        }

        Book book = validCheckout.getBookId();
        book.setCopiesAvailable(book.getCopiesAvailable() + 1);
        bookRepository.save(book);
        historyRepository.save(new History(userEmail, validCheckout.getCheckoutDate(), LocalDate.now().toString(),
                book.getTitle(), book.getAuthor(), book.getDescription(), book.getImg()));
        checkoutRepository.deleteById(validCheckout.getId());
    }

    public void renewLoan(String userEmail, Long bookId) throws Exception{
        Checkout validCheckout = checkoutRepository.findByUserEmailAndBookId_Id(userEmail, bookId);
        if(validCheckout == null) {
            throw new Exception("Book does not exist or user do not checkout rhe book");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = sdf.parse(validCheckout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());
        System.out.println(d1);
        System.out.println(d2);

        if(d1.compareTo(d2) < 0) {
            return;
        }

        validCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
        checkoutRepository.save(validCheckout);
    }
}
