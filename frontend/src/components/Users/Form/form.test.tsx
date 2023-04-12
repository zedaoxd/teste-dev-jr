import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Form } from ".";

describe("Form", () => {
  it("should render correctly", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Form />
      </QueryClientProvider>
    );

    expect(screen.getByDisplayValue(/nome/i)).toBeInTheDocument();
  });

  it("should has style", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Form />
      </QueryClientProvider>
    );

    expect(screen.getByDisplayValue(/nome/i)).toHaveStyle(
      "background-color: #fff"
    );
  });
});
