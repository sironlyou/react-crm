import { updateClient, updateClients, updateContacts, updateModal } from "./store";

export async function loadClients() {
  const response = await fetch("http://localhost:4000/api/clients");
  const data = await response.json();
  return data;
}
export const fetchData = async () => {
  const list = await loadClients();
  // setRenderList(list);
  updateClients(list);
};
export async function loadClient(id: string) {
  const response = await fetch(`http://localhost:4000/api/clients/${id}`);
  const data = await response.json();
  return data;
}
export async function postClient(obj: IServerItem) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await fetch("http://localhost:4000/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
}
export async function removeClient(id: string) {
  fetch("http://localhost:4000/api/clients/" + id, {
    method: "DELETE",
  });
}
export interface IServerItem {
  name: string;
  surname: string;
  lastName: string;
  contacts?: object[];
}

export function patchClient(id: string, obj: object) {
  fetch(`http://localhost:4000/api/clients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export const reset = () => {
  updateModal("");
  updateContacts([]);
  updateClient({ lastName: "", name: "", surname: "" });
};
export const options = ["Телефон", "VK", "Facebook", "Email", "Другое"];

export const search = async (query: string) => {
  const response = await fetch(`http://localhost:4000/api/clients?search=${query}`);
  const data = await response.json();
  updateClients(data);
};
