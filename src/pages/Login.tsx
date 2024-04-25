import { Navigate, useNavigate } from "react-router-dom"
import loginGoogle from "../db/services/loginGoogle"
import useUser from "../providers/useUser"

function Login() {

    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {currentUser,setCurrentUser}  = useUser()
    console.log(currentUser)
    if(currentUser){
        return <Navigate to="/" replace/>
    }
    const loginWithGoogle = async()=>{
        try {
             const user = await loginGoogle()
             setCurrentUser(user)
             navigate('/');
        } catch (error) {
            console.log('error')
        }
    }
    return(
        <main>
            <h1>Login</h1>
            <button className="p-2 bg-gray-500 rounded-md" onClick={loginWithGoogle}>Login Google</button>
        </main>
    )
}
export default Login