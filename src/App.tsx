import { BrowserRouter,Route, Routes } from "react-router-dom" 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./db/credentials";
import Home from './pages/Home'
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import useUser from "./providers/useUser"
import { useEffect } from "react"


function App() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const {currentUser,setCurrentUser}  = useUser()

  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
      if(user){
        setCurrentUser(user)
      }else{
        console.log(currentUser)
      }
    })
  },[])
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
