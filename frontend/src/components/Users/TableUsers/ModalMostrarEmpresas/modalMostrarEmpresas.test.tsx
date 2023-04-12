import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalMostrarEmpresas } from ".";
import { Usuario } from "../../../../@types";

describe("ModalMostrarEmpresas", () => {
  it("should render correctly", () => {
    const queryClient = new QueryClient();
    const mockUsuario = {} as Usuario;
    render(
      <QueryClientProvider client={queryClient}>
        <ModalMostrarEmpresas
          open={true}
          handleClose={() => {}}
          usuario={mockUsuario}
        />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Empresas/i)).toBeInTheDocument();
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/CNPJ/i)).toBeInTheDocument();
  });

  it("should effect to close modal", () => {
    const queryClient = new QueryClient();
    const mockUsuario = {} as Usuario;
    const handleClose = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalMostrarEmpresas
          open={true}
          handleClose={() => {}}
          usuario={mockUsuario}
        />
      </QueryClientProvider>
    );

    const button = screen.getByTestId("close-modal");
    button.onclick = handleClose;

    fireEvent.click(button);
    expect(handleClose).toHaveBeenCalled(1);
  });
});
