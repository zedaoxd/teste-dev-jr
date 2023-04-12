import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalEditar } from ".";

describe("ModalEditar", () => {
  it("should render correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalEditar
          open={true}
          handleClose={() => {}}
          usuario={{
            id: 1,
            nome: "teste",
            email: "teste@teste.com",
            telefone: "123456789",
            dataNascimento: new Date().getTime(),
            cidadeNascimento: "Rio de Janeiro",
            empresas: [],
          }}
        />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Telefone/i)).toBeInTheDocument();
    expect(screen.getByText(/Data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByText(/Cidade onde nasceu/i)).toBeInTheDocument();
  });

  it("should effect to close modal", () => {
    const queryClient = new QueryClient();
    const handleClose = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalEditar
          open={true}
          handleClose={handleClose}
          usuario={{
            id: 1,
            nome: "teste",
            email: "teste@teste.com",
            telefone: "123456789",
            dataNascimento: new Date().getTime(),
            cidadeNascimento: "Rio de Janeiro",
            empresas: [],
          }}
        />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByTestId("close-modal"));
    expect(handleClose).toHaveBeenCalled(1);
  });

  it("should effect to submit form", () => {
    const queryClient = new QueryClient();
    const handleSubmit = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalEditar
          open={true}
          handleClose={() => {}}
          usuario={{
            id: 1,
            nome: "teste",
            email: "teste@teste.com",
            telefone: "123456789",
            dataNascimento: new Date().getTime(),
            cidadeNascimento: "Rio de Janeiro",
            empresas: [],
          }}
        />
      </QueryClientProvider>
    );

    const buttonSubmit = screen.getByTestId("submit-form");
    buttonSubmit.onclick = handleSubmit;
    fireEvent.click(buttonSubmit);
    expect(handleSubmit).toHaveBeenCalled(1);
  });

  it("should effect to change input", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalEditar
          open={true}
          handleClose={() => {}}
          usuario={{
            id: 1,
            nome: "teste",
            email: "teste@teste.com",
            telefone: "123456789",
            dataNascimento: new Date().getTime(),
            cidadeNascimento: "Rio de Janeiro",
            empresas: [],
          }}
        />
      </QueryClientProvider>
    );

    const inputNome = screen.getByTestId("input-nome") as HTMLInputElement;
    const inputEmail = screen.getByTestId("input-email") as HTMLInputElement;
    fireEvent.change(inputNome, { target: { value: "teste" } });
    fireEvent.change(inputEmail, { target: { value: "teste@teste.com" } });
    expect(inputNome.value).toBe("teste");
    expect(inputEmail.value).toBe("teste@teste.com");
  });
});
