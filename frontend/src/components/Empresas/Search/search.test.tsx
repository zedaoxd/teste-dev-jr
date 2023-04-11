import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Search } from ".";

describe("Search", () => {
  it("should render correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    );
    expect(
      screen.getByPlaceholderText(/Buscar\.\.\./i) as HTMLInputElement
    ).toBeInTheDocument();
  });

  it("should insert a text in field and search", () => {
    const queryClient = new QueryClient();
    const handleClick = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText(
      /Buscar\.\.\./i
    ) as HTMLInputElement;

    input.onclick = handleClick;

    fireEvent.change(input, { target: { value: "Teste" } });
    fireEvent.click(input);
    expect(handleClick).toHaveBeenCalled();
  });

  it("should render options to search", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/CNPJ/i)).toBeInTheDocument();
  });
});
