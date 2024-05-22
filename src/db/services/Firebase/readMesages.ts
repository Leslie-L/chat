import {
  doc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../credentials";

async function readMessages(idChat: string, idUser: string) {
  try {
    const chatRef = doc(db, "chats", idChat);
    const subCollectionREF = collection(chatRef, "chat");

    const qSubCollectionRef = query(
      subCollectionREF,
      where("read", "==", false),
      where("sendby", "==", idUser)
    );
    const querySnapshot = await getDocs(qSubCollectionRef);

    const updates = querySnapshot.docs.map((item) => {
      const docRef = doc(subCollectionREF, item.id); 
      return updateDoc(docRef, { read: true });
    });

   
    await Promise.all(updates);
  } catch (error) {
    throw new Error("Error");
  }
}
export default readMessages;
