import { createContext, useContext, useEffect, useState } from "react";
import api from "./api";


const AuthContext = createContext();
export function AuthProvider({children}){
     const [user, setUser] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            
            api.get("auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
                localStorage.removeItem("token");
                setUser(null);

            });

        }
    }, []);

   

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () =>{

   const context =useContext(AuthContext); 
   if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
} 