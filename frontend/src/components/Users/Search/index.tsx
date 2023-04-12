import AddIcon from "@mui/icons-material/Add";
import { Container, Button, Input, Select } from "./styles";
import { useSearchUsuario } from "../../../hooks/useSearchUsuario";

type Props = {
  openModal: () => void;
};

export const Search = ({ openModal }: Props) => {
  const { onSubmit, register } = useSearchUsuario();

  return (
    <Container>
      <Button onClick={openModal}>
        <AddIcon />
      </Button>
      <form onSubmit={onSubmit}>
        <Input {...register("texto")} type="text" placeholder="Buscar..." />
        <Select {...register("campo")}>
          <option value="nome">Nome</option>
          <option value="email">E-mail</option>
          <option value="telefone">Telefone</option>
          <option value="cidade">Cidade</option>
        </Select>
      </form>
    </Container>
  );
};
