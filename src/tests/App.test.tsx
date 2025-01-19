import { describe, expect, test } from "vitest";
import App from "../App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

describe("App tests", () => {
  test("component renders", () => {
    render(<App />);
    expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
  });
});
