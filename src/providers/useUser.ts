import { create } from 'zustand'
import { User as FirebaseUser } from "firebase/auth";

interface AuthStoreState {
    currentUser: FirebaseUser | null;
    setCurrentUser: (user: FirebaseUser | null) => void;
}
const useUser = create<AuthStoreState>((set):AuthStoreState => ({
  currentUser: null,
  setCurrentUser:(user) => set({ currentUser: user })
  
}))
export default useUser