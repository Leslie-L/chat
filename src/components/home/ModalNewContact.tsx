import { useState } from "react";
import searchUser from "../../db/services/Firebase/searchUset"
import requestAddFriend from "../../db/services/Firebase/requestAddFriend";
import useUser from "../../providers/useUser";

interface Props {
    handlerModal:React.Dispatch<React.SetStateAction<boolean>>,
    controlModal: () => Promise<void>,
    setPopupMessage:React.Dispatch<React.SetStateAction<{
        message: string;
        color: string;
    }>>
}
type Friend = {
    photo: string | null,
    email:string,
    name:string,
    uid:string,
    friend:boolean
}

function ModalNewContact({handlerModal, controlModal,setPopupMessage}:Props) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { currentUser } = useUser();
    const [friend, setFriend] =useState<Friend|null>(null)
    const [isLoading, setIsLoading]= useState(false);
    const [friendUpdated, setFriendUpdated] =useState(false)
    const [notFound, setNotFound] = useState('')
    const handlerForm = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true)
        const form = new FormData(e.currentTarget)
        const email = form.get('email') as string
        const result  = await searchUser(email) as Friend;
        if (result) {
            console.log(result)
            setFriend(result)
            setFriendUpdated(true)
            setNotFound('')
        }else{
            setFriend(null)
            setFriendUpdated(false)
            setNotFound('User not found')
            console.log("No result");
        }
        setIsLoading(false)
    }
    const handlerContact =async (to:string)=>{
        try {
            await requestAddFriend(currentUser.uid,to)
            handlerModal(state=>!state)
            setPopupMessage({
                message:"Request sent",
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
        <article className="fixed w-80 p-4 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg text-black">
            <button className="text-gray-500 self-end" onClick={()=>handlerModal(state=>!state)}>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path fill="currentColor" fillRule="evenodd" d="M6.793 6.793a1 1 0 0 1 1.414 0L12 10.586l3.793-3.793a1 1 0 1 1 1.414 1.414L13.414 12l3.793 3.793a1 1 0 0 1-1.414 1.414L12 13.414l-3.793 3.793a1 1 0 0 1-1.414-1.414L10.586 12L6.793 8.207a1 1 0 0 1 0-1.414" clipRule="evenodd"></path>
              </svg>
            </button>
            <h2 className="font-bold text-xl text-center">Add a new Friend</h2>
            <form onSubmit={handlerForm} className="w-full">
              <input type="text" name="email" id="email" placeholder="Search for email"  className=" p-2 bg-[#ECE5DD] rounded-lg" />
              <button type="submit" className="ml-2 p-2 rounded-md bg-[#25D366] text-white font-bold">Search</button>
            </form>
            <p>{notFound}</p>
            {
                isLoading && 
                <div role="status" className="w-full grid place-content-center">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {
                friendUpdated  && 
                <div className="w-full border-t-2 my-2 border-gray-400 flex items-center justify-between gap-x-2">
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
                    {
                        friend?.friend === false &&
                        <button onClick={()=>handlerContact(friend.uid)} className="p-2 rounded-md bg-[#25D366] text-white ">Add </button>
                    }
                    {
                         friend?.friend &&
                         <button className="p-2 rounded-md bg-gray-700 text-white " disabled>Friend </button>
                    }
                </div>
            }
        </article>
    )   
}
export default ModalNewContact