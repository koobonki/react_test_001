package com.example.demo.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.product.Product;
import com.example.demo.product.ProductModel;
import com.example.demo.product.ProductModelRepository;
import com.example.demo.product.ProductRepository;

/**
 * 앱 시작 후 품목 데이터를 자동으로 보충하는 초기화 컴포넌트.
 *
 * <p>DB에 상품은 있는데 품목이 5개 미만인 경우,
 * 부족한 만큼 기본 품목을 생성합니다.</p>
 *
 * <p>시드 SQL({@code data-models.sql})과 함께 동작하며,
 * 기존 DB 파일을 그대로 쓸 때도 품목 수를 맞춰 줍니다.</p>
 */
@Component
public class ProductModelDataInitializer {

    /** 상품 1개당 목표 품목 개수 */
    private static final int MODELS_PER_PRODUCT = 5;

    private final ProductRepository productRepository;
    private final ProductModelRepository productModelRepository;

    public ProductModelDataInitializer(
            ProductRepository productRepository,
            ProductModelRepository productModelRepository) {
        this.productRepository = productRepository;
        this.productModelRepository = productModelRepository;
    }

    /**
     * Spring Boot가 완전히 기동된 뒤(ApplicationReadyEvent) 1회 실행됩니다.
     */
    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void ensureModelsPerProduct() {
        for (Product product : productRepository.findAll()) {
            long existing = productModelRepository.countByProduct_Id(product.getId());
            // 이미 5개면 건너뜀, 부족하면 seq 번호대로 추가
            for (int seq = (int) existing + 1; seq <= MODELS_PER_PRODUCT; seq++) {
                String code = String.format("P%d-%02d", product.getId(), seq);
                int basePrice = product.getPrice() != null ? product.getPrice() : 10000;
                productModelRepository.save(new ProductModel(
                        product,
                        product.getName() + " 품목 " + seq,
                        code,
                        basePrice + (seq * 1000),
                        5 + seq));
            }
        }
    }
}
