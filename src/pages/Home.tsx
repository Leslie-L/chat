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
  const [friends, setFriends] = useState([])

  if (!currentUser) return <Navigate to="/login" replace />;
  
  const handleLogOut = async () => {
    await logout();
    setCurrentUser(null);
    navigate("/login");
  };
  return (
    <main className="w-full h-screen flex flex-col md:flex-row">
      <Navbar handleLogOut={handleLogOut}/>
      <aside className="h-screen bg-gray-300 overflow-x-auto scroll-bar ">
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
      <section>

      </section>
    </main>
  );
}
export default Home;
