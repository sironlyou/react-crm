import { useEffect, useState } from "react";
import { Logo } from "./Icons/Logo";
import { search } from "./stuff/serverFunctions";
import styles from "./stuff/styles.module.css";

export const Header = () => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      search(query);
    }, 1000);

    return () => clearTimeout(delay);
  }, [query]);
  return (
    <header className={styles.header}>
      <Logo />
      <input
        placeholder="Введите запрос"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className={styles.headerInput}></input>
    </header>
  );
};
