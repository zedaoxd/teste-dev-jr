import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Header, Table } from "./styles";
import { Usuario } from "../../../../@types";
import { Row } from "./Row";
import { useModalMostrarEmpresa } from "../../../../hooks/useModalMostrarEmpresa";

type Props = {
  open: boolean;
  handleClose: () => void;
  usuario: Usuario | null;
};

export const ModalMostrarEmpresas = ({ open, handleClose, usuario }: Props) => {
  const { style, usuarioFetch } = useModalMostrarEmpresa(usuario);

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
              {usuarioFetch?.empresas.map((u) => (
                <Row key={u.id} cnpj={u.cnpj} nome={u.nome} />
              ))}
            </tbody>
          </Table>
        </Container>
      </Box>
    </Modal>
  );
};
