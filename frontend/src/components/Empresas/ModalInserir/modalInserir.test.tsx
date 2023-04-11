import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ModalInserir } from ".";

describe("ModalInserir", () => {
  it("should render correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalInserir open={true} handleClose={() => {}} />{" "}
      </QueryClientProvider>
    );
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/CNPJ/i)).toBeInTheDocument();
  });

  it("should click on the button", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalInserir open={true} handleClose={() => {}} />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Limpar/i)).toBeInTheDocument();
    expect(screen.getByText(/Salvar/i)).toBeInTheDocument();
  });

  it("should insert a text in field and clear", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalInserir open={true} handleClose={() => {}} />
      </QueryClientProvider>
    );
    const input = screen.getByLabelText(/Nome/i) as HTMLInputElement;
    const button = screen.getByText(/Limpar/i);
    fireEvent.change(input, { target: { value: "Teste" } });
    expect(input.value).toBe("Teste");
    fireEvent.click(button);
    expect(input.value).toBe("");
  });

  it("should insert a text in field and save", () => {
    const handleClick = vi.fn();
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalInserir open={true} handleClose={() => {}} />
      </QueryClientProvider>
    );
    const input = screen.getByLabelText(/Nome/i) as HTMLInputElement;
    const input2 = screen.getByLabelText(/CNPJ/i) as HTMLInputElement;
    const button = screen.getByText(/Salvar/i);
    button.onclick = handleClick;

    fireEvent.change(input, { target: { value: "Teste" } });
    fireEvent.change(input2, { target: { value: "Teste2" } });

    expect(input.value).toBe("Teste");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
