"use client";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Modal from "@/components/Modal/Modal";

const NotePreviewClient = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  return (
    <Modal onClose={handleClose}>
      {isSuccess && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <p className={css.content}>{note.tag}</p>
          </div>
        </div>
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </Modal>
  );
};

export default NotePreviewClient;
