import { auth } from "../credentials";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import insertUser from "./Firebase/insertUser";
type Data =  {
    name: string,
    email:string,
    uid:string,
    photo:string | null
}
async function registerUser(email:string,password:string) {
    try {
        const user = await createUserWithEmailAndPassword(auth,email,password);
        const userData:Data = {
            name: user.user?.displayName || user.user.email || "NAME",
            email: user.user.email || 'MAIL',
            uid: user.user.uid,
            photo: user.user.photoURL || null 
        }
        await insertUser(userData)
        
        return user
    } catch (e) {
        console.log(e)
    }
}
export default registerUser;