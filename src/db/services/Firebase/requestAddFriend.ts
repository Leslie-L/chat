import {collection, addDoc} from "firebase/firestore"; 
import { db } from "../../credentials";


async function requestAddFriend(ask:string, to:string) {
    try {
        //console.log("here")
        const docRef = collection(db, "requestfriend");
        const data ={ask,to}
        //console.log(data)
        await addDoc(docRef, data);
        
    } catch (error) {
        return error
    }
    
}
export default requestAddFriend;
