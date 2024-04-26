import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../../credentials";

type Data =  {
    name: string,
    email:string,
    uid:string,
    photo:string | null
}
async function insertUser(data:Data) {
    try {
        const id = data.uid;
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, data);
        }
    } catch (error) {
        console.log(error)
    }
    
}
export default insertUser;