package br.com.bruno.dtos;

import br.com.bruno.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class EmpresaDTO implements Serializable {
    private Long id;
    private String nome;
    private String cnpj;
    private List<Usuario> usuarios;
}
