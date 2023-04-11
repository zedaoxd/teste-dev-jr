import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalEditar } from ".";

describe("ModalEditar", () => {
  it("should render correctly", () => {
    const empresa = {
      id: 1,
      nome: "Empresa 1",
      cnpj: "123456789",
    };
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalEditar open handleClose={() => {}} empresa={empresa} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/CNPJ/i)).toBeInTheDocument();
    expect(screen.getByText(/Limpar/i)).toBeInTheDocument();
    expect(screen.getByText(/Atualizar/i)).toBeInTheDocument();
  });
});
