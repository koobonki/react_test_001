package com.example.demo.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 상품(Product) DB 접근용 Repository.
 *
 * <p>{@code JpaRepository<Product, Long>}를 상속하면
 * findAll, findById, save, deleteById 같은 CRUD 메서드를
 * 직접 구현하지 않고도 바로 사용할 수 있습니다.</p>
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    /**
     * 전체 상품 조회.
     *
     * <p>Spring Data JPA가 메서드 이름을 읽고 아래 의미의 SQL을 자동 생성합니다.
     * SELECT * FROM products ORDER BY id ASC</p>
     */
    List<Product> findAllByOrderByIdAsc();

    /**
     * ProductCardGrid가 특정 Tab을 선택했을 때 사용하는 조회.
     *
     * <p>예: Frontend에서 "전자기기" Tab 클릭
     * → GET /api/products?category=전자기기
     * → WHERE category = '전자기기' ORDER BY id ASC</p>
     */
    List<Product> findByCategoryOrderByIdAsc(String category);

    /**
     * "상품재고" 토글 ON + 전체 Tab일 때 사용하는 조회.
     *
     * <p>stock 값이 0보다 큰 상품만 내려주므로,
     * Frontend가 다시 재고 필터링을 하지 않아도 됩니다.</p>
     */
    List<Product> findByStockGreaterThanOrderByIdAsc(Integer stock);

    /**
     * "상품재고" 토글 ON + 특정 category Tab일 때 사용하는 조회.
     *
     * <p>예: GET /api/products?category=가구&inStockOnly=true
     * → WHERE category = '가구' AND stock > 0 ORDER BY id ASC</p>
     */
    List<Product> findByCategoryAndStockGreaterThanOrderByIdAsc(String category, Integer stock);
}
