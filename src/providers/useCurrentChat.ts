import { create } from 'zustand'

type UserFriend = {
    email: string;
    name: string;
    photo: string | null;
    uid: string;
  };
interface ChatStoreState {
    currentChat: UserFriend | null ;
    setCurrentChat: (user: UserFriend) => void;
}
const useCurrentChat = create<ChatStoreState>((set):ChatStoreState => ({
  currentChat: null,
  setCurrentChat:(user) => set({ currentChat: user })
  
}))
export default useCurrentChat