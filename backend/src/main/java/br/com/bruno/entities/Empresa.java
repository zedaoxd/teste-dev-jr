package br.com.bruno.entities;

import br.com.bruno.dtos.EmpresaDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity(name = "empresas")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Empresa implements Serializable {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 15)
    private String cnpj;

    @ManyToMany
    @JoinTable(name = "empresas_usuarios",
            joinColumns = @JoinColumn(name = "empresa_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    private List<Usuario> usuarios;

    public EmpresaDTO toDTO() {
        return new EmpresaDTO(id, nome, cnpj, usuarios);
    }
}
