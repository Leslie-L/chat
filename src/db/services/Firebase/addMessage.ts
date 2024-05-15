import {updateDoc,doc, arrayUnion} from "firebase/firestore"; 
import { db } from "../../credentials";
type DATA= {
    sendby:string | undefined,
    receptor:string | undefined,
    date: number,
    message: string,
}

async function addNewMessage(idChat:string, chat:DATA) {
    try {
        const docRefChat = doc(db,"chats",idChat);
        await updateDoc(docRefChat,{
            chat: arrayUnion(chat)
        })
        
    } catch (error) {
        throw new Error("Error: ");
        
    }
    
}
export default addNewMessage;
