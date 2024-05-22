import {doc, collection, setDoc,} from "firebase/firestore"; 
import { db } from "../../credentials";
type DATA= {
    
    sendby:string | undefined,
    receptor:string | undefined,
    date: number,
    message: string,
    read:boolean
}

async function addNewMessage(idChat:string, chat:DATA) {
    try {
        /*const docRefChat = doc(db,"chats",idChat);
        await updateDoc(docRefChat,{
            chat: arrayUnion(chat)
        })*/
       
        const documentoRef = doc(db, 'chats', idChat);
        const subcoleccionRef = collection(documentoRef, 'chat');
        await setDoc(doc(subcoleccionRef),chat)
        
    } catch (error) {
        throw new Error("Error");
        
    }
    
}
export default addNewMessage;
