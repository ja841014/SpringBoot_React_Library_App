package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.BookRepository;
import com.selflearn.springbootlibrary.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private BookRepository bookRepository;
    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
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
