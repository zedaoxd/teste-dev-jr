import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Row } from ".";

describe("Row", () => {
  it("should render correctly", () => {
    render(<Row nome="teste" cnpj="123456789" />);
    expect(screen.getByText(/teste/i)).toBeInTheDocument();
    expect(screen.getByText(/123456789/i)).toBeInTheDocument();
  });
});
