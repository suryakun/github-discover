import { Suspense, useState, useDeferredValue } from "react"
import SearchInput from "./components/SearchInput"
import { GithubContextProvider } from "./context/GithubContext"
import UserList from "./components/UserList"
import Loader from "./components/Loader"

function App() {
  const [query, setQuery] = useState<string>("")
  const defferedValue = useDeferredValue(query)

  return (
    <GithubContextProvider>
      <div className="flex flex-col w-full justify-center items-center">
        <SearchInput setQuery={setQuery} query={query} />
      </div>
      <Suspense fallback={<Loader />}>
        <UserList query={defferedValue} />
      </Suspense>
    </GithubContextProvider>
  )
}

export default App
