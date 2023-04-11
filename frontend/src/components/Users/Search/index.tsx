import AddIcon from "@mui/icons-material/Add";
import { Container, Button, Input, Select } from "./styles";

type Props = {
  openModal: () => void;
};

export const Search = ({ openModal }: Props) => {
  return (
    <Container>
      <Button onClick={openModal}>
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
    </Container>
  );
};
