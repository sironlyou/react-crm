import React from "react";
import ReactDOM from "react-dom";
import { AddIcon } from "./Icons/AddIcon";
import { CloseIcon } from "./Icons/CloseIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";

import { fetchData, options, postClient, reset } from "./stuff/serverFunctions";
import styles from "./stuff/styles.module.css";
import { $client, $contacts, $modal, updateClient, updateContacts } from "./stuff/store";
import { useStore } from "effector-react";
import ReactDropdown from "react-dropdown";
import "../node_modules/react-dropdown/style.css";

export const Form = () => {
  const client = useStore($client);
  const contacts = useStore($contacts);
  const modal = useStore($modal);
  const handleRemove = (index: number) => {
    const list = [...contacts];
    list.splice(index, 1);
    updateContacts(list);
    updateClient({ ...client, contacts: list });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateClient({ ...client, contacts: contacts });
    postClient(client);
    setTimeout(() => {
      fetchData();
    }, 200);
    reset();
  };

  const addFields = () => {
    if (contacts.length > 9) return;
    updateContacts([...contacts, { type: "VK", value: "" }]);
  };

  const node = document.querySelector("#modal_root");
  if (!node) return null;
  return ReactDOM.createPortal(
    <div
      className={styles.backdrop}
      onClick={() => {
        reset();
      }}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {modal === "add" && <span className={styles.newClient}>Новый клиент</span>}
        {modal === "edit" && (
          <div>
            <span className={styles.newClient}>Изменить данные</span>
            <span className={styles.clientId}>ID: {client.id}</span>
          </div>
        )}
        <button
          className={styles.closeModal}
          onClick={(e) => {
            reset();
          }}>
          <CloseIcon />
        </button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrap}>
            <label className={styles.label}>
              <span className={styles.labelSpan}>Фамилия</span>
              <span className={styles.labelStar}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              value={client.lastName}
              onChange={(e) => {
                updateClient({ ...client, lastName: e.target.value });
              }}></input>
            <label className={styles.label}>
              <span className={styles.labelSpan}>Имя</span>
              <span className={styles.labelStar}>*</span>
            </label>
            <input
              className={styles.input}
              value={client.name}
              onChange={(e) => {
                updateClient({ ...client, name: e.target.value });
              }}
              type="text"></input>
            <label className={styles.label}>
              <span className={styles.labelSpan}>Отчество</span>
            </label>
            <input
              className={styles.input}
              value={client.surname}
              onChange={(e) => {
                updateClient({ ...client, surname: e.target.value });
              }}
              type="text"></input>
          </div>
          <div className={contacts.length > 0 ? styles.hiddenFieldsWrap : ""}>
            <div className={styles.hiddenFields}>
              {contacts.map((input, index) => {
                return (
                  <div className={styles.inputs}>
                    <ReactDropdown
                      onChange={(e) => {
                        contacts[index].type = e.value;
                        updateClient({ ...client, contacts: contacts });
                      }}
                      value={contacts[index].type}
                      options={options}
                      placeholder="Select an option"
                    />

                    <input
                      className={styles.extraInput}
                      onChange={(e) => {
                        contacts[index].value = e.target.value;
                        updateClient({ ...client, contacts: contacts });
                      }}
                      value={contacts[index].value}></input>
                    <button className={styles.removeInputBtn} type="button" onClick={(e) => handleRemove(index)}>
                      <DeleteIcon />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <button type="button" className={styles.addContacts} onClick={addFields}>
            <AddIcon /> Добавить контакт
          </button>
          <div className={styles.formButtonsWrap}>
            <button className={styles.submitButton} type="submit">
              Добавить клиента
            </button>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={(e) => {
                reset();
              }}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>,
    node
  );
};
