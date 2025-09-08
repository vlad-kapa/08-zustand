import { Note } from "@/types/note";
import axios from "axios";
import { number } from "yup";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;
interface NoteResp {
  notes: Note[];
  totalPages: number;
}
interface fetchNotesProps {
  page: number;
  search?: string;
  tag?: string;
  perPage: number;
}
export default async function fetchNotes(
  page: number,
  searchQuery?: string,
  tag?: string
): Promise<NoteResp> {
  const params: fetchNotesProps = {
    page,
    perPage: 12,
  };

  if (searchQuery) params.search = searchQuery;
  if (tag) params.tag = tag;

  const res = await axios.get<NoteResp>("/notes", { params });
  return res.data;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}
export async function createNote(newNoteData: NewNote) {
  const resp = await axios.post<Note>("/notes", newNoteData);
  return resp.data;
}

export async function deleteNote(id: string) {
  const resp = await axios.delete<Note>(`/notes/${id}`);
  return resp.data;
}

export async function fetchNoteById(id: string) {
  const resp = await axios.get<Note>(`/notes/${id}`);
  return resp.data;
}
