import AddIcon from "@mui/icons-material/Add";
import { Container, Button, Input, Select } from "./styles";
import { useState } from "react";
import { ModalInserir } from "../ModalInserir";

export const Search = () => {
  const [openModalInserir, setOpenModalInserir] = useState(false);
  const handleCloseModalInserir = () => setOpenModalInserir(false);

  return (
    <Container>
      <Button onClick={() => setOpenModalInserir(true)}>
        <AddIcon />
      </Button>
      <div>
        <Input type="text" placeholder="Buscar..." />
        <Select>
          <option value="nome">Nome</option>
          <option value="email">E-mail</option>
          <option value="telefone">Telefone</option>
          <option value="cidadeNascimento">Cidade</option>
          <option value="dateNascimento">Data</option>
        </Select>
      </div>
      <ModalInserir
        open={openModalInserir}
        handleClose={handleCloseModalInserir}
      />
    </Container>
  );
};
