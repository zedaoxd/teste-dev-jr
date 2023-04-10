package br.com.bruno.entities;

import br.com.bruno.dtos.UsuarioDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@Entity(name = "usuarios")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario implements Serializable {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 20)
    private String telefone;

    @Temporal(TemporalType.DATE)
    private Instant dataNascimento;

    @Column(length = 100)
    private String cidadeNascimento;

    @ManyToMany(mappedBy = "usuarios")
    private List<Empresa> empresas;

    public UsuarioDTO toDTO() {
        return new UsuarioDTO(id, nome, email, telefone, dataNascimento, cidadeNascimento, empresas);
    }
}
