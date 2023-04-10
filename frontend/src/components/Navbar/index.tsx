import { NavLink } from "react-router-dom";
import { Container } from "./styles";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ApartmentIcon from "@mui/icons-material/Apartment";

export const Navbar = () => {
  return (
    <Container>
      <NavLink to="/">
        <PermIdentityIcon />
        Usuários
      </NavLink>
      <NavLink to="/empresas">
        <ApartmentIcon />
        Empresas
      </NavLink>
    </Container>
  );
};
