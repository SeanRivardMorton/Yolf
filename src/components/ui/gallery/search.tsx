import { Input } from "../input"

function Search() {
  return <form className="w-full">
    <label htmlFor="search" className="sr-only">Search</label>
    <Input type="text" placeholder="Search" className="w-fill text-2xl p-6 border-white border-4 text-white" />
  </form>
}

export default Search
