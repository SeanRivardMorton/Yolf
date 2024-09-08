import { Controller, useForm } from "react-hook-form"
import { Input } from "../input"
import { Button } from "../button"
import { SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

function Search() {
  const searchParams = useSearchParams()
  const search = searchParams.get('query')
  const form = useForm({
    defaultValues: {
      search: search || ''
    }
  })
  const router = useRouter()

  const onSubmit = form.handleSubmit((data) => {
    router.push(`/documents?query=${data.search}`)
  })

  return <form className="w-full mb-8 flex flex-row gap-4" onBlur={onSubmit} onSubmit={onSubmit}>
    <label htmlFor="search" className="sr-only">Search</label>
    <Controller name="search" control={form.control} render={({ field }) => (
      <Input {...field} type="text" placeholder="Search" className="w-full text-2xl p-6 border-white border-4 text-white" />
    )} />
    <div className="w-fit">
      <Button type="submit" variant="outline" size="icon" className="w-full border-4 border-white p-6"><SearchIcon className="w-8 h-8" /></Button>
    </div>
  </form>
}

export default Search
