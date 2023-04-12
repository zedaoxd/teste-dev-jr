import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Header, Table } from "./styles";
import { Usuario } from "../../../../@types";
import { useEffect, useState } from "react";
import { getUsuarioById } from "../../../../services/usuarioService";
import { useQuery } from "@tanstack/react-query";
import { Row } from "./Row";

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

type Props = {
  open: boolean;
  handleClose: () => void;
  usuario: Usuario | null;
};

export const ModalMostrarEmpresas = ({ open, handleClose, usuario }: Props) => {
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container>
          <Header>
            <h1>Empresas</h1>

            <button onClick={handleClose} data-testid="close-modal">
              <CloseIcon />
            </button>
          </Header>

          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
              </tr>
            </thead>
            <tbody>
              {usuarioState?.empresas.map((u) => (
                <Row key={u.id} cnpj={u.cnpj} nome={u.nome} />
              ))}
            </tbody>
          </Table>
        </Container>
      </Box>
    </Modal>
  );
};
