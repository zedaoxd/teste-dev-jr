import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormEmpresas } from "./";

describe("FormEmpresas", () => {
  it("should render correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <FormEmpresas />
      </QueryClientProvider>
    );
    expect(screen.getByDisplayValue(/nome/i)).toBeInTheDocument();
  });
});
