package com.selflearn.springbootlibrary.responsemodels;

import com.selflearn.springbootlibrary.entity.Book;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {
    private Book book;
    private int daysLeft;
    public ShelfCurrentLoansResponse(Book book, int daysLeft) {
        this.book = book;
        this.daysLeft = daysLeft;
    }

    public  ShelfCurrentLoansResponse() {}
}
