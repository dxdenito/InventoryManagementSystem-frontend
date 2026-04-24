import { links } from "./link";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({isOpen, setIsOpen}) => {
    
   

    const style= `flex items-center  gap-2 w-full mt-2 px-3 py-2  border-b border-slate-400 text-white hover:bg-gray-700 hover:px-5 cursor-pointer`
    
    return(
        <>
            {isOpen &&(
                <div className="fixed lg:hidden inset-0 bg-black opacity-50 z-10" onClick={()=>setIsOpen(false)}></div>
            )}
            <aside className={`fixed top-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0':'-translate-x-full'} md:translate-x-0 md:static md:block`}>
                <div className="h-screen bg-slate-900 text-white p-6">
                    <div className="border-b border-slate-700 pb-4">
                        <h1 className=" text-bold  text-xl">Inventory Management System</h1>
                    </div>
                    
                    <div className="bg-gray-800  rounded-lg">
                        
                            {links.map(link=>
                                
                                    <NavLink className={style} key={link.id} to={link.link} end onClick={()=>setIsOpen(false)} >
                                        <i className={link.icon}></i> {link.title}
                                    </NavLink>
                               
                            )}
                        
                    </div>

                    <div className="fixed bottom-0 pb-2 border-t border-slate-400">
                        Developed by Denis &copy; 2026
                    </div>
                </div>
             </aside>
        </>

    )
}
export default Sidebar;