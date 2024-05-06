import { Navigate, useNavigate } from "react-router-dom";
import logout from "../db/services/logout";
import useUser from "../providers/useUser";
import Navbar from "../components/home/Navbar";
import { useEffect, useState } from "react";

import AddContact from "../components/home/AddContact";
import NotificationNewContacts from "../components/home/NotificationNewContacts";
import ModalNewContact from "../components/home/ModalNewContact";
import RenderContacts from "../components/home/RenderContacts";
import Popup from "../components/shared/Popup";
import useCurrentChat from "../providers/useCurrentChat";
import RenderChat from "../components/home/chat/RenderChat";
import NoChat from "../components/home/chat/NoChat";


function Home() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { currentUser, setCurrentUser } = useUser();
  const {currentChat, width, setWidth, isOpen, setIsOpen} = useCurrentChat()
  const [openModal, setOpenModal] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState({
    message:"",
    color:""
  })
  //init the width of the screen
  
  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  if (!currentUser) return <Navigate to="/login" replace />;
  
  const handleLogOut = async () => {
    await logout();
    setCurrentUser(null);
    navigate("/login");
  };

  const controlPopup = async ()=>{
    setShowPopup(true)
    setTimeout(()=>{
      setShowPopup(false)
    },2000)

  }
  return (
    <main className="w-full h-screen flex flex-col md:flex-row">
      <Navbar handleLogOut={handleLogOut} setIsOpen={setIsOpen} isOpen={isOpen}/>
      {isOpen &&
            <aside className="h-screen w-full md:max-w-xs bg-[#ECE5DD] flex flex-col justify-between ">
              <NotificationNewContacts controlModal={controlPopup} setPopupMessage={setPopupMessage} />
              <input type="text" className=" h-10 w-11/12 m-2 p-2 bg-[#2a3942] rounded-lg" placeholder="Search" />
              <RenderContacts/>
              <AddContact handlerModal={setOpenModal}/>
        
            </aside>
      }
      {
        showPopup &&
        <Popup message={popupMessage.message} color={popupMessage.color}/>
      }
      {
        openModal && <ModalNewContact handlerModal={setOpenModal} controlModal={controlPopup} setPopupMessage={setPopupMessage}/>
      }
      {
        !(isOpen && (width <= 768)) && currentChat &&
          <RenderChat/>
      }
      {
        !(isOpen && (width <= 768)) && !currentChat &&
        <NoChat/>
      }
    </main>
  );
}
export default Home;
