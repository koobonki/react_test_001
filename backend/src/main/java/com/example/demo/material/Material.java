package com.example.demo.material;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "materials")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String materialCode;

    private String materialName;

    /** 자재구분: 원자재, 부자재, 포장재, 소모품 */
    private String category;

    /** 단위: EA, KG, M, L, SET */
    private String unit;

    private String supplier;

    /** 상태: 사용, 단종, 검토중 */
    private String status;

    private String location;

    private Integer stock;

    private String remark;

    public Material() {
    }

    public Material(
            String materialCode,
            String materialName,
            String category,
            String unit,
            String supplier,
            String status,
            String location,
            Integer stock,
            String remark) {
        this.materialCode = materialCode;
        this.materialName = materialName;
        this.category = category;
        this.unit = unit;
        this.supplier = supplier;
        this.status = status;
        this.location = location;
        this.stock = stock;
        this.remark = remark;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
