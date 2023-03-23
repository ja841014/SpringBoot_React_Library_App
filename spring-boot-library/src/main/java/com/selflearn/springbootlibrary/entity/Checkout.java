package com.selflearn.springbootlibrary.entity;

//import jakarta.persistence.*;
import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "checkout")
@Data
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "checkout_date")
    private String checkoutDate;

    @Column(name = "return_date")
    private String returnDate;

    @OneToOne(targetEntity = Book.class, cascade = CascadeType.DETACH)
    // the name should same as your database name
    @JoinColumn(name="book_id",
            referencedColumnName = "id")
    private Book bookId;


    public Checkout() {};

    public Checkout(String userEmail, String checkoutDate, String returnDate, Book bookId) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.bookId = bookId;
    }


}
