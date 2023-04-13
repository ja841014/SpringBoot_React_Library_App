package com.selflearn.springbootlibrary.entity;

//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
import javax.persistence.*;
import lombok.Data;



@Entity
@Table(name = "book")
@Data
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "author")
	private String author;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "copies")
	private int copies;
	
	@Column(name = "copies_available")
	private int copiesAvailable;
	
	@Column(name = "category")
	private String category;
	
	@Column(name = "img")
	private String img;


	public Book() {

	}

	public Book(String title, String author, String description, int copies, String category, String img) {
		this.title = title;
		this.author = author;
		this.description = description;
		this.copies = copies;
		this.copiesAvailable = copies;
		this.category = category;
		this.img = img;
	}

	public String toString() {
		return "id: " + id + ", title: " + title;
	}
}
