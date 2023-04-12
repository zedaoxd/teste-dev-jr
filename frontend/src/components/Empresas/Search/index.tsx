import AddIcon from "@mui/icons-material/Add";
import { Container, Button, Input, Select } from "./styles";
import { ModalInserir } from "../ModalInserir";
import { useSearchEmpresa } from "../../../hooks/useSearchEmpresa";

export const Search = () => {
  const {
    handleCloseModalInserir,
    onSubmit,
    openModalInserir,
    register,
    handleOpenModalInserir,
  } = useSearchEmpresa();

  return (
    <Container>
      <Button onClick={handleOpenModalInserir}>
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
