import { render, screen } from "@testing-library/react";
import UserList from "./UserList";
import { GithubContext } from "../context/GithubContext";
import { vi } from "vitest"

const intersectionObserverrMock = () => ({
  observe: () => null,
  unobserve: () => null,
})

vi.mock("../hooks/useGithubAPI", () => {
  return {
    default: () => {
      return {
        isLoading: false,
        loadMoreUsers: vi.fn(),
        loadMoreLoading: true
      }
    }
  }

})

describe("Test UserList", () => {
  window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverrMock)
  it("should render", () => {
    render(<GithubContext.Provider value={{
      users: [],
      dispatch: vi.fn()
    }}>
      <UserList query="test" />
    </GithubContext.Provider>);
    expect(screen.getByTestId("user-list")).toBeInTheDocument();
  });

  it("should render loading", () => {
    render(<GithubContext.Provider value={{
      users: [],
      dispatch: vi.fn(),
    }}>
      <UserList query="test" />
    </GithubContext.Provider>);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  })
})