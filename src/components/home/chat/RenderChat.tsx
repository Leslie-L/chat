import { useState } from "react";
import useCurrentChat from "../../../providers/useCurrentChat";
import Message from "../Message";
import useUser from "../../../providers/useUser";
import addNewMessage from "../../../db/services/Firebase/addMessage";

function RenderChat() {
    const {currentUser}=useUser()
    const {currentChat} = useCurrentChat()
    const [text, setText] = useState('')
    const handlerText = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const val = e.target.value;
         setText(val)
    }
    const handlerEnter = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        const key = e.key;
        if(key==='Enter')
            handlerSent()
    }
    const handlerSent = async ()=>{
        if(text.trim().length>0){
            const idChat = currentChat?.idChat;
            const data = {
                sendby:currentUser?.uid,
                receptor:currentChat?.uid,
                date: (new Date).getTime(),
                message: text.trim(),
            }
            if(idChat)
            try {
                await addNewMessage(idChat,data)
                console.log(data)
                setText('')
            } catch (error) {
                console.log("Error")
            }
            
        }
    }
    
    return(
        <section className="w-full h-screen flex flex-col justify-between">
          <div className="bg-[#128C7E] h-16 flex gap-x-3 items-center px-2">
              <div className="bg-[#25D366] h-12 w-12 rounded-full text-white flex justify-center items-center">
                    {
                        currentChat?.photo !==null &&
                        <img src={currentChat?.photo} alt={currentChat?.name} />
                    }
                    {
                        currentChat?.photo ==null &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                            <path fill="currentColor" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8" />
                        </svg> 
                    }
                      
              </div>
              <p className="font-bold text-white text-xl">
                  {currentChat?.name}
              </p>
          </div>
          <div className="w-full p-4 flex-grow flex-shrink bg-[#ECE5DD] overflow-x-auto scroll-bar flex flex-col justify-end">
            <Message id={'1'} msn={'This is a new message'} me={true}/>
            <Message id={'2'} msn={'This is a new message'} me={false}/>
          </div>
          <div className="w-full h-16 bg-[#128C7E] flex justify-center items-center gap-x-2">
              <input type="text" placeholder="Write a message" className=" w-3/4 h-10 p-2 bg-[#ECE5DD] rounded-lg" value={text} onChange={handlerText} onKeyDown={handlerEnter} />
              <button onClick={handlerSent} className="w-12 h-12 rounded-full text-white grid place-content-center  bg-[#25D366]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                      <path fill="currentColor" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26l.001.002l4.995 3.178l3.178 4.995l.002.002l.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215l7.494-7.494l1.178-.471z" />
                  </svg>
              </button>
          </div>
      </section>
    )
}
export default RenderChat;