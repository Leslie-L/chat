import { auth } from "../credentials";
import {signOut} from 'firebase/auth';

async function logout() {
    try {
        await signOut(auth)
    } catch (error) {
      console.log(error)  
    }
}
export default logout;