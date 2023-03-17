// import { createEvent, createStore } from "effector";

// export interface IClient{
//     name:string;
//     lastName:string
//     surname:string
//     contacts:IContacts[]
// }
// export interface IContacts{
//     type:string
//     value:string
// }
// export interface IServerClient {
//   name: string;
//   lastName: string;
//   surname: string;
//   contacts: IContacts[];
//   id:string
//   createdAt:string
//   udatedAt:string
// }

// type Store= {
// client:IClient[]
// newClient:string
// }
// const addClientToList = (client:IClient[],)
// const createClient = createEvent<string>()
// const setClient = createEvent()
// const store = createStore<Store>({
//     client:[],
//     newClient:''
// })
// .on(createClient,(state,newClient)=>({
//     ...state,
//     newClient
// }))
// .on(setClient,(state)=>({
// ...state,
// newClient:'',
// client:[]
// }))
export {};
