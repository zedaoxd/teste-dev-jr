import AddIcon from "@mui/icons-material/Add";
import { Container, Button, Input, Select } from "./styles";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { getAllUsuarios } from "../../../services/usuarioService";
import { useQuery } from "@tanstack/react-query";

type Props = {
  openModal: () => void;
};

const schema = z.object({
  texto: z.string().nonempty(),
  campo: z.string().nonempty(),
});

type FormSearch = z.infer<typeof schema>;

export const Search = ({ openModal }: Props) => {
  const { register, handleSubmit, watch } = useForm<FormSearch>();

  const { refetch } = useQuery(["users"], {
    queryFn: () => getAllUsuarios(watch("texto"), watch("campo")),
  });

  const onSubmit = handleSubmit((formSeacrh) => {
    refetch();
  });

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
          <option value="dateNascimento">Data</option>
        </Select>
      </form>
    </Container>
  );
};
