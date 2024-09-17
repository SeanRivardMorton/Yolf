import fetcher from "@/lib/fetcher";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import Heading from "@/components/ui/heading";
import EditorEngine, { Controls, Sidebar, Footer, Editor, RichTextEditor } from "@/components/ui/editor";
import { handleSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

export default async function Home() {
  const queryClient = new QueryClient()

  const session = await handleSession();

  if (!session) {
    redirect('/login');
  }

  queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => fetcher.GET('entries'),
  })

  queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: () => fetcher.GET('user'),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <EditorEngine
          editor={<RichTextEditor document={'<div>I am from up here brother</div>'} />}
          heading={<Heading />}
          controls={<Controls />}
          sidebar={<Sidebar />}
          footer={<Footer />}
        />
      </main>
    </HydrationBoundary >
  );
}

export const fetchCache = 'force-no-store';
