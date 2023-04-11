import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteEmpresa,
  getAllEmpresas,
} from "../../../services/empresaService";
import { Container, Table } from "./styles";
import { CircularProgress } from "@mui/material";
import { Row } from "./Row";
import Swal from "sweetalert2";
import { ModalEditar } from "./ModalEditar";
import { useState } from "react";
import { Empresa } from "../../../@types";

export const TableEmpresas = () => {
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const { data, isLoading } = useQuery(["empresas"], () =>
    getAllEmpresas("", "")
  );

  const handleclickUpdate = (empresa: Empresa) => {
    setEmpresa(empresa);
    setModalEditarOpen(true);
  };

  const handleClickDelete = (id: number) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir essa empresa?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(id);
      }
    });
  };

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(deleteEmpresa, {
    onSuccess: () => {
      queryClient.invalidateQueries(["empresas"]);
      Swal.fire("Empresa excluída com sucesso!", "", "success");
    },
    onError: (e: any) => {
      if (e.response.status === 400) {
        Swal.fire(
          "Erro 400",
          "Para deletar essa empresa primeiro delete os funcionarios que fazem parte dela",
          "error"
        );
      }
    },
  });

  return (
    <Container>
      {isLoading && <CircularProgress />}
      {data && data.content.length === 0 ? (
        <h3>Nenhuma empresa cadastrada</h3>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CNPJ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.content.map((empresa) => (
                <Row
                  key={empresa.id}
                  empresa={empresa}
                  handleClickDelete={handleClickDelete}
                  handleClickUpdate={handleclickUpdate}
                />
              ))}
          </tbody>
        </Table>
      )}
      <ModalEditar
        open={modalEditarOpen}
        handleClose={() => setModalEditarOpen(false)}
        empresa={empresa}
      />
    </Container>
  );
};
