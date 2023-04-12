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
        <Search openModal={() => {}} />
      </QueryClientProvider>
    );
    expect(screen.getByPlaceholderText(/Buscar\.\.\./i)).toBeInTheDocument();
  });

  it("should has style", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Search openModal={() => {}} />
      </QueryClientProvider>
    );
    expect(screen.getByPlaceholderText(/Buscar\.\.\./i)).toHaveStyle(
      "width: 70%;height: 2.5em;border: 1px solid gray;border-radius: 0.2rem;padding: 0.5em;font-size: 1em;}"
    );
  });

  it("should effect to click", () => {
    const fn = vi.fn();
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Search openModal={() => {}} />
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText(/Buscar\.\.\./i);
    input.onclick = fn;
    fireEvent.click(input);
    expect(fn).toHaveBeenCalled();
  });
});
