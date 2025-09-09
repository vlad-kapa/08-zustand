import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Note | NoteHub",
  description: "Easily create and save a new note in NoteHub App.",
  openGraph: {
    title: "Create a New Note | NoteHub",
    description: "Easily create and save a new note in NoteHub App.",
    url: `https://08-zustand-two-self.vercel.app/notes/action/create`, 
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create new note in NoteHub",
      },
    ],
    type: "website",
  },
};
const CreatePage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreatePage;