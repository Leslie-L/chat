import { useNavigate } from "react-router-dom";
import registerUser from "../../db/services/registerEmailAndPassword";
import useUser from "../../providers/useUser";
import { ChangeEvent, FormEvent, useState } from "react";
import {Dispatch, SetStateAction } from "react";
type FormSignInProps = {
    setError: Dispatch<SetStateAction<boolean>>,
    setMessageError: Dispatch<SetStateAction<string>>
}
function FormRegister({setError,setMessageError}:FormSignInProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {setCurrentUser}  = useUser()
    const navigate = useNavigate()
    const [controlPassword, setControlPassword]=useState("")
    const [controlPassword2, setControlPassword2]=useState("")
    const [passwordMessage, setPasswordMessage]= useState("")
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value= e.target.value;
        setControlPassword(value);
        if(controlPassword.length > 7) {
            setPasswordMessage('')
        }
        if (controlPassword2.length>0) {
            if (controlPassword2 !== value) {
                setPasswordMessage('Passwords do not match')
            }
        }
                
    }
    const handleInputChange2 = (e:ChangeEvent<HTMLInputElement>)=>{
        const value= e.target.value;
        setControlPassword2(value);
        
            if (controlPassword !== value) {
                setPasswordMessage('Passwords do not match')
            }else if(controlPassword.length <=7) {
                setPasswordMessage('The password need at least 8 characters')
            }else{
                setPasswordMessage('')
            }
        
    }
    const handleRegister = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const email = form.get('email') as string
        const password = form.get('password') as string
        const password2 = form.get('password2') as string
        console.log(email,password)
        if(password===password2){
            try {
                const user = await registerUser(email,password);
                setCurrentUser(user)
                navigate('/')
            } catch (error) {
                setError(true)
                setMessageError('Check your email and password')
            }
            
        }
        
    }
  return (
    <form onSubmit={handleRegister}  className="w-full p-2 flex flex-col gapy-4 ">
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
        autoComplete="on"
        value={controlPassword}
        onChange={handleInputChange}
        id="password"
        required
      />

      <label htmlFor="password2">Confirm Password</label>
      <input
        className="h-8 px-4 border border-[#dfe1e5] bg-[#ECE5DD] rounded-3xl"
        type="password"
        name="password2"
        value={controlPassword2}
        onChange={handleInputChange2}
        autoComplete="on"
        id="password2"
        required
      />
      <span className="text-red-400">{passwordMessage}</span>
      <button type="submit" className="w-full my-2 p-2 bg-[#008069] rounded-lg font-bold text-white hover:bg-black">
        Register
      </button>
    </form>
  );
}
export default FormRegister;
