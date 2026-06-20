package com.example.demo.product;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

/**
 * 상품 모델 REST API Controller.
 * URL prefix: /api/products/{productId}/models
 *
 * 특정 상품에 종속된 모델만 조회·등록·수정·삭제합니다.
 */
@RestController
@RequestMapping("/api/products/{productId}/models")
public class ProductModelController {

    private final ProductRepository productRepository;
    private final ProductModelRepository productModelRepository;

    public ProductModelController(
            ProductRepository productRepository,
            ProductModelRepository productModelRepository) {
        this.productRepository = productRepository;
        this.productModelRepository = productModelRepository;
    }

    /** GET — 해당 상품의 모델 목록 */
    @GetMapping
    public List<ProductModel> findAll(@PathVariable Long productId) {
        requireProduct(productId);
        return productModelRepository.findByProduct_IdOrderByIdAsc(productId);
    }

    /** GET — 모델 1건 조회 */
    @GetMapping("/{id}")
    public ProductModel findById(@PathVariable Long productId, @PathVariable Long id) {
        return requireModel(productId, id);
    }

    /** POST — 새 모델 등록 */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductModel create(@PathVariable Long productId, @RequestBody ProductModel body) {
        Product product = requireProduct(productId);
        ProductModel model = new ProductModel(
                product,
                body.getModelName(),
                body.getModelCode(),
                body.getPrice(),
                body.getStock());
        return productModelRepository.save(model);
    }

    /** PUT — 모델 수정 */
    @PutMapping("/{id}")
    public ProductModel update(
            @PathVariable Long productId,
            @PathVariable Long id,
            @RequestBody ProductModel body) {
        ProductModel existing = requireModel(productId, id);
        existing.setModelName(body.getModelName());
        existing.setModelCode(body.getModelCode());
        existing.setPrice(body.getPrice());
        existing.setStock(body.getStock());
        return productModelRepository.save(existing);
    }

    /** DELETE — 모델 삭제 */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long productId, @PathVariable Long id) {
        ProductModel existing = requireModel(productId, id);
        productModelRepository.delete(existing);
    }

    /** 상품이 존재하는지 확인. 없으면 404 예외 */
    private Product requireProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Product not found"));
    }

    /** 모델이 존재하고, 요청한 상품에 속하는지 확인 */
    private ProductModel requireModel(Long productId, Long id) {
        ProductModel model = productModelRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Model not found"));
        if (!productId.equals(model.getProductId())) {
            throw new ResponseStatusException(NOT_FOUND, "Model not found");
        }
        return model;
    }
}
