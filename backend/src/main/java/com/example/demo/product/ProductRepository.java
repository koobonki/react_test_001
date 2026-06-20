package com.example.demo.product;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 상품(Product) DB 접근용 Repository.
 *
 * <p>{@code JpaRepository<Product, Long>}를 상속하면
 * findAll, findById, save, deleteById 같은 CRUD 메서드를
 * 직접 구현하지 않고도 바로 사용할 수 있습니다.</p>
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
}
