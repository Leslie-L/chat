import { getDocs, query, collection, where } from "firebase/firestore"; 
import { db } from "../../credentials";


async function searchUser(email:string) {
    try {
    
        const emailRef = collection(db, "users");
        const q = query(emailRef, where("email", "==", email));
        const docResult = await getDocs(q);
        if (docResult) {
            const result = docResult.docs[0].data()
            const friendRef = collection(db,"friends")
            const q2 = query(friendRef,where('users', 'array-contains', result.uid));
            const docRes2 = await getDocs(q2);
            if(docRes2.empty){
                return {...result, friend:false}
            }else{
                return {...result, friend:true}
            }
            
        }
    } catch (error) {
        console.log(error)
    }
    
}
export default searchUser;