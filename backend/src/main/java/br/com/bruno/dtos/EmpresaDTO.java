package br.com.bruno.dtos;

import br.com.bruno.entities.Empresa;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class EmpresaDTO implements Serializable {
    private Long id;
    private String nome;
    private String cnpj;

    public Empresa toEntity() {
        var empresa = new Empresa();
        BeanUtils.copyProperties(this, empresa, "usuarios");
        return empresa;
    }

}
