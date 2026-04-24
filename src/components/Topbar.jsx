const Topbar = ({setIsOpen}) => {
     return (
        <>
        <div className=" bg-white shadow p-4 flex justify-between items-center">
            <button  className="md:hidden text-2xl" onClick={()=>setIsOpen(true)}><i className="bx bx-menu"></i></button>
            <h2 className="text-xl font-semibold">Dashboard</h2>

            <div className="flex items-center gap-4">
                
                <i className="bx bx-bell text-xl cursor-pointer hover:text-blue-600"></i>
                <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                    <i className="bx bx-user-circle text-2xl  "></i>
                    <span>Admin</span>
                </div>
            </div>
        </div>
        </>
    );
}
export default Topbar  ;