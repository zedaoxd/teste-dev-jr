import { Search } from "../Search";
import { TableEmpresas } from "../TableEmpresas";
import { Container } from "./styles";

export const FormEmpresas = () => {
  return (
    <Container>
      <figure>
        <img src="img/logo.png" alt="logo" />
      </figure>
      <Search />
      <TableEmpresas />
    </Container>
  );
};
