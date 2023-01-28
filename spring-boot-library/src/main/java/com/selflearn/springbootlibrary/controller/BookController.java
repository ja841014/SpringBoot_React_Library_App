package com.selflearn.springbootlibrary.controller;


import com.selflearn.springbootlibrary.entity.Book;
import com.selflearn.springbootlibrary.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;
    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("")
    public Page<Book> findAll(@RequestParam(value = "page", defaultValue = "0", required = false) int page,
                              @RequestParam(value = "size", defaultValue = "10", required = false) int size) {
        System.out.println("hihi");
        return bookService.findAll(page, size);
    }

}
