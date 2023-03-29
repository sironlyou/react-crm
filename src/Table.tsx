// import { useEffect } from "react";
import { useState } from "react";

import { GeneratedTR } from "./GeneratedTR";
import { SortAsc } from "./Icons/SortAsc";
import { SortDesc } from "./Icons/SortDesc";

import { fetchData } from "./stuff/serverFunctions";
import styles from "./stuff/styles.module.css";
import { $clients, updateClients } from "./stuff/store";
import { useStore } from "effector-react";
import { IRenderList } from "./stuff/interface";

// import { loadClients } from "./stuff/serverFunctions";

export function Table() {
  const clients = useStore($clients);
  const [sort, setSort] = useState({ direction: "default", column: "" });
  const handleClick = (property: keyof IRenderList) => {
    setSort({ column: property, direction: "default" });
    switch (sort.direction) {
      case "asc":
        return setDefault();

      case "desc":
        return sortAsc(property);
      case "default":
        return sortDesc(property);
    }
  };
  let copyArr = [];
  copyArr.push(clients);
  const sortAsc = (property: keyof IRenderList) => {
    if (clients === undefined) return;
    copyArr = clients.sort((a: IRenderList, b: IRenderList) => (a[property] > b[property] ? -1 : 1));
    updateClients(copyArr);

    setSort({ direction: "asc", column: property });
  };
  const setDefault = () => {
    setSort({ direction: "default", column: "" });
    fetchData();
  };
  const sortDesc = (property: keyof IRenderList) => {
    if (clients === undefined) return;
    copyArr = clients.sort((a: IRenderList, b: IRenderList) => (a[property] > b[property] ? 1 : -1));
    updateClients(copyArr);

    setSort({ direction: "desc", column: property });
  };
  const sortArrow = (property: keyof IRenderList) => {
    if (sort.column === property && sort.direction === "asc") return <SortAsc />;

    if (sort.column === property && sort.direction === "desc") return <SortDesc />;
    if (sort.direction === "default" || sort.column !== property) return <SortDesc />;
  };
  return (
    <table cellSpacing={0} className={styles.table}>
      <thead>
        <tr>
          <th style={{ cursor: "pointer", paddingLeft: "20px" }} onClick={(e) => handleClick("id")}>
            <span className={styles.rowTextId}> ID</span> {sortArrow("id")}
          </th>
          <th style={{ cursor: "pointer" }} onClick={(e) => handleClick("lastName")}>
            <span className={styles.rowText}> Фамилия Имя Отчество</span> {sortArrow("lastName")}
            <span className={styles.sortLetters}>А-Я</span>
          </th>
          <th style={{ cursor: "pointer" }} onClick={(e) => handleClick("createdAt")}>
            <span className={styles.rowText}> Дата и время создания </span> {sortArrow("createdAt")}
          </th>
          <th style={{ cursor: "pointer" }} onClick={(e) => handleClick("updatedAt")}>
            <span className={styles.rowText}> Последние изменения </span> {sortArrow("updatedAt")}
          </th>
          <th>
            <span className={styles.rowText}>контакты </span>
          </th>
          <th>
            <span className={styles.rowText}> Действия </span>
          </th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        <GeneratedTR />
      </tbody>
    </table>
  );
}
