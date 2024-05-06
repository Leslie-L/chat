import { create } from 'zustand'

type UserFriend = {
    email: string;
    name: string;
    photo: string | null;
    uid: string;
  };
interface ChatStoreState {
    currentChat: UserFriend | null ;
    setCurrentUser: (user: UserFriend) => void;
}
const useCurrentChat = create<ChatStoreState>((set):ChatStoreState => ({
  currentChat: null,
  setCurrentUser:(user) => set({ currentChat: user })
  
}))
export default useCurrentChat