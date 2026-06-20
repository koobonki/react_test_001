package com.example.demo.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * ProductModel Entity용 Repository.
 * 메서드 이름만 작성하면 Spring Data JPA가 SQL을 자동 생성합니다.
 */
public interface ProductModelRepository extends JpaRepository<ProductModel, Long> {

    /** 특정 상품(productId)에 속한 모델 목록을 id 오름차순으로 조회 */
    List<ProductModel> findByProduct_IdOrderByIdAsc(Long productId);

    /** 상품 삭제 전, 해당 상품에 연결된 모델을 먼저 삭제할 때 사용 */
    void deleteByProduct_Id(Long productId);
}
