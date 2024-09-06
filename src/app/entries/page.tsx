import fetcher from "@/lib/fetcher"
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import Entries from "./entries"

async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['entries'],
    queryFn: () => fetcher.GET('entries'),
  })


  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Entries />
      </HydrationBoundary>
    </main >
  )
}

export default Page
