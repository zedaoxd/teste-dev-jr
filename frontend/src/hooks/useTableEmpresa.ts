import { useState } from "react";
import { Empresa } from "../@types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEmpresa, getAllEmpresas } from "../services/empresaService";
import Swal from "sweetalert2";

export const useTableEmpresa = () => {
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const closeModalEditar = () => setModalEditarOpen(false);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const { data, isLoading } = useQuery(["empresas"], () =>
    getAllEmpresas("", "")
  );

  const handleclickUpdate = (empresa: Empresa) => {
    setEmpresa(empresa);
    setModalEditarOpen(true);
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

  return {
    data,
    isLoading,
    modalEditarOpen,
    closeModalEditar,
    empresa,
    handleclickUpdate,
    handleClickDelete,
  };
};
