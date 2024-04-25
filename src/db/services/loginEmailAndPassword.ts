import { auth } from "../credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';

async function loginWithEmailPassword(email:string,password:string) {
    try {
        const user = await signInWithEmailAndPassword(auth,email,password);
        return user;
    } catch (e) {
        console.log(e)
    }
}
export default loginWithEmailPassword;