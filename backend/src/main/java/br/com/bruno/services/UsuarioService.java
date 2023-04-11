package br.com.bruno.services;

import br.com.bruno.dtos.UsuarioDTO;
import br.com.bruno.entities.Usuario;
import br.com.bruno.repositories.UsuarioRepository;
import br.com.bruno.services.exceptions.EntityNotFoundException;
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
    public Page<UsuarioDTO> findAll(Pageable pageable, String texto, String campo) {
        return switch (campo) {
            case "nome" -> usuarioRepository.findByNomeContainingIgnoreCase(texto, pageable).map(Usuario::toDTO);
            case "email" -> usuarioRepository.findByEmailContainingIgnoreCase(texto, pageable).map(Usuario::toDTO);
            case "telefone" ->
                    usuarioRepository.findByTelefoneContainingIgnoreCase(texto, pageable).map(Usuario::toDTO);
            case "cidade" -> usuarioRepository.findByCidadeNascimentoContainingIgnoreCase(texto, pageable).map(Usuario::toDTO);
            default -> usuarioRepository.findAll(pageable).map(Usuario::toDTO);
        };
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findById(Long id) {
        log.info("Buscando usuario com id: {}", id);
        Usuario entity = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado id: " + id));
        return entity.toDTO(entity.getEmpresas());
    }

    @Transactional
    public UsuarioDTO save(UsuarioDTO dto) {
        log.info("Salvando usuario: {}", dto);
        Usuario usuario = dto.toEntity();
        usuario.getEmpresas().clear();
        usuario.getEmpresas().addAll(dto.getEmpresas());
        usuario = usuarioRepository.save(usuario);
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
        var entity = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado id: " + id));
        usuarioRepository.delete(entity);
    }
}
