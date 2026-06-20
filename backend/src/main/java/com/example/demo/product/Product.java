package com.example.demo.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * 상품 Entity — DB의 products 테이블과 1:1로 매핑됩니다.
 * JPA가 이 클래스를 보고 테이블/컬럼을 자동으로 생성·관리합니다.
 */
@Entity
@Table(name = "products")
public class Product {

    /** PK. DB가 자동으로 번호를 증가(1, 2, 3...)시킵니다. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private Integer price;
    private Integer stock;

    /** JPA는 기본 생성자가 필요합니다. */
    public Product() {
    }

    /** 초기 데이터 삽입 등에 사용하는 편의 생성자 */
    public Product(String name, String category, Integer price, Integer stock) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}
