import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import toast from "react-hot-toast";
import { deleteNote } from "@/lib/api";
import Link from "next/link";

interface NoteListProps {
  notesData: Note[];
}

function NoteList({ notesData }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });
  return (
    <div>
      <ul className={css.list}>
        {notesData.map((note) => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.buttonGreen}>
                View Details
              </Link>
              <button
                className={css.deleteBtn}
                onClick={() => mutation.mutate(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
