import { auth } from "../credentials";
import {GoogleAuthProvider, signInWithRedirect} from 'firebase/auth';


async function loginGoogle() {
    try {
        const provider = new GoogleAuthProvider()
        const user =await signInWithRedirect(auth,provider)
        console.log(user)
    } catch (e) {
        console.log(e)
    }
}
export default loginGoogle;