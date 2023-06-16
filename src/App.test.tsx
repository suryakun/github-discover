import { render, screen } from "@testing-library/react"
import App from "./App"
import { vi } from "vitest"

const intersectionObserverrMock = () => ({
  observe: () => null,
})


describe("Test App", () => {
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverrMock)
  it("should render", () => {
    render(<App />)
    expect(screen.getByTestId("search")).toBeInTheDocument()
    expect(screen.getByTestId("user-list")).toBeInTheDocument()
  })
})