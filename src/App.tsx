import React, { useEffect } from "react";
import styles from "./stuff/styles.module.css";

import "./App.css";
import { Table } from "./Table";
import { Container } from "./Container";
import { Form } from "./Form";
import { loadClients } from "./stuff/serverFunctions";
import { AddNew } from "./Icons/AddNew";
import { Header } from "./Header";
import { useStore } from "effector-react";
import { $modal, updateClients, updateModal } from "./stuff/store";

function App() {
  const modal = useStore($modal);

  useEffect(() => {
    (async () => {
      const list = await loadClients();
      updateClients(list);
    })();
  }, []);

  return (
    <Container>
      <Header />
      <Table />
      {modal !== "" && <Form />}
      {modal === "" && (
        <div className={styles.addBtnWrap}>
          <button
            className={styles.showMoreBtn}
            onClick={() => {
              updateModal("add");
            }}>
            <AddNew /> <span className={styles.addBtnSpan}>Добавить клиента</span>
          </button>
        </div>
      )}
    </Container>
  );
}

export default App;
