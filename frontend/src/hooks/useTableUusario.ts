import { useState } from "react";
import { Usuario } from "../@types";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUsuario, getAllUsuarios } from "../services/usuarioService";

export const useTabelaUsuario = () => {
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [openModalMostrarEmpresas, setOpenModalMostrarEmpresas] =
    useState(false);

  const handleClickShowEmpresas = (usuario: Usuario) => {
    setUsuario(usuario);
    setOpenModalMostrarEmpresas(true);
  };

  const handleClickDelete = (id: number) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir esse usuário?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUsuarioMutation(id);
      }
    });
  };

  const handleClickUpdate = (usuario: Usuario) => {
    setUsuario(usuario);
    setOpenModalEditar(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteUsuarioMutation } = useMutation(deleteUsuario, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Usuário excluído com sucesso!", "", "success");
    },
  });

  const { data, isLoading } = useQuery(["users"], () => getAllUsuarios("", ""));

  return {
    data,
    isLoading,
    openModalEditar,
    setOpenModalEditar,
    usuario,
    openModalMostrarEmpresas,
    setOpenModalMostrarEmpresas,
    handleClickShowEmpresas,
    handleClickDelete,
    handleClickUpdate,
  };
};
