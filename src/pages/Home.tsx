import { Navigate, useNavigate } from "react-router-dom"
import logout from "../db/services/logout"
import useUser from "../providers/useUser"

function Home() {
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {currentUser,setCurrentUser}  = useUser()

    if(!currentUser)
        return <Navigate to="/login" replace/>
    
    const handleLogOut =async()=>{
        await logout()
        setCurrentUser(null)
        navigate('/login')
    }
    return(
        <main>
            <nav>
                <button className="p-2 bg-red-500 rounded-md" onClick={handleLogOut}>Logout</button>
            </nav>
        </main>
    )
}
export default Home