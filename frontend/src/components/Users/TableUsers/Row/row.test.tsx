import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Row } from ".";
import { Usuario } from "../../../../@types";

describe("Row", () => {
  it("should render correctly", () => {
    const mokcUser: Usuario = {
      nome: "nome",
      cidadeNascimento: "alguma",
      dataNascimento: new Date().getTime(),
      email: "nome@nome.com",
      id: 1,
      telefone: "123456709",
      empresas: [],
    };
    render(
      <Row
        handleClickDelete={() => {}}
        handleClickShowEmpresas={() => {}}
        handleClickUpdate={() => {}}
        usuario={mokcUser}
      />
    );

    const nome = screen.getByTestId("c-nome");
    const email = screen.getByTestId("c-email");
    const telefone = screen.getByTestId("c-telefone");

    expect(nome).toHaveTextContent("nome");
    expect(email).toHaveTextContent("nome@nome.com");
    expect(telefone).toHaveTextContent("123456709");
  });
});
