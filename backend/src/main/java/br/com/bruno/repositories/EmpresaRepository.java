package br.com.bruno.repositories;

import br.com.bruno.entities.Empresa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    Page<Empresa> findByNomeContainingIgnoreCaseOrCnpjContainingIgnoreCase(String nome,
                                                                           String cnpj,
                                                                           Pageable pageable);

    Page<Empresa> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

    Page<Empresa> findByCnpjContainingIgnoreCase(String cnpj, Pageable pageable);

}
