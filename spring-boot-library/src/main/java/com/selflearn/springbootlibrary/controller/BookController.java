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
        System.out.println("page: " + page +", size: "+ size + ", title: " + title + ", category: " + category);
        if(!title.equals("") && !category.equals("Book Category") && !category.equals("All")) {
            System.out.println("have title and have category");
            return bookService.findByTitleContainingAndCategoryContaining(page, size, title, category);
        }
        else if(!category.equals("Book Category") && !category.equals("All")) {
            System.out.println("no title and have category");
            return bookService.findByCategoryContaining(page, size, category);
        }
        else {
            System.out.println("have title and no category");
            return bookService.findByTitleContaining(page, size, title);
        }

    }


}
