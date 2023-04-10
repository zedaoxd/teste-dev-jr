import { Search } from "../Search";
import { TableUsers } from "../TableUsers";
import { Container } from "./styles";

export const From = () => {
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
