package br.com.bruno.controllers;

import br.com.bruno.dtos.EmpresaDTO;
import br.com.bruno.services.EmpresaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/empresas")
@RequiredArgsConstructor
@Slf4j
public class EmpresaController {

    private final EmpresaService empresaService;

    @GetMapping
    public ResponseEntity<Page<EmpresaDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(empresaService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(empresaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<EmpresaDTO> save(@RequestBody EmpresaDTO dto) {
        dto = empresaService.save(dto);
        URI uri = URI.create("/empresas/" + dto.getId());
        return ResponseEntity.created(uri).body(dto);
    }
}
