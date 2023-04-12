import { useEffect, useState } from "react";
import { getUsuarioById } from "../services/usuarioService";
import { Usuario } from "../@types";

export const useModalMostrarEmpresa = (usuario: Usuario | null) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };
  const [usuarioState, setUsuarioState] = useState<Usuario | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (usuario) {
        getUsuarioById(usuario.id).then((response) => {
          setUsuarioState(response);
        });
      }
    };
    getUser();
  }, [usuario]);

  return {
    style,
    usuarioFetch: usuarioState,
  };
};
