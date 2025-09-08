import css from "./SearchBox.module.css";
interface SearchBoxProps {
  setQuery: (value: string) => void;
}

function SearchBox({ setQuery }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  return (
    <input
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}

export default SearchBox;
