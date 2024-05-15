import {collection, addDoc,deleteDoc,doc, setDoc} from "firebase/firestore"; 
import { db } from "../../credentials";


async function addFriend(u1:string, u2:string,req:string) {
    try {
        const docRef = collection(db, "friends");
        const data ={users:[u1,u2]}
        const newDoc = await addDoc(docRef, data);
        await deleteDoc(doc(db, "requestfriend", req));
        const id = newDoc.id;
        const docRefChat = doc(db,"chats",id);
        await setDoc(docRefChat,data)

        
    } catch (error) {
        throw new Error("Error: ");
        
    }
    
}
export default addFriend;
