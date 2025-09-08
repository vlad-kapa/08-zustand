import Link from "next/link";
import css from "./Sidebar.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

const Sidebar = () => {
  return (
    <ul className={css.menuList}>
      {tags.map((item) => (
        <li className={css.menuItem} key={item}>
          <Link className={css.menuLink} href={`/notes/filter/${item}`}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
