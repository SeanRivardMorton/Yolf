'use client'

import fetcher from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"



function Entries() {

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['entries'],
    queryFn: () => fetcher.GET('entries'),
  })

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        <h1>No data</h1>
      </div>
    )
  }

  if (!isSuccess) {
    return (
      <div>
        <h1>Failed to fetch data</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>Entries</h1>
      <ul>
        {data.result.map((entry: any) => (
          <li key={entry.id}>{entry.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Entries
