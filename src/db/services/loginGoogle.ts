import { auth } from "../credentials";
import {GoogleAuthProvider, onAuthStateChanged, signInWithRedirect} from 'firebase/auth';
import insertUser from "./Firebase/insertUser";


async function loginGoogle() {
    try {
        const provider = new GoogleAuthProvider()
       await signInWithRedirect(auth,provider)        
        
    } catch (e) {
        console.log(e)
    }
}
export default loginGoogle;