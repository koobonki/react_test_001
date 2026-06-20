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

/**
 * 상품 REST API Controller.
 *
 * <p>URL prefix: {@code /api/products}</p>
 * <p>Frontend의 {@code productsApi}와 1:1로 연결됩니다.</p>
 *
 * <pre>
 * GET    /api/products       → 전체 목록
 * GET    /api/products/{id}  → 단건 조회
 * POST   /api/products       → 등록
 * PUT    /api/products/{id}  → 수정
 * DELETE /api/products/{id}  → 삭제 (연결 품목도 함께 삭제)
 * </pre>
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductModelRepository productModelRepository;

    public ProductController(
            ProductRepository productRepository,
            ProductModelRepository productModelRepository) {
        this.productRepository = productRepository;
        this.productModelRepository = productModelRepository;
    }

    /** GET /api/products — 모든 상품 조회 */
    @GetMapping
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    /** GET /api/products/{id} — ID로 상품 1건 조회. 없으면 404 */
    @GetMapping("/{id}")
    public Product findById(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    /** POST /api/products — 새 상품 등록. HTTP 201 Created 반환 */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product create(@RequestBody Product product) {
        product.setId(null); // 클라이언트가 보낸 id는 무시하고 DB가 새 ID 생성
        return productRepository.save(product);
    }

    /** PUT /api/products/{id} — 기존 상품 수정 */
    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        existing.setName(product.getName());
        existing.setCategory(product.getCategory());
        existing.setPrice(product.getPrice());
        existing.setStock(product.getStock());

        return productRepository.save(existing);
    }

    /**
     * DELETE /api/products/{id} — 상품 삭제.
     * FK 관계 때문에 먼저 해당 상품의 품목(product_models)을 삭제합니다.
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        productModelRepository.deleteByProduct_Id(id);
        productRepository.deleteById(id);
    }
}
