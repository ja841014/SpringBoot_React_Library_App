package com.selflearn.springbootlibrary.dao;

import com.selflearn.springbootlibrary.entity.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
//    Page<Book> findAll(Pageable pageable);

    Page<Book> findByTitleContainingAndCategoryContaining(String title, String category, Pageable pageable);
    Page<Book> findByTitleContaining(String title, Pageable pageable);

    Page<Book> findByCategoryContaining(String category, Pageable pageable);



}
