import useCurrentChat from "../../providers/useCurrentChat"

type UserFriend =  {
    email:string,
    name:string,
    photo: string | null,
    uid:string
  }
function Contact(item:UserFriend) {
    const {setCurrentChat} = useCurrentChat()
    const handlerClick = ()=>{
        setCurrentChat(item)
    }

    return(
        <button 
            onClick={handlerClick}
            className="w-full h-16 border-b-2 border-gray-300 p-3 flex justify-center items-center gap-3">
            <div className="bg-[#128C7E] h-12 w-12 rounded-full text-white flex justify-center items-center">
                {
                    item.photo==null &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                        <path fill="currentColor" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8" />
                    </svg>
                }
                {
                    item.photo!==null &&
                    <img src={item?.photo} alt={item.name} />
                }
            </div>
            <div className="flex flex-col items-start flex-grow ">
                <p className="font-bold">{item.name}</p>
                <p>{item.email}</p>
            </div>
            <span className="bg-[#128C7E] h-6 w-6 grid place-content-center rounded-full text-white"> 3 </span>
        </button>
    )
}
export default Contact