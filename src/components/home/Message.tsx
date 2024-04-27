type MessageType ={
    id:string,
    msn:string,
    me:boolean
}
function Message(props:MessageType) {
    if(props.me){
        return  <p  className="p-2 text-normal bg-[#2a3942] text-white self-start rounded-md">{props.msn}</p>
    }else{
        return <p className="p-2 text-normal bg-[#005c4b] text-white self-end rounded-md">{props.msn} </p>
    }
}
export default Message