package br.com.bruno.services;

import br.com.bruno.dtos.EmpresaDTO;
import br.com.bruno.entities.Empresa;
import br.com.bruno.repositories.EmpresaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    @Transactional(readOnly = true)
    public Page<EmpresaDTO> findAll(Pageable pageable) {
        log.info("Buscando todas as empresas");
        return empresaRepository.findAll(pageable).map(Empresa::toDTO);
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
        empresaRepository.deleteById(id);
    }
}
