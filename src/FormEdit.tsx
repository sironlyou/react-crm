import React from "react";
import ReactDOM from "react-dom";

import { IRenderList } from "./App";
import { AddIcon } from "./Icons/AddIcon";
import { CloseIcon } from "./Icons/CloseIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";

import { loadClients, patchClient, removeClient } from "./stuff/serverFunctions";
import styles from "./stuff/styles.module.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export interface IState {
  surname: string;
  name: string;
  lastName: string;
  contacts?: IContacts[];
}
export interface IContacts {
  type: string;
  value: string;
}
interface StateProps {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
  renderList: IRenderList[] | undefined;
  setRenderList: React.Dispatch<React.SetStateAction<IRenderList[] | undefined>>;
  isEditModalOpen?: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editClient: IRenderList[] | undefined;
  setEditClient: React.Dispatch<React.SetStateAction<IRenderList[] | undefined>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  inputFields: IContacts[];
  setInputFields: React.Dispatch<React.SetStateAction<IContacts[]>>;
}

export function FormEdit({
  state,
  setState,
  renderList,
  setRenderList,
  isLoading,
  inputFields,
  setInputFields,
  setIsLoading,
  editClient,
  setEditClient,
  setIsEditModalOpen,
  isEditModalOpen,
}: StateProps) {
  let data = [...inputFields];

  const fetchData = async () => {
    const list = await loadClients();
    setRenderList(list);
  };

  //   if (state.contacts !== undefined) setInputFields(state.contacts);
  const handleRemove = (index: number) => {
    const list = [...inputFields];
    list.splice(index, 1);
    setInputFields(list);
    setState({ ...state, contacts: list });
  };
  const options = ["Телефон", "VK", "Facebook", "Email", "Другое"];
  const handleClose = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setState({ lastName: "", name: "", surname: "" });
    setInputFields([]);
  };
  const addFields = () => {
    let newField = { type: "VK", value: "" };
    setInputFields([...inputFields, newField]);
  };
  let arr = [];
  arr.push(state);
  const node = document.querySelector("#modal_root");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {editClient &&
          editClient.map(({ id, contacts, createdAt, lastName, name, surname, updatedAt }) => (
            <>
              <span className={styles.newClient}>Изменить данные</span>
              <span className={styles.clientId}>ID: {id}</span>
              <button
                className={styles.closeModal}
                onClick={(e) => {
                  setIsEditModalOpen(false);
                  setState({ lastName: "", name: "", surname: "" });
                  setInputFields([]);
                }}>
                <CloseIcon />
              </button>
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  patchClient(id, { lastName: state.lastName, name: state.name, surname: state.surname, contacts: state.contacts });
                  setIsEditModalOpen(false);
                  setTimeout(() => {
                    fetchData();
                  }, 200);
                  setState({ lastName: "", surname: "", name: "" });
                  setInputFields([]);
                }}>
                <div className={styles.inputWrap}>
                  <label className={styles.label}>
                    <span className={styles.labelSpan}>Фамилия</span>
                    <span className={styles.labelStar}>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    value={state.lastName}
                    onChange={(e) => {
                      setState({ ...state, lastName: e.target.value });
                    }}></input>
                  <label className={styles.label}>
                    <span className={styles.labelSpan}>Имя</span>
                    <span className={styles.labelStar}>*</span>
                  </label>
                  <input
                    className={styles.input}
                    value={state.name}
                    onChange={(e) => {
                      setState({ ...state, name: e.target.value });
                    }}
                    type="text"></input>
                  <label className={styles.label}>
                    <span className={styles.labelSpan}>Отчество</span>
                  </label>
                  <input
                    className={styles.input}
                    value={state.surname}
                    onChange={(e) => {
                      setState({ ...state, surname: e.target.value });
                    }}
                    type="text"></input>
                </div>
                <div className={inputFields.length > 0 ? styles.hiddenFieldsWrap : ""}>
                  <div className={styles.hiddenFields}>
                    {inputFields.map((input, index) => {
                      return (
                        <div className={styles.inputs}>
                          <Dropdown
                            onChange={(e) => {
                              data[index].type = e.value;
                              setState({ ...state, contacts: data });
                            }}
                            value={data[index].type}
                            // className={styles.dropdown}
                            options={options}
                            placeholder="Select an option"
                          />
                          <input
                            className={styles.extraInput}
                            value={input.value}
                            onChange={(e) => {
                              data[index].value = e.target.value;

                              setState({ ...state, contacts: data });
                            }}></input>{" "}
                          <button className={styles.removeInputBtn} type="button" onClick={(e) => handleRemove(index)}>
                            <DeleteIcon />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.formButtonsWrap}>
                  <button type="button" className={styles.addContacts} onClick={addFields}>
                    <AddIcon /> Добавить контакт
                  </button>
                  <button className={styles.submitButton} type="submit">
                    Сохранить
                  </button>
                  <button
                    className={styles.cancelButton}
                    type="button"
                    onClick={(e) => {
                      removeClient(id);
                      setIsEditModalOpen(false);
                      setState({ lastName: "", name: "", surname: "" });
                      setInputFields([]);

                      setTimeout(() => {
                        fetchData();
                      }, 200);
                    }}>
                    Удалить клиента
                  </button>
                </div>
              </form>
            </>
          ))}
      </div>
    </div>,
    node
  );
}
