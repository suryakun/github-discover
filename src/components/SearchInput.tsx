type Prop = {
  query: string;
  setQuery: Function
}

function SearchInput({ setQuery, query }: Prop) {
  return (
    <div data-testid="search" className="flex bg-gradient-to-b from-indigo-600 w-full p-4">
      <input data-testid="search-input" className="border-2 border-green-300 px-2 py-1 rounded focus:border-green-500 focus:outline-none placeholder:text-green-400"
        onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search Repository" value={query} />
    </div>
  );
}

export default SearchInput;