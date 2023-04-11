import { FormEmpresas } from "../../components/Empresas/FormEmpresas";
import { Navbar } from "../../components/Navbar";
import { Container } from "./styles";

export const Empresas = () => {
  return (
    <Container>
      <div>
        <Navbar />
        <FormEmpresas />
      </div>
    </Container>
  );
};
