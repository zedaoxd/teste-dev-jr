import { useState } from "react";
import { ModalInserir } from "../ModalInserir";
import { Search } from "../Search";
import { TableUsers } from "../TableUsers";
import { Container } from "./styles";

export const Form = () => {
  const [openModalInserir, setOpenModalInserir] = useState(false);

  return (
    <Container>
      <figure>
        <img src="img/logo.png" alt="logo" />
      </figure>
      <Search openModal={() => setOpenModalInserir(true)} />
      <TableUsers />
      <ModalInserir
        open={openModalInserir}
        handleClose={() => setOpenModalInserir(false)}
      />
    </Container>
  );
};
