import { Navbar } from "../../Navbar";
import { Search } from "../Search";
import { TableUsers } from "../TableUsers";
import { Container } from "./styles";

export const Form = () => {
  return (
    <Container>
      <figure>
        <img src="img/logo.png" alt="logo" />
      </figure>
      <Search />
      <TableUsers />
    </Container>
  );
};
