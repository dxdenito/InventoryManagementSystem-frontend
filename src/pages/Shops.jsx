import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import api from "../api";

function Shops() {
  const { user } = useAuth();

  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [openModal,setOpenModal] =useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [statusFilter, setStatusFilter]= useState("active");

  const fetchShops = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get("/shops/",{
        params:{
          status: statusFilter
        }
      }); 

      setShops(res.data);
      

    } catch (err) {
      const message =
        err.response?.data?.detail || "Failed to fetch shops";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

 
  useEffect(() => {
    if (user) {
      fetchShops();
    }
  }, [user, statusFilter]);
 
  const handleAddShop = async(e)=>{
    e.preventDefault();
    setSuccessMessage("");
    try{
      setError(null);
      const shop={
        name: shopName,
        description:description,
        location: location
      } 
      const res = await api.post("/shops/create_shop",shop)
      setShopName("")
      setSuccessMessage("Shop Added Successfully")
      setOpenModal(false)
      fetchShops();
    }catch(error){
      setError("Failed to Add Shop")
    }
  }
  const handleDeactivateShop = async(id,status)=>{
    try{
      setError(null);
      if(status === true){
        await api.put(`/shops/delete/${id}`);
      setShops((prev)=>prev.filter((shop)=>shop.id !== id));
      
      }else{
      await api.put(`/shops/activate_shop/${id}`);
      setShops((prev)=>prev.map((shop)=>shop.id === id ? {...shop, status: true} : shop));
      fetchShops()
      setSuccessMessage("Shop Activated Successfully")
      setStatusFilter("active")
      }
      
    }catch(err){
      setError("Failed to Deactivate Shop")
    }

  }
  const handleEditShop =async()=>{

  }


  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold">Shops</h2>

      <div>
        <div className="flex justify-between">
        <button onClick={()=>setOpenModal(!openModal)} className='  bg-indigo-900 text-white p-2 rounded '>
         <i className={`bx ${openModal? 'bx-x':'bx-plus' }`}></i> {openModal ? `Close` :`Add Shop` }
        </button>
        <select className="border border-bold border-indigo-900" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="all">All</option>
        </select>
        </div>
        <div>
         {error && <p className="text-red-500">{error}</p>}
         {successMessage && <p className="text-green-500">{successMessage}</p>}
        <form onSubmit={handleAddShop} className={` mt-5 ${openModal ? 'block':'hidden'}`}>
          
            <div className=" block md:flex md:gap-3">
              <label>
                ShopName
                <input
                
                className="flex h-10  rounded-md border-indigo-800 bg-indigo-50 md:px-3 text-sm text-indigo-900
                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                    "
                 onChange={(e)=>setShopName(e.target.value)} value={shopName} placeholder="Shop Name" />
              
              </label>
              <label>
                Description
                <input
                
                className="flex h-10  rounded-md border-indigo-800 bg-indigo-50 md:px-3 text-sm text-indigo-900
                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                    "
                 onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Description" />
              
              </label>
              <label>
                Location
                <input
                
                className="flex h-10  rounded-md border-indigo-800 bg-indigo-50 md:px-3 text-sm text-indigo-900
                    placeholder:text-indigo-300 focus:outline-none focus:ring-indigo-400 transition-all
                    "
                 onChange={(e)=>setLocation(e.target.value)} value={location} placeholder="Location" />
              
              </label>
              <button type="submit" className="bg-indigo-900 mt-5 md:mt-0 text-white p-2 rounded">
                <i className="bx bx-plus"></i> Add Shop
              </button>
            </div>
        </form>
        </div>
      </div>

      <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        

        {isLoading && <p>Loading shops...</p>}

        {!isLoading && shops.length === 0 && (
          <p>No shops found</p>
        )}

        {shops.map((shop) => (
          <div key={shop.id} className=" p-4 rounded bg-gray-100">
            <i className="bx bx-store text-4xl text-center text-indigo-600"></i>
            
            <h3 className="text-3xl font-bold">{shop.name}</h3>
            <h2 className="text-gray-600">{shop.description}</h2>
            <p className="text-gray-500">{shop.location}</p>
            <div className="flex justify-between">
              <button onClick={()=>handleDeactivateShop(shop.id,shop.status)} className={`bg-${shop.status ?'red':'green'}-500 p-2 rounded hover:bg-${shop.status ? 'red' : 'green'}-600 text-white cursor-pointer `}>
                <i className={`bx ${shop.status ? 'bx-trash' : 'bx-plus'}`}></i> {shop.status ? "De-Activate" : "Activate"}
              </button>
              <button className="bg-blue-500 p-2 rounded hover:bg-blue-600 text-white cursor-pointer ">
                <i className=" bx bx-pencil"></i> Edit 
              </button>
              <button className="bg-indigo-500 rounded p-2 hover:bg-indigo-600 text-white cursor-pointer ">
                <i className=" bx bx-cog"></i> Manage 
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shops;