package br.com.bruno.dtos;

import br.com.bruno.entities.Empresa;
import br.com.bruno.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO implements Serializable {
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private Instant dataNascimento;
    private String cidadeNascimento;
    private List<Empresa> empresas;

    public Usuario toEntity() {
        return new Usuario(id, nome, email, telefone, dataNascimento, cidadeNascimento, empresas);
    }
}
