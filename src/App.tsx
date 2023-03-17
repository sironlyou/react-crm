import React, { useEffect, useState } from "react";
import styles from "./stuff/styles.module.css";

import "./App.css";
import { Table } from "./Table";

import { Container } from "./Container";
import { Form, IContacts, IState } from "./Form";
import { loadClients } from "./stuff/serverFunctions";
import { AddNew } from "./Icons/AddNew";
import { FormEdit } from "./FormEdit";
import { Header } from "./Header";
export interface IRenderList {
  id: string;
  name: string;
  surname: string;
  lastName: string;
  contacts: IContacts[];
  createdAt: string;
  updatedAt: string;
}
export interface ITrigger {
  triggerRender: true;
}
function App() {
  const [renderList, setRenderList] = useState<IRenderList[] | undefined>([]);
  const [state, setState] = useState<IState>({ surname: "", name: "", lastName: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editClient, setEditClient] = useState<IRenderList[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [inputFields, setInputFields] = useState<IContacts[]>([]);
  const [serverList, setServerList] = useState<IRenderList[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const list = await loadClients();
      setRenderList(list);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Header serverList={serverList} renderList={renderList} setRenderList={setRenderList} />
      <Table
        serverList={serverList}
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
      {isModalOpen && (
        <Form
          inputFields={inputFields}
          setInputFields={setInputFields}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          renderList={renderList}
          setRenderList={setRenderList}
          state={state}
          setState={setState}
        />
      )}
      {!isModalOpen && (
        <div className={styles.addBtnWrap}>
          <button
            className={styles.showMoreBtn}
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}>
            <AddNew /> <span className={styles.addBtnSpan}>Добавить клиента</span>
          </button>
        </div>
      )}
      {isEditModalOpen && (
        <FormEdit
          inputFields={inputFields}
          setInputFields={setInputFields}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          editClient={editClient}
          setEditClient={setEditClient}
          setIsEditModalOpen={setIsEditModalOpen}
          isEditModalOpen={isEditModalOpen}
          renderList={renderList}
          setRenderList={setRenderList}
          state={state}
          setState={setState}
        />
      )}
    </Container>
  );
}

export default App;
