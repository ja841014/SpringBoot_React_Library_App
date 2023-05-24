package com.selflearn.springbootlibrary.entity;

//import jakarta.persistence.*;
import javax.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;


import java.util.Date;
import java.util.Optional;

@Entity
@Table(name = "review")
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name="user_email")
    private String userEmail;
    @Column(name = "date")
    @CreationTimestamp
    private Date date;

    @Column(name = "rating")
    private double rating;

//    @Column(name = "book_id")
    @OneToOne(targetEntity = Book.class, cascade = CascadeType.DETACH)
    // the name should same as your database name
    @JoinColumn(name="book_id",
        referencedColumnName = "id")
    private Book bookId;

    @Column(name = "review_description")
    private String reviewDescription;

    public Review() {};

    public Review(Book book, double rating, String userEmail, String reviewDescription, Date date) {
        this.bookId = book;
        this.rating = rating;
        this.userEmail = userEmail;
        this.reviewDescription = reviewDescription;
        this.date = date;
    }
}
