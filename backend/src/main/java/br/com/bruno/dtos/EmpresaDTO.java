package br.com.bruno.dtos;

import br.com.bruno.entities.Empresa;
import br.com.bruno.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class EmpresaDTO implements Serializable {
    private Long id;
    private String nome;
    private String cnpj;
    private List<Usuario> usuarios = new ArrayList<>();

    public Empresa toEntity() {
        return new Empresa(id, nome, cnpj, usuarios);
    }
}
