"use client";
import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";
const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((item) => (
            <li className={css.menuItem} key={item}>
              <Link
                onClick={toggle}
                href={`/notes/filter/${item}`}
                className={css.menuLink}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
