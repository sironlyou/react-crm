import { FB } from "./Icons/FB";
import { Mail } from "./Icons/Mail";
import { Other } from "./Icons/Other";
import { Phone } from "./Icons/Phone";
import { VK } from "./Icons/VK";
import { loadClient, loadClients, removeClient } from "./stuff/serverFunctions";
import { IRenderListProps } from "./Table";
import styles from "./stuff/styles.module.css";
import { DeleteRowIcon } from "./Icons/DeleteRowIcon";
import { EditIcon } from "./Icons/EditIcon";
import { getDate, getTime } from "./stuff/timeFunctions";

export function GeneratedTR({
  setState,

  state,
  renderList,
  editClient,
  inputFields,
  setInputFields,
  setIsLoading,
  isLoading,
  setEditClient,
  setRenderList,
  isEditModalOpen,
  setIsEditModalOpen,
}: IRenderListProps) {
  const fetchData = async () => {
    const list = await loadClients();
    setRenderList(list);
  };
  const fetchClient = async (id: string) => {
    const object = await loadClient(id);
    let arr = [];
    arr.push(object);
    setEditClient(arr);
    setState(object);
    setInputFields(object.contacts);
  };

  return (
    <>
      {renderList &&
        renderList.map(({ id, contacts, createdAt, lastName, name, surname, updatedAt }) => (
          <tr className={styles.tableRow} onClick={(e) => {}} key={id}>
            <th className={styles.idColumn}>{id}</th>
            <th className={styles.column}>
              <p className={styles.clientName}>{lastName + " " + name + " " + surname}</p>
            </th>
            <th className={styles.column}>
              <span className={styles.dateSpan}>{getDate(createdAt)}</span> <span className={styles.timeSpan}>{getTime(createdAt)}</span>
            </th>
            <th className={styles.column}>
              <span className={styles.dateSpan}>{getDate(updatedAt)}</span> <span className={styles.timeSpan}>{getTime(updatedAt)}</span>
            </th>
            <th className={styles.imageRow}>
              {contacts.map((contact) => {
                return (
                  <span className={styles.tooltip}>
                    <span className={styles.contactsImg}>
                      {contact.type === "VK" && <VK />}
                      {contact.type === "Телефон" && <Phone />}
                      {contact.type === "Email" && <Mail />}
                      {contact.type === "Другое" && <Other />}
                      {contact.type === "Facebook" && <FB />}
                    </span>
                    <div className={styles.popup}>
                      <span className={styles.triangle}></span>
                      <span className={styles.popup_text}>{contact.type + ":" + contact.value}</span>
                    </div>
                  </span>
                );
              })}
            </th>
            <th className={styles.actionsRow}>
              <button
                className={styles.editRowBtn}
                onClick={(e) => {
                  fetchClient(id);

                  setIsLoading(true);
                  setIsEditModalOpen(true);
                }}>
                <EditIcon /> Изменить
              </button>
              <button
                className={styles.deleteRowBtn}
                onClick={(e) => {
                  removeClient(id);

                  setTimeout(() => {
                    fetchData();
                  }, 200);
                }}>
                <DeleteRowIcon /> Удалить
              </button>
            </th>
          </tr>
        ))}
    </>
  );
}
