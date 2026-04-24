import { NavLink, useNavigate } from "react-router-dom";
import api from "../api";
import { useState } from "react";
import { useAuth } from "../AuthContext";






function Login(){
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    const handleLogin=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const user = {
            email: email,
            password: password
        }
        try{
            const res =await api.post("/auth/login", user)
            const token = res.data.access_token;
            if(!token){
                throw new Error("No token received");
            }

            localStorage.setItem("token", token)
            const userRes = await api.get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(userRes.data);
            navigate("/")
            
            
            
            
        } catch (err) {
            setError("Invalid email or password");
            
        }finally{
            setIsLoading(false);
        }
       
    }
    return(
        <>
        <div className="flex w-full h-screen">
            <div className="bg-zinc-900 h-screen w-1/2 hidden md:flex items-center justify-center p-6 font-sans">
                <div className="relative z-10 px-12 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 mb-4">
                    <span className="text-white font-bold text-xl">L</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-white ">Welcome Back</h2>
                <p className=" text-sm text-zinc-400 mt-2">Sign in to your account</p>
                </div>
            </div>
            
            <div className="bg-white h-screen w-full md:w-1/2 flex md:items-center justify-center p-6 font-sans">
            
                <div className="w-full max-w-sm space-y-8">
                    <div className=" mt-20 md:mt-0">
                        <h2 className="font-bold text-xl text-left mb-5 ">INVENTORY MANAGEMENT SYSTEM</h2>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                        <i className="bx bx-log-in text-5xl text-indigo-900"></i>
                        
                        <h2 className="text-2xl font-bold text-indigo-900">Login to your account</h2>
                        </div>
                    </div>
                    <form className=" mt-8 space-y-5" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label  className="text-sm font-medium leading-none text-indigo-900" >
                                    Email
                                    <input 
                                className="flex h-10 w-full  rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                                    "
                                    value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="user@email.com" />
                                </label>
                            </div>
                            <div className="space-y-2">
                                
                                <label  className="text-sm font-medium leading-none text-indigo-900" >
                                    Password
                                    <input
                                    className="flex h-10 w-full  rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                                    "
                                    value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" />
                                </label>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium leading-none text-zinc-500 hover:text-white transition-colors cursor-pointer" >
                                        Forgot Password?
                                    </label>
                                </div>
                            </div>
                            <p className="text-red-500 text-sm">{error}</p>
                            
                            <button type="submit"
                            className="flex h-10 w-[90%] ml-5 mt-4 items-center cursor-pointer justify-center rounded-md bg-indigo-600 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-indigo-400 transition-all"
                            disabled={isLoading}
                            >Login</button>

                            <p className="text-center text-sm text-zinc-500" >
                                Don't have an account? <NavLink to="/register" className="font-medium text-indigo-700 hover:underline underline-offset-4">Signup</NavLink> </p>
                        </div>
            
                    </form>
                </div>
            </div>

        </div>
        
       
        </>
    )
}
export default Login