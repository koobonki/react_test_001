package com.example.demo.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * 품목(ProductModel) 엔티티 — DB 테이블 {@code product_models}.
 *
 * <p>하나의 상품(Product) 아래 여러 품목(모델/SKU)이 존재하는 1:N 관계입니다.
 * 예: 상품 "노트북" → 품목 "MacBook Pro 14", "Galaxy Book4 Pro" …</p>
 */
@Entity
@Table(name = "product_models")
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 이 품목이 속한 상품.
     * {@code @ManyToOne}: 품목 여러 개 → 상품 1개.
     * {@code @JsonIgnore}: JSON 응답에 Product 전체 객체는 넣지 않음 (순환 참조 방지).
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    private Product product;

    /** 품목명 (예: MacBook Pro 14) */
    private String modelName;

    /** 품목 코드 (예: NB-001) */
    private String modelCode;

    /** 품목 가격 */
    private Integer price;

    /** 품목 재고 */
    private Integer stock;

    public ProductModel() {
    }

    public ProductModel(Product product, String modelName, String modelCode, Integer price, Integer stock) {
        this.product = product;
        this.modelName = modelName;
        this.modelCode = modelCode;
        this.price = price;
        this.stock = stock;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    /**
     * Frontend에서 어느 상품의 품목인지 알 수 있도록 productId만 JSON으로 내려줍니다.
     */
    public Long getProductId() {
        return product != null ? product.getId() : null;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getModelCode() {
        return modelCode;
    }

    public void setModelCode(String modelCode) {
        this.modelCode = modelCode;
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
