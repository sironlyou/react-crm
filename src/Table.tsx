// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { IRenderList } from "./App";
import { IContacts, IState } from "./Form";
import { GeneratedTR } from "./GeneratedTR";
import { SortAsc } from "./Icons/SortAsc";
import { SortDesc } from "./Icons/SortDesc";

import { loadClients } from "./stuff/serverFunctions";
import styles from "./stuff/styles.module.css";

// import { loadClients } from "./stuff/serverFunctions";
export interface IRenderListProps {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
  renderList: IRenderList[] | undefined;
  setRenderList: React.Dispatch<React.SetStateAction<IRenderList[] | undefined>>;
  isEditModalOpen?: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  editClient: IRenderList[] | undefined;
  setEditClient: React.Dispatch<React.SetStateAction<IRenderList[] | undefined>>;
  inputFields: IContacts[];
  setInputFields: React.Dispatch<React.SetStateAction<IContacts[]>>;
  serverList?: IRenderList[] | undefined;
  setServerList: React.Dispatch<React.SetStateAction<IRenderList[] | undefined>>;
}
export function Table({
  serverList,
  setServerList,
  state,
  setState,
  renderList,
  inputFields,
  setInputFields,
  setRenderList,
  editClient,
  isLoading,
  setIsLoading,
  setEditClient,
  isEditModalOpen,
  setIsEditModalOpen,
}: IRenderListProps) {
  useEffect(() => {
    const fetchData = async () => {
      const list = await loadClients();

      setServerList(list);
    };

    fetchData();
  }, [renderList, setServerList]);
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
  copyArr.push(renderList);
  const sortAsc = (property: keyof IRenderList) => {
    if (renderList === undefined) return;
    copyArr = renderList.sort((a: IRenderList, b: IRenderList) => (a[property] > b[property] ? -1 : 1));
    setRenderList(copyArr);
    // console.log(copyStudentList);

    setSort({ direction: "asc", column: property });
  };
  const setDefault = () => {
    setSort({ direction: "default", column: "" });
    setRenderList(serverList);
  };
  const sortDesc = (property: keyof IRenderList) => {
    if (renderList === undefined) return;
    copyArr = renderList.sort((a: IRenderList, b: IRenderList) => (a[property] > b[property] ? 1 : -1));
    setRenderList(copyArr);

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
            {" "}
            <span className={styles.rowText}>контакты </span>
          </th>
          <th style={{ cursor: "pointer" }} onClick={(e) => alert("а сюда нахер тыкаешь?")}>
            <span className={styles.rowText}> Действия </span>
          </th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        <GeneratedTR
          setServerList={setServerList}
          inputFields={inputFields}
          setInputFields={setInputFields}
          state={state}
          setState={setState}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          editClient={editClient}
          setEditClient={setEditClient}
          setIsEditModalOpen={setIsEditModalOpen}
          isEditModalOpen={isEditModalOpen}
          renderList={renderList}
          setRenderList={setRenderList}
        />
      </tbody>
    </table>
  );
}
