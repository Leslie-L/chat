import { create } from 'zustand'

type UserFriend = {
    email: string;
    name: string;
    photo: string | null;
    uid: string;
    idChat:string;
  };
interface ChatStoreState {
    currentChat: UserFriend | null ,
    width: number,
    isOpen:boolean,
    setCurrentChat: (user: UserFriend) => void;
    setWidth:(size:number)=>void,
    setIsOpen:()=>void,
    getCurrentFriend:()=>string|undefined
}
const useCurrentChat = create<ChatStoreState>((set,get):ChatStoreState => ({
  currentChat: null,
  width:0,
  isOpen:true,
  setCurrentChat:(user) => set({ currentChat: user }),
  setWidth:(size)=>set({width:size}),
  setIsOpen:() =>  set((state) => ({ isOpen:!state.isOpen })),
  getCurrentFriend:()=>{
    if(get().currentChat){
      return get().currentChat?.uid
    }
    return undefined;
  }
  
}))
export default useCurrentChat