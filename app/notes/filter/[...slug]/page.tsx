import fetchNotes from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClientPage from "./Notes.client";
import { Metadata } from "next";
interface NotesProps {
  params: Promise<{ slug: string[] }>;
}
export const generateMetadata = async ({
  params,
}: NotesProps): Promise<Metadata> => {
  const { slug } = await params;
  return {
    title: `${slug[0]} notes`,
    description: `Notes list with tag ${slug[0]}`,
    openGraph: {
      title: `${slug[0]} notes`,
      description: `Notes list with tag ${slug[0]}`,
      url: `https://08-zustand-two-self.vercel.app/notes/filter/${slug[0]}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        alt: `Notes tagged with ${slug[0]}`,
        },
      ],
      type: "article",
    },
  };
};

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