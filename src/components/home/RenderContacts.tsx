import {  useState, useLayoutEffect } from "react";
import {
  query,
  collection,
  where,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../db/credentials";
import useUser from "../../providers/useUser";
import Contact from "./Contact";

type UserFriend = {
  email: string;
  name: string;
  photo: string | null;
  uid: string;
  idChat:string;
};
function RenderContacts() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { currentUser } = useUser();
  const [userFriends, setUserFriends] = useState<UserFriend[]>([]);

  const getUserInfo = async (id: string) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };
  useLayoutEffect(() => {
  const friendRef = collection(db, "friends");
    const uid = currentUser?.uid;
    const q = query(
      friendRef,
      where("users", "array-contains", uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      
      snapshot.docs.forEach(async (item) => {
        const idChat = item.id;
        const [first, second] = item.data().users;

        if (first !== uid) {
          const dataUser = (await getUserInfo(first));
          const data = {...dataUser, idChat} as UserFriend;
          setUserFriends((state) => [...state, data]);
          
        }
        if (second !== uid) {
          const dataUser = (await getUserInfo(second)) as UserFriend;
          const data = {...dataUser, idChat} as UserFriend;
          setUserFriends((state) => [...state, data]);
          
        }
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="overflow-x-auto scroll-bar flex-grow">
      {userFriends.map((user) => (
        <Contact
          key={user.uid}
          name={user.name}
          email={user.email}
          uid={user.uid}
          photo={user.photo}
          idChat={user.idChat}
        />
      ))}
    </div>
  );
}
export default RenderContacts;
