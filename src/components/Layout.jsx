import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import { useState } from "react";

function Layout(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>        
         
        <div className="flex  w-full">

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
            
            <div className="w-full ">
                <Topbar setIsOpen={setIsOpen}/>
                <div className="p-6">
                    <Outlet/>
                </div>
                
            </div>
        </div>            
        </>
    )
}
export default Layout;