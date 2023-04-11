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
import java.util.List;

@RestController
@RequestMapping("/empresas")
@RequiredArgsConstructor
@Slf4j
public class EmpresaController {

    private final EmpresaService empresaService;

    @GetMapping
    public ResponseEntity<Page<EmpresaDTO>> findAll(Pageable pageable,
                                                    @RequestParam(defaultValue = "") String campo,
                                                    @RequestParam(defaultValue = "") String texto) {
        return ResponseEntity.ok(empresaService.findAll(pageable, texto, campo));
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

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaDTO> update(@PathVariable Long id, @RequestBody EmpresaDTO dto) {
        dto = empresaService.update(dto, id);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        empresaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
