interface Props {
    handlerModal:React.Dispatch<React.SetStateAction<boolean>>
}
function ModalNewContact({handlerModal}:Props) {
    return(
        <article className="fixed w-80 p-4 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg text-black">
            <button className="text-gray-500 self-end" onClick={()=>handlerModal(state=>!state)}>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path fill="currentColor" fillRule="evenodd" d="M6.793 6.793a1 1 0 0 1 1.414 0L12 10.586l3.793-3.793a1 1 0 1 1 1.414 1.414L13.414 12l3.793 3.793a1 1 0 0 1-1.414 1.414L12 13.414l-3.793 3.793a1 1 0 0 1-1.414-1.414L10.586 12L6.793 8.207a1 1 0 0 1 0-1.414" clipRule="evenodd"></path>
              </svg>
            </button>
            <h2 className="font-bold text-xl text-center">Add a new Friend</h2>
            <form action="" className="w-full">
              <input type="text" name="email" id="email" placeholder="Search for email"  className=" p-2 bg-[#ECE5DD] rounded-lg" />
              <button type="submit" className="ml-2 p-2 rounded-md bg-[#25D366] text-white font-bold">Search</button>
            </form>
        </article>
    )   
}
export default ModalNewContact