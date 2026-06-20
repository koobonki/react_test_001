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
 * 품목(ProductModel) REST API Controller.
 *
 * <p>URL prefix: {@code /api/products/{productId}/models}</p>
 * <p>품목은 반드시 특정 상품(productId) 아래에 속합니다.</p>
 *
 * <pre>
 * GET    .../models       → 해당 상품의 품목 목록
 * GET    .../models/{id}  → 품목 단건 (Modal 상세용)
 * POST   .../models       → 품목 등록
 * PUT    .../models/{id}  → 품목 수정
 * DELETE .../models/{id}  → 품목 삭제
 * </pre>
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

    /** GET — 상품에 속한 품목 전체 목록 (AG Grid 데이터 소스) */
    @GetMapping
    public List<ProductModel> findAll(@PathVariable Long productId) {
        requireProduct(productId);
        return productModelRepository.findByProduct_IdOrderByIdAsc(productId);
    }

    /** GET — 품목 1건 상세 조회 */
    @GetMapping("/{id}")
    public ProductModel findById(@PathVariable Long productId, @PathVariable Long id) {
        return requireModel(productId, id);
    }

    /** POST — 새 품목 등록 */
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

    /** PUT — 기존 품목 수정 */
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

    /** DELETE — 품목 삭제 */
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

    /** 품목이 해당 상품에 속하는지 확인. 없으면 404 예외 */
    private ProductModel requireModel(Long productId, Long id) {
        return productModelRepository.findByIdAndProduct_Id(id, productId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Model not found"));
    }
}
