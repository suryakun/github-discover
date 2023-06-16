import { ReactNode, createContext, useContext, useReducer } from "react";

export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  followers_url?: string;
  following_url?: string;
  organizations_url?: string;
  repos_url?: string;
}

export type GithubRepo = {
  name: string;
  description: string;
  watchers_count: number;
}

export type GithubContent = {
  users: GithubUser[];
  dispatch: React.Dispatch<Action>
}

const defaultValue: GithubContent = {
  users: [],
  dispatch: () => { }
}

export const GithubContext = createContext<GithubContent>(defaultValue)

export enum GithubActionType {
  FETCH_USERS = "FETCH_USERS",
  LOAD_MORE_USERS = "LOAD_MORE_USERS"
}

interface Action {
  type: GithubActionType;
  payload: any;
}

function reducer(state: GithubContent, action: Action): GithubContent {
  switch (action.type) {
    case GithubActionType.FETCH_USERS:
      return {
        ...state,
        users: action.payload
      }
    case GithubActionType.LOAD_MORE_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload]
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const GithubContextProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(reducer, defaultValue)

  return (
    <GithubContext.Provider value={{ users: state.users, dispatch }}>
      {children}
    </GithubContext.Provider>);
}

export const useGithubContext = () => useContext(GithubContext);