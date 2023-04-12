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
    expect(screen.getByText(/e-mail:/i)).toBeInTheDocument();
    expect(screen.getByText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByText(/cidade onde nasceu/i)).toBeInTheDocument();
  });

  it("should has style", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalInserir open={true} handleClose={() => {}} />{" "}
      </QueryClientProvider>
    );
    expect(screen.getByText(/Nome/i)).toHaveStyle(
      "display: block; font-size: 1rem; margin: 0.5rem 0 0.5rem 0;"
    );
    expect(screen.getByText(/e-mail:/i)).toHaveStyle(
      "display: block; font-size: 1rem; margin: 0.5rem 0 0.5rem 0;"
    );
    expect(screen.getByText(/telefone/i)).toHaveStyle(
      "display: block; font-size: 1rem; margin: 0.5rem 0 0.5rem 0;"
    );
    expect(screen.getByText(/data de nascimento/i)).toHaveStyle(
      "display: block; font-size: 1rem; margin: 0.5rem 0 0.5rem 0;"
    );
    expect(screen.getByText(/cidade onde nasceu/i)).toHaveStyle(
      "display: block; font-size: 1rem; margin: 0.5rem 0 0.5rem 0;"
    );
  });

  it("should effect to click", () => {
    const queryClient = new QueryClient();
    const fn = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <ModalInserir open={true} handleClose={() => {}} />{" "}
      </QueryClientProvider>
    );
    const button = screen.getByText(/Salvar/i);
    button.onclick = fn;
    fireEvent.click(button);
    expect(fn).toHaveBeenCalled();
  });
});
