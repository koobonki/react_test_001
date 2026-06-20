package com.example.demo.product;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Product Entity용 Repository.
 * JpaRepository를 상속하면 findAll, save, deleteById 등 기본 CRUD가 자동 제공됩니다.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
}
