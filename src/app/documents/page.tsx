import fetcher from "@/lib/fetcher";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import Heading from "@/components/ui/heading";

import EditorEngine, { Controls, Sidebar, Footer, Editor } from "@/components/ui/gallery";

export default async function Home() {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => fetcher.GET('entries'),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <EditorEngine
          editor={<Editor />}
          heading={<Heading></Heading>}
          controls={<Controls />}
          sidebar={<Sidebar />}
          footer={<Footer />}
        />
      </main>
    </HydrationBoundary >
  );
}

export const fetchCache = 'force-no-store';
