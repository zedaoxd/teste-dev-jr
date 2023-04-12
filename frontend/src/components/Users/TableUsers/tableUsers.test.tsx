import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TableUsers } from ".";

describe("TableUsers", () => {
  it("should render correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <TableUsers />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Telefone/i)).toBeInTheDocument();
    expect(screen.getByText(/Nascimento/i)).toBeInTheDocument();
    expect(screen.getByText(/Cidade/i)).toBeInTheDocument();
  });
});
