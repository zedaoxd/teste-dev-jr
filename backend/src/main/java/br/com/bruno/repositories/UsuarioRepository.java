package br.com.bruno.repositories;

import br.com.bruno.entities.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Page<Usuario> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
    Page<Usuario> findByEmailContainingIgnoreCase(String email, Pageable pageable);
    Page<Usuario> findByTelefoneContainingIgnoreCase(String telefone, Pageable pageable);
    Page<Usuario> findByCidadeNascimentoContainingIgnoreCase(String cidade, Pageable pageable);
}
