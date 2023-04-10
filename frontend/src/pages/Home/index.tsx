import { Navbar } from "../../components/Navbar";
import { Form } from "../../components/Users";
import { Container } from "./styles";

export const Home = () => {
  return (
    <Container>
      <div>
        <Navbar />
        <Form />
      </div>
    </Container>
  );
};
