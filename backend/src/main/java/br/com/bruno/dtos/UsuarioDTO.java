package br.com.bruno.dtos;

import br.com.bruno.entities.Empresa;
import br.com.bruno.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class UsuarioDTO implements Serializable {
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private Date dataNascimento;
    private String cidadeNascimento;
    private List<Empresa> empresas = new ArrayList<>();

    public Usuario toEntity() {
        var usuario = new Usuario();
        BeanUtils.copyProperties(this, usuario, "empresas");
        return usuario;
    }

    public Usuario toEntity(List<Empresa> empresas) {
        var usuario = new Usuario();
        BeanUtils.copyProperties(this, usuario);
        usuario.setEmpresas(empresas);
        return usuario;
    }
}
