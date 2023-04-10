package br.com.bruno.dtos;

import br.com.bruno.entities.Empresa;
import br.com.bruno.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
        return new Usuario(id, nome, email, telefone, dataNascimento, cidadeNascimento, empresas);
    }
}
