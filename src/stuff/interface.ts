export interface IState {
  surname: string;
  name: string;
  lastName: string;
  id?: string;
  contacts?: IContacts[];
}
export interface IContacts {
  type: string;
  value: string;
}
export interface IRenderList {
  id: string;
  name: string;
  surname: string;
  lastName: string;
  contacts: IContacts[];
  createdAt: string;
  updatedAt: string;
}
