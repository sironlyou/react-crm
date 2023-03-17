import { useEffect, useState } from "react";
import { IRenderList } from "./App";
import { Logo } from "./Icons/Logo";
import styles from "./stuff/styles.module.css";
interface IHeader {
  renderList: IRenderList[] | undefined;
  setRenderList: React.Dispatch<React.SetStateAction<IRenderList[] | undefined>>;
  serverList: IRenderList[] | undefined;
}

export const Header = ({ serverList, setRenderList, renderList }: IHeader) => {
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    const filterInput = () => {
      if (renderList !== undefined && serverList !== undefined) {
        const copyStudentList = serverList.filter((item) => {
          return item.lastName.includes(filterValue.trim());
        });
        setRenderList(copyStudentList);
        // setReserve(copyStudentList);
      }
    };

    filterInput();
  }, [filterValue]);

  return (
    <header className={styles.header}>
      <Logo />
      <input
        placeholder="Введите запрос"
        onChange={(e) => {
          setFilterValue(e.target.value);
        }}
        className={styles.headerInput}></input>
    </header>
  );
};
