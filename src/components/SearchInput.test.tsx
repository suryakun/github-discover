import { render } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { vi } from "vitest";

const setQuery = vi.fn();
describe("Test SearchInput", () => {
  it("should render", () => {
    const { baseElement } = render(<SearchInput query="mock" setQuery={setQuery} />);
    expect(baseElement).toBeTruthy();
  });

  it("should call setQuery", () => {
    const { getByTestId } = render(<SearchInput query="mock" setQuery={setQuery} />);
    getByTestId("search-input").focus();
    getByTestId("search-input").blur();
    expect(setQuery).toBeCalledTimes(0);
  })
})