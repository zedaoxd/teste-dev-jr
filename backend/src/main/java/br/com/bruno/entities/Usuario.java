package br.com.bruno.entities;

import br.com.bruno.dtos.UsuarioDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
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
    @Column(name = "data_nascimento")
    private Date dataNascimento;

    @Column(length = 100)
    private String cidadeNascimento;

    @ManyToMany(mappedBy = "usuarios")
    private List<Empresa> empresas = new ArrayList<>();

    public UsuarioDTO toDTO() {
        var usuarioDTO = new UsuarioDTO();
        BeanUtils.copyProperties(this, usuarioDTO, "empresas");
        return usuarioDTO;
    }

    public UsuarioDTO toDTO(List<Empresa> empresas) {
        var usuarioDTO = new UsuarioDTO();
        BeanUtils.copyProperties(this, usuarioDTO);
        usuarioDTO.setEmpresas(empresas);
        return usuarioDTO;
    }
}
