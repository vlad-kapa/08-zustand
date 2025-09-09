import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "404 – Page Not Found | Notehub",
  description: "The page you are looking for does not exist in Notehub App.",
  openGraph: {
    title: "404 – Page Not Found | Notehub",
    description: "Oops! The page you tried to reach does not exist in Notehub App.",
    url: "",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub 404 page",
      },
    ],
    type: "website",
  },
};

const NotFoundPage = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFoundPage;