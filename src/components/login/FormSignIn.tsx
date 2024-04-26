import { useNavigate } from "react-router-dom";
import useUser from "../../providers/useUser";
import loginWithEmailPassword from "../../db/services/loginEmailAndPassword";
import { FormEvent,Dispatch, SetStateAction } from "react";
type FormSignInProps = {
    setError: Dispatch<SetStateAction<boolean>>,
    setMessageError: Dispatch<SetStateAction<string>>
}
function FormSignIn({setError,setMessageError}:FormSignInProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {setCurrentUser}  = useUser()
    const navigate = useNavigate()
    
    const handleSignIn = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const email = form.get('email') as string
        const password = form.get('password') as string
        try {
            const user = await loginWithEmailPassword(email,password);
            if(user){
                setCurrentUser(user)
                navigate('/')
            }else{
                setError(true)
                setMessageError('Check your user and password')
            }
        } catch (error) {
            setError(true)
            setMessageError('Check your user and password')
        }

        
    }
  return (
    <form onSubmit={handleSignIn} className="w-full p-2 flex flex-col gapy-4 ">
      <label htmlFor="email">Email</label>
      <input
        className="h-8 px-4 border border-[#dfe1e5] bg-[#ECE5DD] rounded-3xl"
        type="email"
        id="email"
        name="email"
        placeholder="Write your email"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        className="h-8 px-4 border border-[#dfe1e5] bg-[#ECE5DD] rounded-3xl"
        type="password"
        name="password"
        id="password"
        required
      />

      <button type="submit" className="w-full my-2 p-2 bg-[#008069] rounded-lg font-bold text-white hover:bg-black">
        Sign In
      </button>
    </form>
  );
}
export default FormSignIn;
