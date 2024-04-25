import { auth } from "../credentials";
import {createUserWithEmailAndPassword} from 'firebase/auth';

async function registerUser(email:string,password:string) {
    try {
        const user = await createUserWithEmailAndPassword(auth,email,password);
        console.log(user)
    } catch (e) {
        console.log(e)
    }
}
export default registerUser;