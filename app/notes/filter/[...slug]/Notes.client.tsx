"use client";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import fetchNotes from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientPageProps {
  tag: string;
}
const NotesClientPage = ({ tag }: NotesClientPageProps) => {
  const [page, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const handleSearch = useDebouncedCallback((value: string) => {
    setCurrentPage(1);
    setSearch(value);
  }, 300);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const openModal = () => {
    setmodalIsOpen(true);
  };
  const closeModal = () => {
    setmodalIsOpen(false);
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox setQuery={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            forcePage={page}
            totalPages={data.totalPages}
            setCurrentPage={handlePageChange}
          />
        )}
        <button onClick={openModal} type="button" className={css.button}>
          Create note +
        </button>
      </header>

      {isSuccess && data && data?.notes.length > 0 ? (
        <NoteList notesData={data.notes} />
      ) : (
        !isLoading && <p>Tasks not found</p>
      )}
      {isLoading && !data && <Loader />}
      {modalIsOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClientPage;
