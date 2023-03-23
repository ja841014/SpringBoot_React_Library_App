package com.selflearn.springbootlibrary.controller;


import com.selflearn.springbootlibrary.entity.Book;
import com.selflearn.springbootlibrary.responsemodels.ShelfCurrentLoansResponse;
import com.selflearn.springbootlibrary.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BookController {

    private BookService bookService;
    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public Page<Book> findByTitleContainingOrCategory(@RequestParam(value = "page", defaultValue = "0", required = false) int page,
                                                      @RequestParam(value = "size", defaultValue = "10", required = false) int size,
                                                      @RequestParam(value = "title", defaultValue = "", required = false) String title,
                                                      @RequestParam(value = "category", defaultValue = "", required = false) String category) {

        if(!title.equals("") && !category.equals("Book Category") && !category.equals("All")) {
            System.out.println("Get /books {title} {category} " + title + ", " + category);
            return bookService.findByTitleContainingAndCategoryContaining(page, size, title, category);
        }
        else if(!category.equals("Book Category") && !category.equals("All")) {
            System.out.println("Get /books {category} " + category);
            return bookService.findByCategoryContaining(page, size, category);
        }
        else {
            System.out.println("have title and no category");
            System.out.println("Get /books {title} " + title);
            return bookService.findByTitleContaining(page, size, title);
        }
    }
    @GetMapping("/books/{id}")
    public Book findById(@PathVariable("id") Long id) {
        System.out.println("Get /books/{id}" + id);
        return bookService.findById(id);

    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId,
                             JwtAuthenticationToken jwtAuthenticationToken) throws Exception{

        System.out.println("Put /secure/checkout");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        return bookService.checkoutBook(userEmail, bookId);
    }

    @GetMapping("/secure/checkout")
    public boolean checkoutBookByUser(@RequestParam Long bookId,
                                      JwtAuthenticationToken jwtAuthenticationToken) throws Exception{
        System.out.println("Get /secure/checkout");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        return bookService.checkoutBookByUser(userEmail, bookId);
    }


    @GetMapping("/secure/loans/count")
    public int currentLoansCount(JwtAuthenticationToken jwtAuthenticationToken) throws Exception {
        System.out.println("Get /secure/loans/count");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        return bookService.currentLoansCount(userEmail);
    }
    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoansResponseList(JwtAuthenticationToken jwtAuthenticationToken) throws Exception {
        System.out.println("Get /secure/currentloans");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        return bookService.currentLoansResponseList(userEmail);
    }
    @PutMapping("/secure/return")
    public void returnBook(@RequestParam Long bookId,
                           JwtAuthenticationToken jwtAuthenticationToken) throws Exception{
        System.out.println("Put /secure/return");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        bookService.returnBook(userEmail, bookId);

    }
    @PutMapping("/secure/renewloan")
    public void renewLoan(@RequestParam Long bookId,
                          JwtAuthenticationToken jwtAuthenticationToken) throws Exception{
        System.out.println("Put /secure/renewloan");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        bookService.renewLoan(userEmail, bookId);
    }

}
