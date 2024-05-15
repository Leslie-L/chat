import { useEffect, useState } from "react";
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
import addFriend from "../../db/services/Firebase/addFriend";
interface Props {
    controlModal: () => Promise<void>,
    setPopupMessage:React.Dispatch<React.SetStateAction<{
        message: string;
        color: string;
    }>>
}
  type UserFriend = {
    email: string;
    name: string;
    photo: string | null;
    uid: string;
    reqId:string;
  };  
function NotificationNewContacts({controlModal,setPopupMessage}:Props) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { currentUser } = useUser();
    const [requests, setRequests] = useState(0)
    const [friendsReq, setFriendsReq] = useState<UserFriend[]>([])
    const [isOpen,setIsOpen] = useState(false)
    const getUserInfo = async (id: string) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
      };
    useEffect(() => {
        const friendRef = collection(db, "requestfriend");
          const uid = currentUser?.uid;
          const q = query(
            friendRef,
            where("to", "==", uid)
          );
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const countReq = snapshot.size;
            setRequests(countReq)
            const sol: UserFriend[] = []
            snapshot.docs.forEach(async (item) => {
              const data = item.data();
              
              const ask = data.ask;
              const user = await getUserInfo(ask) as UserFriend;
              sol.push({...user,reqId:item.id})
            });
            setFriendsReq(sol)
          });
          return () => unsubscribe();
        }, []);
                                
    const handlerContact=async (id:string,reqId:string)=>{
        
        try {
            if(currentUser?.uid)
            await addFriend(id,currentUser.uid,reqId)
            setPopupMessage({
                message:"You got a new friend!",
                color:"#25D366"
            })
        } catch (error) {
            setPopupMessage({
                message:"Error try again",
                color:"#950012"
            })
        }
       
        await controlModal()
    }
    return(
        <div className="w-full h-16 px-4 bg-[#128C7E] flex flex-col items-end justify-center text-white">
                {
                  requests >0 &&  <span className="h-5 w-5 rounded-full bg-[#25D366] text-white relative top-3 grid place-content-center">{requests}</span>
                }
                <button onClick={()=>setIsOpen(state=>!state)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5 18.77v-1h1.616V9.845q0-1.96 1.24-3.447T11 4.546V3h2v1.546q1.904.366 3.144 1.853t1.24 3.447v7.923H19v1zm6.997 2.615q-.668 0-1.14-.475t-.472-1.14h3.23q0 .67-.475 1.142q-.476.472-1.143.472"></path>
                    </svg>
                </button>
                {
                    isOpen &&
                    <div className="absolute w-full md:max-w-72 bg-gray-200 h-44 top-20 p-2">
                    {
                        friendsReq.length ===0 &&
                        <p className="text-center font-bold text-black">You don't have any notification</p>
                    }
                    {
                        friendsReq.map(friend=>{
                            return(
                                <div className="w-full border-b-2 my-2 border-gray-400 flex items-center justify-between gap-x-2">
                                {
                                    friend?.photo ?
                                    <img className="h-8 w-8 rounded-full border-2" src={friend.photo} alt="" /> :
                                    <span className="h-8 w-8 rounded-full bg-[#25D366] text-white grid place-content-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <g fill="none" fillRule="evenodd">
                                                <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                                                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.985 7.985 0 0 1 12 20a7.985 7.985 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984"></path>
                                            </g>
                                        </svg>
                                    </span>
                                } 
                                <div className="flex flex-col text-black">
                                    <p className="font-bold text-lg ">{friend?.name}</p>
                                    <p className="font-normal text-md">{friend?.email}</p>
                                </div>
                               
                                <button onClick={()=>handlerContact(friend.uid,friend.reqId)} className="p-2 rounded-md bg-[#25D366] text-white ">Accept</button>
                                
                                
                            </div>
                            )
                        })
                    }
                </div>
                }

        </div> 
    )
}
export default NotificationNewContacts;