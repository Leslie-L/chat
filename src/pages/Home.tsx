import { Navigate, useNavigate } from "react-router-dom";
import logout from "../db/services/logout";
import useUser from "../providers/useUser";
import Navbar from "../components/home/Navbar";
import { useState } from "react";
import Contact from "../components/home/Contact";

function Home() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { currentUser, setCurrentUser } = useUser();
  const [isOpen,setIsOpen] = useState(true)
  const [friends, setFriends] = useState([])

  if (!currentUser) return <Navigate to="/login" replace />;
  
  const handleLogOut = async () => {
    await logout();
    setCurrentUser(null);
    navigate("/login");
  };
  return (
    <main className="w-full h-screen flex flex-col md:flex-row">
      <Navbar handleLogOut={handleLogOut} setIsOpen={setIsOpen} isOpen={isOpen}/>
      {isOpen &&
            <aside className="h-screen w-full md:max-w-xs bg-[#ECE5DD] overflow-x-auto scroll-bar ">
                
            <input type="text" className=" h-10 w-11/12 m-2 p-2 bg-[#2a3942] rounded-lg" placeholder="Search" />
            
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
        
            </aside>
      }
      
      <section className="w-full h-screen flex flex-col justify-between">
        <div className="bg-[#128C7E] h-16 flex gap-x-3 items-center px-2">
            <div className="bg-[#25D366] h-12 w-12 rounded-full text-white flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                        <path fill="currentColor" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8" />
                    </svg>
            </div>
            <p className="font-bold text-white text-xl">
                Name
            </p>
        </div>
        <div className="w-full p-4 flex-grow flex-shrink bg-[#ECE5DD] overflow-x-auto scroll-bar flex flex-col justify-end">
            <p  className="p-2 text-normal bg-[#2a3942] text-white self-start rounded-md">Message to me</p>
            <p className="p-2 text-normal bg-[#005c4b] text-white self-end rounded-md">Message to my friend </p>
        </div>
        <div className="w-full h-16 bg-[#128C7E] flex justify-center items-center gap-x-2">
            <input type="text" placeholder="Write a message" className=" w-3/4 h-10 p-2 bg-[#ECE5DD] rounded-lg" />
            <button className="w-12 h-12 rounded-full text-white grid place-content-center  bg-[#25D366]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26l.001.002l4.995 3.178l3.178 4.995l.002.002l.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215l7.494-7.494l1.178-.471z" />
                </svg>
            </button>
        </div>
      </section>
    </main>
  );
}
export default Home;
