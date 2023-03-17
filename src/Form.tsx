import React from "react";
import ReactDOM from "react-dom";

import { IRenderList } from "./App";
import { AddIcon } from "./Icons/AddIcon";
import { CloseIcon } from "./Icons/CloseIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";

import { loadClients, postClient } from "./stuff/serverFunctions";
import styles from "./stuff/styles.module.css";
import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";

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
export interface StateProps {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
  renderList: IRenderList[] | undefined;
  setRenderList: React.Dispatch<React.SetStateAction<IRenderList[] | undefined>>;
  isModalOpen?: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputFields: IContacts[];
  setInputFields: React.Dispatch<React.SetStateAction<IContacts[]>>;
}

export function Form({ state, setState, renderList, setRenderList, inputFields, setInputFields, setIsModalOpen, isModalOpen }: StateProps) {
  // const [inputFields, setInputFields] = useState<IContacts[]>([]);

  let data = [...inputFields];

  const fetchData = async () => {
    const list = await loadClients();
    setRenderList(list);
  };
  const handleRemove = (index: number) => {
    const list = [...inputFields];
    list.splice(index, 1);
    setInputFields(list);
  };
  const options = ["Телефон", "VK", "Facebook", "Email", "Другое"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setState({ ...state, contacts: data });

    postClient(state);
    setTimeout(() => {
      fetchData();
    }, 200);
    setState({ lastName: "", name: "", surname: "" });
    setInputFields([]);
    setIsModalOpen(false);
  };

  const addFields = () => {
    if (inputFields.length > 9) return;
    let newField = { type: "VK", value: "" };
    setInputFields([...inputFields, newField]);
  };

  const node = document.querySelector("#modal_root");
  if (!node) return null;
  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={() => setIsModalOpen(!isModalOpen)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={styles.newClient}>Новый клиент</span>
        <button
          className={styles.closeModal}
          onClick={(e) => {
            setIsModalOpen(false);
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
                    {/* <select
                      className={styles.select}
                      onChange={(e) => {
                        data[index].type = e.currentTarget.value;
                        setState({ ...state, contacts: data });
                      }}
                      value={data[index].type}
                      name=""
                      id="">
                      <option value="VK">VK</option>

                      <option value="FB">FB</option>
                      <option value="Email">Email</option>

                      <option value="Phone">Phone</option>
                      <option value="Other">Other</option>
                    </select> */}
                    <input
                      className={styles.extraInput}
                      onChange={(e) => {
                        data[index].value = e.target.value;
                        setState({ ...state, contacts: data });
                      }}
                      value={data[index].value}></input>
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
                setIsModalOpen(false);
              }}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>,
    node
  );
}
