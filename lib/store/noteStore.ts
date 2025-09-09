import { create } from "zustand";
import { NewNote } from "../api";
import { persist } from "zustand/middleware";

interface noteStore {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}
const initialDraft: NewNote = {
  title: "",
  tag: "Todo",
  content: "",
};
export const useNoteStore = create<noteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    { name: "draft", partialize: (state) => ({ draft: state.draft }) }
  )
);