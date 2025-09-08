import fetchNotes from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClientPage from "./Notes.client";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}
const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "" : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClientPage tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
