package com.example.demo.material;

import org.springframework.http.HttpStatus;
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

@RestController
@RequestMapping("/api/materials")
public class MaterialController {

    private final MaterialRepository materialRepository;

    public MaterialController(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @GetMapping
    public List<Material> findAll() {
        return materialRepository.findAll();
    }

    @GetMapping("/{id}")
    public Material findById(@PathVariable Long id) {
        return materialRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Material not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Material create(@RequestBody Material material) {
        material.setId(null);
        return materialRepository.save(material);
    }

    @PutMapping("/{id}")
    public Material update(@PathVariable Long id, @RequestBody Material material) {
        Material existing = materialRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Material not found"));

        existing.setGroupCode(material.getGroupCode());
        existing.setGroupName(material.getGroupName());
        existing.setMaterialCode(material.getMaterialCode());
        existing.setMaterialName(material.getMaterialName());
        existing.setCategory(material.getCategory());
        existing.setUnit(material.getUnit());
        existing.setSupplier(material.getSupplier());
        existing.setStatus(material.getStatus());
        existing.setLocation(material.getLocation());
        existing.setStock(material.getStock());
        existing.setRemark(material.getRemark());

        return materialRepository.save(existing);
    }
}
