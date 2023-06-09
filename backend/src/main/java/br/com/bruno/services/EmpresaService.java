package br.com.bruno.services;

import br.com.bruno.dtos.EmpresaDTO;
import br.com.bruno.entities.Empresa;
import br.com.bruno.repositories.EmpresaRepository;
import br.com.bruno.services.exceptions.DatabaseException;
import br.com.bruno.services.exceptions.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    @Transactional(readOnly = true)
    public Page<EmpresaDTO> findAll(Pageable pageable, String texto, String campo) {

        return switch (campo) {
            case "nome" -> empresaRepository.findByNomeContainingIgnoreCase(texto, pageable).map(Empresa::toDTO);
            case "cnpj" -> empresaRepository.findByCnpjContainingIgnoreCase(texto, pageable).map(Empresa::toDTO);
            default -> empresaRepository.findAll(pageable).map(Empresa::toDTO);
        };
    }

    @Transactional(readOnly = true)
    public EmpresaDTO findById(Long id) {
        log.info("Buscando empresa com id: {}", id);
        Empresa entity = empresaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empresa não encontrada: " + id));
        return entity.toDTO();
    }

    @Transactional
    public EmpresaDTO save(EmpresaDTO dto) {
        log.info("Salvando empresa: {}", dto);
        Empresa empresa = empresaRepository.save(dto.toEntity());
        return empresa.toDTO();
    }

    @Transactional
    public EmpresaDTO update(EmpresaDTO dto, Long id) {
        log.info("Atualizando empresa: {}", dto);
        Empresa entity = empresaRepository.findById(id).orElseThrow();
        BeanUtils.copyProperties(dto, entity, "id");
        entity = empresaRepository.save(entity);
        return entity.toDTO();
    }

    public void delete(Long id) {
        log.info("Deletando empresa com id: {}", id);
        var entity = empresaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empresa não encontrada: " + id));
        try {
            empresaRepository.delete(entity);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Empresa referenciada por usuarios, delete os usuarios antes");
        }
    }
}
