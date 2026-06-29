package com.example.demo.config;

import com.example.demo.material.Material;
import com.example.demo.material.MaterialRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class MaterialDataInitializer {

    private final MaterialRepository materialRepository;

    public MaterialDataInitializer(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void seedMaterials() {
        if (materialRepository.count() > 0) {
            return;
        }

        materialRepository.save(new Material(
                "MAT-001", "알루미늄 판재", "원자재", "KG", "한국금속", "사용", "A-01", 120, "1.0t 규격"));
        materialRepository.save(new Material(
                "MAT-002", "ABS 수지", "원자재", "KG", "케미플라", "사용", "A-02", 850, "검정색"));
        materialRepository.save(new Material(
                "MAT-003", "M3 볼트", "부자재", "EA", "패sten", "사용", "B-01", 5000, "스테인리스"));
        materialRepository.save(new Material(
                "MAT-004", "완충재 박스", "포장재", "EA", "팩코리아", "사용", "C-01", 320, "소형"));
        materialRepository.save(new Material(
                "MAT-005", "솔더 와이어", "소모품", "M", "전자부품센터", "검토중", "D-01", 45, "0.8mm"));
        materialRepository.save(new Material(
                "MAT-006", "실리콘 패드", "부자재", "SET", "테크머티리얼", "사용", "B-02", 200, "열전도형"));
        materialRepository.save(new Material(
                "MAT-007", "라벨 스티커", "포장재", "EA", "라벨플러스", "단종", "C-02", 0, "구형 규격"));
        materialRepository.save(new Material(
                "MAT-008", "세척액", "소모품", "L", "클린솔루션", "사용", "D-02", 18, "무향"));
    }
}
