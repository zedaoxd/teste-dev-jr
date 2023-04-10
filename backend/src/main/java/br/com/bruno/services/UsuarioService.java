package br.com.bruno.services;

import br.com.bruno.dtos.UsuarioDTO;
import br.com.bruno.entities.Usuario;
import br.com.bruno.repositories.UsuarioRepository;
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
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public Page<UsuarioDTO> findAll(Pageable pageable) {
        log.info("Buscando todos os usuarios");
        return usuarioRepository.findAll(pageable).map(Usuario::toDTO);
    }

    @Transactional
    public UsuarioDTO save(UsuarioDTO dto) {
        log.info("Salvando usuario: {}", dto);
        Usuario usuario = usuarioRepository.save(dto.toEntity());
        return usuario.toDTO();
    }

    @Transactional
    public UsuarioDTO update(UsuarioDTO dto, Long id) {
        log.info("Atualizando usuario: {}", dto);
        Usuario entity = usuarioRepository.findById(id).orElseThrow();
        BeanUtils.copyProperties(dto, entity, "id");
        entity = usuarioRepository.save(entity);
        return entity.toDTO();
    }

    public void delete(Long id) {
        log.info("Deletando usuario com id: {}", id);
        usuarioRepository.deleteById(id);
    }
}
