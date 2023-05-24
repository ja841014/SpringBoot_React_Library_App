package com.selflearn.springbootlibrary.requestmodels;

import com.selflearn.springbootlibrary.entity.Book;
import lombok.Data;

import java.util.Optional;

@Data
public class ReviewRequest {
    private double rating;
    private Book book;
    private Optional<String> reviewDescription;
}
