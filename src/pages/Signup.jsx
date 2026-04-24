import api from "../api";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shopName, setShopName] = useState("");
    const [step,setStep] = useState(1);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    

    const handleSignup = async (e) => {
        e.preventDefault();
        if (username.trim() === "" || email.trim() === "" || password.trim() === "" || shopName.trim() === "" || description.trim() === "" || location.trim() === "") {
            setError("Please fill in all fields");
            return;
        }
        const user = {
            username: username,
            email: email,
            password: password,
            shopName: shopName,
            description: description,
            location: location
        }
       
        const res = await api.post("/auth/register", user)
        if (!res.ok) {
            setError("Signup failed. Please try again.");
        } 
        navigate("/login");
        
    }
    return (
        <>
        <div className="h-screen w-full flex">
            <div className="bg-zinc-900 h-screen w-1/2 hidden md:flex items-center justify-center p-6 font-sans">
                <div className="text-white text-center">
                    <i className="bx bx-group text-7xl"></i>
                    <h2 className="text-3xl px-6 ">Hello there, Glad to see you!</h2>
                    <p className="text-sm px-6">Sign up to get started</p>
                </div>

            </div>
            <div className="bg-white h-screen w-full md:w-1/2 flex md:items-center justify-center p-6 font-sans">
                <div className="w-full">
                     <div className=" mt-20 md:mt-0">
                            <h2 className="font-bold text-xl text-left mb-5 ">INVENTORY MANAGEMENT SYSTEM</h2>
                        </div>
                    <div className="flex items-center justify-center">
                        {step === 1 && (
                        <div className="text-center">
                        <i className="bx bx-user-plus text-5xl text-indigo-900"></i>
                        
                        <h2 className="text-2xl font-bold text-indigo-900">Create an Account</h2>
                        </div>
                        )}
                         {step === 2 && (
                        <div className="text-center">
                        <i className="bx bx-store text-5xl text-indigo-900"></i>
                        
                        <h2 className="text-2xl font-bold text-indigo-900">Create Shop</h2>
                        </div>
                        )}
                    </div>
                    <p className="text-red-500">{error}</p>
                    <form onSubmit={handleSignup}>

                        {step === 1 &&(
                            <>
                        <div className="space-y-2 w-[90%] ml-5">
                            <label  className="text-sm font-medium leading-none text-indigo-900">
                                Username
                                <input
                                
                                className="flex h-10 w-full  rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                             placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                            "
                                 value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username" required />
                            </label>
                        </div>
                        <div className="space-y-2 w-[90%] ml-5">
                            <label className="text-sm font-medium leading-none text-indigo-900">
                                Email
                                <input
                                className="flex h-10 w-full  rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                             placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                            "
                                 value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="user@email.com" required/>  
                            </label>
                        </div>
                        <div  className="space-y-2 w-[90%] ml-5">
                            <label  className="text-sm font-medium leading-none text-indigo-900">
                                Password
                                <input
                                className="flex h-10 w-full  rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                             placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                            "
                                 value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" required />
                            </label>
                        </div>
                        <button type="button" onClick={() => setStep(2)}>Next</button>
                        </>
                        )}
                        {step === 2 &&(
                            <>
                        <div  className="space-y-2 w-[90%] ml-5">
                            <label  className="text-sm font-medium leading-none text-indigo-900">
                                Shop Name
                                <input
                                className="flex h-10 w-full  rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                             placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                            "
                                 value={shopName} onChange={(e)=>setShopName(e.target.value)} type="text" placeholder="shop name" required />
                            </label>
                        </div>
                        <div  className="space-y-2 w-[90%] ml-5">
                            <label  className="text-sm font-medium leading-none text-indigo-900">
                                Description
                                <input
                                className="flex h-10 w-full  rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                             placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                            "
                                 value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Description" required />
                            </label>
                        </div>
                        <div  className="space-y-2 w-[90%] ml-5">
                            <label  className="text-sm font-medium leading-none text-indigo-900">
                                Location
                                <input
                                className="flex h-10 w-full  rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                             placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                            "
                                 value={location} onChange={(e)=>setLocation(e.target.value)} type="text" placeholder="Location" required />
                            </label>
                        </div>                                                
                        <button type="button" onClick={() => setStep(1)}>Previous</button>
                        <button
                            type="submit"
                            className="flex h-10 w-[90%] ml-5 mt-4 items-center cursor-pointer justify-center rounded-md bg-indigo-600 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-indigo-400 transition-all"
                        >
                            Signup
                        </button>
                        </>
                        )}
                        <p className="text-center text-sm p-4 text-zinc-500">Have an account already? <NavLink className="font-medium text-indigo-700 hover:underline underline-offset-4" to="/login">Login</NavLink> </p>
                    </form>
                </div>
            </div>
        </div>
        
    </>
  );
}
export default Signup