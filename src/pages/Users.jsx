import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import api from "../api";

function Users(){
    const [openModal,setOpenModal] =useState(false);
    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [shopId, setShopId]= useState("");
    const [role, setRole]= useState("");
    const [shops, setShops]= useState([]);
    const [error, setError]= useState("");
    const [employees, setEmployees]= useState([]);
    const [loading, setLoading]= useState(false);
    const [statusFilter, setStatusFilter]= useState("active");

    const { user } = useAuth();
    const fetchEmployees = async()=>{
        setLoading(true);
        try {
            const response = await api.get('/employees/', {
                params:{
                    status: statusFilter
                },
               
            });
            setEmployees(response.data);
        } catch (error) {
            setError(error.response?.data?.detail || 'An error occurred while fetching employees');
        } finally {
            setLoading(false);
        }
    };

    const fetchShops = async()=>{
        try {
            const response = await api.get('/shops/', {
                
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setShops(response.data);
        } catch (error) {
            console.error('Error fetching shops:', error);
        }
    };
    useEffect(()=>{
        fetchShops();
        fetchEmployees();
    },[user, statusFilter]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            setError("");
            await api.post('/employees/create-employee',{
                username:name,
                email:email,
                password:password,
                shop_id: shopId,
                role:role
            });
            setName("");
            setEmail("");
            setPassword("");
            setShopId("");
            setRole("");
            setError("");
            setOpenModal(false);
        }catch(error){
             setError(error.response?.data?.detail || 'An error occurred while creating employee');
        }
    }
    const handleStatus =  (employeeId, isActive)=>{
        if(isActive){
            handleDeactivate(employeeId);
        }else{
            handleActivate(employeeId);
        }
    };

    const handleDeactivate = async(employeeId)=>{
        
        try {
            await api.put(`/employees/deactivate/${employeeId}`, {}, {
                
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchEmployees();
        } catch (error) {
            setError(error.response?.data?.detail || 'An error occurred while deactivating employee');
        }
    };
    const handleActivate = async(employeeId)=>{
        try {
            await api.put(`/employees/activate/${employeeId}`, {}, {
                
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchEmployees();
        } catch (error) {
            setError(error.response?.data?.detail || 'An error occurred while activating employee');
        }
    };


    return(
        <>
        <div className="flex justify-between">
            <button onClick={()=>setOpenModal(!openModal)} className="bg-indigo-900 p-2 rounded text-white">
                <i className={`bx ${openModal? 'bx-x':'bx-plus' }`}></i> {openModal ? `Close` :`Add Employee` }
            </button>
            <select className="border border-bold border-indigo-900" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="all">All</option>
            </select>
        </div>
        <div>
            <form onSubmit={handleSubmit} className={` mt-5 ${openModal ? 'block':'hidden'}`}>
                <div className=" block md:flex md:gap-3">
                <div>
                    <label >
                        Full Name
                        <input
                        className="flex h-10  rounded-md border-indigo-800 bg-indigo-50 md:px-3 text-sm text-indigo-900
                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                    "
                    value={name} onChange={(e)=>setName(e.target.value)}type="text" />
                    </label>
                </div>
                <div>
                    <label >
                        Email
                        <input
                        className="flex h-10  rounded-md border-indigo-800 bg-indigo-50 md:px-3 text-sm text-indigo-900
                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                    "
                    value={email} onChange={(e)=>setEmail(e.target.value)}
                         type="email" />
                    </label>
                </div>
                <div>
                    <label >
                        Password
                        <input
                        className="flex h-10  rounded-md border-indigo-800 bg-indigo-50 md:px-3 text-sm text-indigo-900
                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                    "
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                         type="password" />
                    </label>
                </div>
                <div>
                    <label >
                        Assign Role
                        <select
                        className="flex h-10 w-full  rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                    "
                    value={role} onChange={(e)=>setRole(e.target.value)}
                         >
                            <option value="admin">Admin</option>
                            <option value="sales">Sales</option>
                            <option value="store">Store</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label >
                        Assign Shop
                        <select
                        className="flex h-10 w-full rounded-md border-indigo-800 bg-indigo-50 px-3 text-sm text-indigo-900
                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                    "
                    value={shopId} onChange={(e)=>setShopId(e.target.value)}
                         >
                            <option value="">Select Shop</option>
                            {shops.map((shop)=>(
                                <option key={shop.id} value={shop.id}>{shop.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit" className="bg-indigo-900 mt-5 md:mt-0 text-white p-2 rounded">
                <i className="bx bx-plus"></i> Add Employee
              </button>
              </div>
            </form>
        </div>
        <div>
            <h1>Users</h1>
            {error && <p className="text-red-500">{error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                <p>Loading employees...</p>
            ) : (
                 employees.length > 0 ? (
                employees.map((employee) => (
                    <div className="flex bg-gray-100 p-4 rounded-lg">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-300 mr-4">
                        <i className="bx bx-user text-indigo-700 text-2xl"></i>
                    </div>
                    <div className="flex flex-col justify-center ">
                        <h2 className="text-lg font-semibold">{employee.username}</h2>
                        <p className="text-gray-600">{employee.email}</p>
                        <p className="text-gray-500">{employee.shop_id}</p>
                        <div className="flex justify-between">
                            <button  onClick={()=>handleStatus(employee.id, employee.is_active)} className={`${employee.is_active ? 'bg-red-500' : 'bg-green-500'} text-white px-3 py-1 rounded cursor-pointer`}>
                                <i className="bx bx-trash"></i>
                            </button>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
                                <i className="bx bx-edit"></i>
                            </button>
                            <button className="bg-indigo-500 text-white px-3 py-1 rounded cursor-pointer">
                                <i className="bx bx-cog"></i>
                            </button>
                        </div>
                        
                    </div>

                </div>
                ))) : (
                    <p>No employees found.</p>
                )
            )}
                
                
                
                
            </div>
        </div>
        </>
    )
}
export default Users;