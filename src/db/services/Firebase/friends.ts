import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../credentials";
import useUser from "../../../providers/useUser";

async function searchUser() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { currentUser } = useUser();
  const uid = currentUser.uid;
  try {
    const friendRef = collection(db, "friends");
    const q = query(friendRef, where("users", "array-contains", uid));
    const docRes = await getDocs(q);
    const friends = [];
    docRes.forEach((item) => {
      const [first, second] = item.data().users;
      if (first !== uid) friends.push(first);
      if (second !== uid) friends.push(second);
    });
    
  } catch (error) {
    console.log(error);
  }
}
export default searchUser;
