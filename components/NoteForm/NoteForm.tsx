import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type NewNote } from "@/lib/api";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
}

interface NoteValues {
  title: string;
  content: string;
  tag: string;
}

const initialValues: NoteValues = { title: "", content: "", tag: "Todo" };

const Schema = Yup.object().shape({
  title: Yup.string()
    .min(3, "min length 3 symbols")
    .max(50, "max length 50 symbols")
    .required("this field is required"),
  content: Yup.string().max(500, "max length 500 symbols"),
  tag: Yup.string()
    .oneOf(
      ["Shopping", "Meeting", "Personal", "Work", "Todo"],
      "invalid category"
    )
    .required(),
});

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const handleSubmit = (
    values: NoteValues,
    actions: FormikHelpers<NoteValues>
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  const mutation = useMutation({
    mutationFn: (newNoteData: NewNote) => createNote(newNoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      {({ isValid, dirty }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage component="span" name="title" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              component="span"
              name="content"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage component="span" name="tag" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              onClick={onClose}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!isValid || !dirty}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
