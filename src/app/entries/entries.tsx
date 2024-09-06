'use client'

import fetcher from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"

// NOTE: I thought about abstracting this into a shared component.
// but I think it's better to keep it here for now. I don't know
// for sure if other components will need to use it. It's also easier
// to keep it in this function for modification later if desired.
function Loading() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}

function NoData() {
  return (
    <div>
      <h1>No data</h1>
    </div>
  )
}

function Failed() {
  return (
    <div>
      <h1>Failed to fetch data</h1>
    </div>
  )
}

function Entries() {

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['entries'],
    queryFn: () => fetcher.GET('entries'),
  })

  if (isLoading) <Loading />
  if (!isSuccess) <Failed />
  if (!data.result.length) <NoData />

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
