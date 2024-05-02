type Props ={
    message:string,
    color: string
}
function Popup(props:Props) {
    return (
    <div style={{backgroundColor:props.color}} className="fixed w-40 h-12 p-4 rounded-md text-black top-10 left-1/2  transform -translate-x-1/2 -translate-y-10 grid place-content-center">
        {props.message}
    </div>)
}
export default Popup;