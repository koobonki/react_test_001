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
 * 상품 모델 Entity — DB의 product_models 테이블과 매핑됩니다.
 * 하나의 상품(Product)에 여러 모델(ProductModel)이 연결됩니다. (N:1)
 */
@Entity
@Table(name = "product_models")
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 어떤 상품에 속하는 모델인지 연결. product_id 컬럼으로 저장됩니다. */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore // JSON 응답에 product 객체 전체를 넣지 않음 (순환 참조 방지)
    private Product product;

    private String modelName;
    private String modelCode;
    private Integer price;
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

    /** JSON 응답에서 productId를 내려주기 위한 getter */
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
