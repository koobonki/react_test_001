package com.example.demo.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * 품목(ProductModel) DB 접근용 Repository.
 *
 * <p>메서드 이름 규칙(Spring Data JPA Query Method)으로
 * 자주 쓰는 조회/삭제 쿼리를 선언만 해도 구현체가 자동 생성됩니다.</p>
 */
public interface ProductModelRepository extends JpaRepository<ProductModel, Long> {

    /** 특정 상품에 속한 품목 목록 (ID 오름차순) */
    List<ProductModel> findByProduct_IdOrderByIdAsc(Long productId);

    /** 특정 상품의 품목 개수 — 초기 데이터 보충용 */
    long countByProduct_Id(Long productId);

    /**
     * 상품 ID + 품목 ID로 단건 조회.
     * JOIN FETCH로 product를 함께 로딩해 Lazy 로딩 오류를 방지합니다.
     */
    @Query("""
            SELECT m FROM ProductModel m
            JOIN FETCH m.product p
            WHERE m.id = :id AND p.id = :productId
            """)
    Optional<ProductModel> findByIdAndProduct_Id(@Param("id") Long id, @Param("productId") Long productId);

    /** 상품 삭제 시 연결된 품목을 먼저 삭제할 때 사용 */
    void deleteByProduct_Id(Long productId);
}
