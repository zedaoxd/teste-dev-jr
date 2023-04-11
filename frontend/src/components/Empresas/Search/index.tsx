import AddIcon from "@mui/icons-material/Add";
import { Container, Button, Input, Select } from "./styles";
import { useState } from "react";
import { ModalInserir } from "../ModalInserir";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { getAllEmpresas } from "../../../services/empresaService";

const schema = z.object({
  texto: z.string().nonempty(),
  campo: z.string().nonempty(),
});

type FormSearch = z.infer<typeof schema>;

export const Search = () => {
  const [openModalInserir, setOpenModalInserir] = useState(false);
  const handleCloseModalInserir = () => setOpenModalInserir(false);
  const { register, handleSubmit, watch } = useForm<FormSearch>();

  const { refetch } = useQuery(["empresas"], {
    queryFn: () => getAllEmpresas(watch("texto"), watch("campo")),
    enabled: false,
  });

  const onSubmit = handleSubmit((formSeacrh) => {
    console.log(formSeacrh);
    refetch();
  });

  return (
    <Container>
      <Button onClick={() => setOpenModalInserir(true)}>
        <AddIcon />
      </Button>
      <form onSubmit={onSubmit}>
        <Input {...register("texto")} type="text" placeholder="Buscar..." />
        <Select {...register("campo")}>
          <option value="nome">Nome</option>
          <option value="cnpj">CNPJ</option>
        </Select>
      </form>
      <ModalInserir
        open={openModalInserir}
        handleClose={handleCloseModalInserir}
      />
    </Container>
  );
};
