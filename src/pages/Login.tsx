import { Navigate, useNavigate } from "react-router-dom"
import loginGoogle from "../db/services/loginGoogle"
import useUser from "../providers/useUser"
import { useEffect, useState } from "react"
import FormSignIn from "../components/login/FormSignIn"
import FormRegister from "../components/login/FormRegister"

function Login() {

    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {currentUser,setCurrentUser}  = useUser()
    if(currentUser){
        return <Navigate to="/" replace/>
    }

    const [isSignIn, setIsSignIn] = useState(true);
    const handleSignInDisplay = ()=> setIsSignIn(!isSignIn);
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
        <main className="w-full h-screen bg-[#dfe1e5]">
            <section className="w-full h-52 p-3 bg-[#00a884] relative flex justify-center items-center">
                <div className="w-72 md:w-[500px] bg-white  absolute top-1/3 p-3 rounded-lg flex flex-col justify-center items-center">
                    <h1 className="text-black text-2xl font-bold my-2">{isSignIn ? 'Sign In': 'Register'}</h1>
                    
                    <div className="w-28 h-28 rounded-full bg-[#00a884] text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16">
                        <g fill="currentColor">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26l.001.002l4.995 3.178l1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215l7.494-7.494l1.178-.471z" />
                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95l-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686" />
                        </g>
                    </svg>
                    </div>
                    <button className="m-2 p-2 w-full  bg-[#dfe1e5] rounded-md flex justify-center gap-x-2" onClick={loginWithGoogle}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        {isSignIn ? 'Sign In': 'Register'} with Google
                    </button>
                    
                    <button className="w-full my-2 p-2 bg-[#008069] rounded-lg font-bold text-white hover:bg-black" onClick={handleSignInDisplay}>{isSignIn ? 'Create an Account': 'Sign In'}</button>
                    
                    <div className="flex items-center">
                        <div className="border w-24 md:w-44 h-0"></div>
                        <span className="mx-2">Or</span>
                        <div className="border w-24 md:w-44 h-0"></div>
                    </div>

                    {
                        isSignIn ? <FormSignIn/> : <FormRegister/>
                    }
                    

                </div>
            </section>
        </main>
    )
}
export default Login