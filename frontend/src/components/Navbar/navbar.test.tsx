import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./";

describe("Navbar", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("Usuários")).toBeInTheDocument();
    expect(screen.getByText("Empresas")).toBeInTheDocument();
  });
});
