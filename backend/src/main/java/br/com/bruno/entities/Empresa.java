package br.com.bruno.entities;

import br.com.bruno.dtos.EmpresaDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.List;

@Entity(name = "empresas")
@AllArgsConstructor
@NoArgsConstructor
@Data
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

    public EmpresaDTO toDTO() {
        var empresaDTO = new EmpresaDTO();
        BeanUtils.copyProperties(this, empresaDTO, "usuarios");
        return empresaDTO;
    }
}
