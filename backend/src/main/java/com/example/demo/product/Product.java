package com.example.demo.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * 상품(Product) 엔티티 — DB 테이블 {@code products}와 1:1로 매핑됩니다.
 *
 * <p>JPA Entity: Java 클래스 필드가 DB 컬럼과 연결됩니다.
 * Controller → Repository → Entity 순으로 데이터가 저장/조회됩니다.</p>
 */
@Entity
@Table(name = "products")
public class Product {

    /** PK. DB가 자동 증가(IDENTITY) 방식으로 번호를 부여합니다. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 상품명 (예: 노트북) */
    private String name;

    /** 카테고리 (예: 전자기기, 가구) — Frontend Tab 필터에 사용 */
    private String category;

    /** 판매 가격 (원) */
    private Integer price;

    /** 재고 수량 */
    private Integer stock;

    /** MegaMenu 연동용 메뉴 코드 */
    private String menuCode;

    /** JPA가 객체를 만들 때 필요한 기본 생성자 */
    public Product() {
    }

    /** 테스트/시드 데이터 삽입용 생성자 */
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

    public String getMenuCode() {
        return menuCode;
    }

    public void setMenuCode(String menuCode) {
        this.menuCode = menuCode;
    }
}
