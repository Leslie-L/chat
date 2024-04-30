interface Props {
    handlerModal:React.Dispatch<React.SetStateAction<boolean>>
}
function AddContact({handlerModal}:Props) {
    return(
        <button 
            onClick={()=>handlerModal(state=>!state)}
            className="w-12 h-12 m-3 rounded-full text-white grid place-content-center  bg-[#25D366] self-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.644-1.142l-4.29 1.117a.85.85 0 0 1-1.037-1.036l1.116-4.289A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2m.75 5.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5z" />
                </svg>
        </button>
    )
}
export default AddContact