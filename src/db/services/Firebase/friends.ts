import { getDocs, query, collection, where, doc, getDoc } from "firebase/firestore";
import { db } from "../../credentials";
import useUser from "../../../providers/useUser";
type UserFriend =  {
    email:string,
    name:string,
    photo: string | null,
    uid:string
}
async function getUserInfo(id:string) {
   
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
    
}

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
    const friends: UserFriend[] = [];
    docRes.forEach(async (item) => {
      const [first, second] = item.data().users;
      
      if (first !== uid){
        const data  = await getUserInfo(first) as UserFriend
        friends.push(data)
      } 
      if (second !== uid) {
        const data  = await getUserInfo(second) as UserFriend
        friends.push(data)
      }
        
    });
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    
        querySnapshot.forEach(async (item) => {
             const [first, second] = item.data().users;

            if (first !== uid){
                const data  = await getUserInfo(first) as UserFriend
                friends.push(data)
              } 
              if (second !== uid) {
                const data  = await getUserInfo(second) as UserFriend
                friends.push(data)
              }
        });
        console.log("Current cities in CA: ", cities.join(", "));
      });

    return friends;

  } catch (error) {
    console.log(error);
  }
}
export default searchUser;
