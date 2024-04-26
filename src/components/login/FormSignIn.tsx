function FormSignIn() {
    return(
        <form className="w-full p-2 flex flex-col gapy-4 ">
                        <label htmlFor="email">Email</label>
                        <input className="h-8 px-4 border border-[#dfe1e5] bg-[#ECE5DD] rounded-3xl" type="email" id="email" name="email" placeholder="Write your email" required/>

                        <label htmlFor="password">Password</label>
                        <input className="h-8 px-4 border border-[#dfe1e5] bg-[#ECE5DD] rounded-3xl" type="password" name="password" id="password" required/>
                        
                        <button className="w-full my-2 p-2 bg-[#008069] rounded-lg font-bold text-white hover:bg-black">Sign In</button>

        </form>
    )   
}
export default FormSignIn