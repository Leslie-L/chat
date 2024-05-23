type MessageType ={
    id:string,
    msn:string,
    me:boolean
}
function Message(props:MessageType) {
    if(props.me){
        return  <p  className="p-2 mt-1 w-fit text-normal  bg-[#2a3942] text-white justify-self-start rounded-md">{props.msn}</p>
    }else{
        return <p className="p-2 mt-1 text-normal w-fit bg-[#005c4b] text-white justify-self-end rounded-md">{props.msn} </p>
    }
}
export default Message