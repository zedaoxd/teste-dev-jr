import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TableEmpresas } from ".";
import { Row } from "./Row";

describe("TableEmpresas", () => {
  it("should render correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <TableEmpresas />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/CNPJ/i)).toBeInTheDocument();
  });

  it("should render a table with data", () => {
    const empresas = [
      {
        id: 1,
        nome: "Empresa 1",
        cnpj: "123456780",
      },
      {
        id: 2,
        nome: "Empresa 2",
        cnpj: "123456782",
      },
      {
        id: 3,
        nome: "Empresa 3",
        cnpj: "123456781",
      },
    ];

    const handleClickDelete = vi.fn();
    const handleClickUpdate = vi.fn();

    render(
      <table>
        <tbody>
          {empresas.map((empresa) => (
            <Row
              key={empresa.id}
              empresa={empresa}
              handleClickDelete={handleClickDelete}
              handleClickUpdate={handleClickUpdate}
            />
          ))}
        </tbody>
      </table>
    );

    empresas.forEach((empresa) => {
      expect(screen.getByText(empresa.nome)).toBeInTheDocument();
      expect(screen.getByText(empresa.cnpj)).toBeInTheDocument();
    });
  });
});
