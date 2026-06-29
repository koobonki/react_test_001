package com.example.demo.config;

import com.example.demo.material.Material;
import com.example.demo.material.MaterialRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Component
public class MaterialDataInitializer {

    private static final Map<String, String[]> GROUP_BY_MATERIAL_CODE = Map.ofEntries(
            Map.entry("MAT-001", new String[]{"GRP-01", "원자재그룹"}),
            Map.entry("MAT-002", new String[]{"GRP-01", "원자재그룹"}),
            Map.entry("MAT-003", new String[]{"GRP-02", "부자재그룹"}),
            Map.entry("MAT-004", new String[]{"GRP-03", "포장재그룹"}),
            Map.entry("MAT-005", new String[]{"GRP-04", "소모품그룹"}),
            Map.entry("MAT-006", new String[]{"GRP-02", "부자재그룹"}),
            Map.entry("MAT-007", new String[]{"GRP-03", "포장재그룹"}),
            Map.entry("MAT-008", new String[]{"GRP-04", "소모품그룹"}),
            Map.entry("MAT-TEST", new String[]{"GRP-05", "시험자재그룹"}),
            Map.entry("MAT-009", new String[]{"GRP-05", "시험자재그룹"}),
            Map.entry("MAT-010", new String[]{"GRP-06", "전자부품그룹"}));

    private final MaterialRepository materialRepository;

    public MaterialDataInitializer(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void seedMaterials() {
        if (materialRepository.count() == 0) {
            materialRepository.save(new Material(
                    "GRP-01", "원자재그룹", "MAT-001", "알루미늄 판재", "원자재", "KG", "한국금속", "사용", "A-01", 120, "1.0t 규격"));
            materialRepository.save(new Material(
                    "GRP-01", "원자재그룹", "MAT-002", "ABS 수지", "원자재", "KG", "케미플라", "사용", "A-02", 850, "검정색"));
            materialRepository.save(new Material(
                    "GRP-02", "부자재그룹", "MAT-003", "M3 볼트", "부자재", "EA", "패sten", "사용", "B-01", 5000, "스테인리스"));
            materialRepository.save(new Material(
                    "GRP-03", "포장재그룹", "MAT-004", "완충재 박스", "포장재", "EA", "팩코리아", "사용", "C-01", 320, "소형"));
            materialRepository.save(new Material(
                    "GRP-04", "소모품그룹", "MAT-005", "솔더 와이어", "소모품", "M", "전자부품센터", "검토중", "D-01", 45, "0.8mm"));
            materialRepository.save(new Material(
                    "GRP-02", "부자재그룹", "MAT-006", "실리콘 패드", "부자재", "SET", "테크머티리얼", "사용", "B-02", 200, "열전도형"));
            materialRepository.save(new Material(
                    "GRP-03", "포장재그룹", "MAT-007", "라벨 스티커", "포장재", "EA", "라벨플러스", "단종", "C-02", 0, "구형 규격"));
            materialRepository.save(new Material(
                    "GRP-04", "소모품그룹", "MAT-008", "세척액", "소모품", "L", "클린솔루션", "사용", "D-02", 18, "무향"));
            materialRepository.save(new Material(
                    "GRP-05", "시험자재그룹", "MAT-009", "테스트 강판", "원자재", "KG", "시험공급", "사용", "T-01", 50, "시험용"));
            materialRepository.save(new Material(
                    "GRP-06", "전자부품그룹", "MAT-010", "커넥터 핀", "부자재", "EA", "전자파트", "사용", "E-01", 300, "2.54mm"));
        }

        syncGroupData();
    }

    /** 기존 DB 레코드에 자재그룹코드·자재그룹명을 매핑하여 반영 */
    private void syncGroupData() {
        for (Material material : materialRepository.findAll()) {
            String[] group = GROUP_BY_MATERIAL_CODE.get(material.getMaterialCode());
            if (group != null) {
                material.setGroupCode(group[0]);
                material.setGroupName(group[1]);
                materialRepository.save(material);
                continue;
            }

            if (material.getGroupCode() != null && !material.getGroupCode().isBlank()) {
                continue;
            }

            switch (material.getCategory()) {
                case "원자재" -> {
                    material.setGroupCode("GRP-01");
                    material.setGroupName("원자재그룹");
                }
                case "부자재" -> {
                    material.setGroupCode("GRP-02");
                    material.setGroupName("부자재그룹");
                }
                case "포장재" -> {
                    material.setGroupCode("GRP-03");
                    material.setGroupName("포장재그룹");
                }
                case "소모품" -> {
                    material.setGroupCode("GRP-04");
                    material.setGroupName("소모품그룹");
                }
                default -> {
                    material.setGroupCode("GRP-99");
                    material.setGroupName("기타그룹");
                }
            }

            materialRepository.save(material);
        }

        ensureExtraSamples();
    }

    /** 추가 샘플 자재(그룹 데이터 포함) — 없을 때만 삽입 */
    private void ensureExtraSamples() {
        if (materialRepository.findAll().stream().noneMatch(m -> "MAT-009".equals(m.getMaterialCode()))) {
            materialRepository.save(new Material(
                    "GRP-05", "시험자재그룹", "MAT-009", "테스트 강판", "원자재", "KG", "시험공급", "사용", "T-01", 50, "시험용"));
        }
        if (materialRepository.findAll().stream().noneMatch(m -> "MAT-010".equals(m.getMaterialCode()))) {
            materialRepository.save(new Material(
                    "GRP-06", "전자부품그룹", "MAT-010", "커넥터 핀", "부자재", "EA", "전자파트", "사용", "E-01", 300, "2.54mm"));
        }
    }
}
