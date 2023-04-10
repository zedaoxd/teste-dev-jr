import { Search } from "../Search";
import { TableUsers } from "../TableUsers";
import { Container } from "./styles";

export const Form = () => {
  return (
    <Container>
      <figure>
        <img src="img/logo.png" alt="random" />
      </figure>
      <Search />
      <TableUsers />
    </Container>
  );
};
