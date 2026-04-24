import { useState } from "react";
import api from "../api"

function ProductsTable({products, refreshProducts,statusFilter}){
    const [status, setStatus] = useState("")
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    
    const handleDeactivateProduct = async(id,status)=>{
    try{
      setError(null);
      setSuccessMessage(null);
      if(status === true){
        await api.put(`/products/delete_product/${id}`);
        setSuccessMessage("Product Deleted Successfully")
        refreshProducts();
      }else{
        await api.put(`/products/activate_product/${id}`);
      
        refreshProducts()
        setSuccessMessage("Product Activated Successfully")
        
      }
      
    }catch(err){
      setError(err+"Failed to Deactivate Product")
    }

  }
    
    return(
        <>
        {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</p>}
        {successMessage && <p className="bg-green-100 text-green-700 p-2 rounded mb-4">{successMessage}</p>}
            <table className="w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl mt-4 p-4  bg-clip-border table-auto">
                <thead>
                    <tr>
                        <th className=" text-left p-4 border-b border-gray-100  bg-blue-50">Sku</th>
                        <th className=" text-left p-4 border-b border-gray-100  bg-blue-50">Product Name</th>
                        
                        <th className=" text-left p-4 border-b border-gray-100  bg-blue-50">Buying price</th>
                        <th className="text-left p-4 border-b border-gray-100  bg-blue-50">Quantity</th>
                        <th className=" text-left p-4 border-b border-gray-100  bg-blue-50"></th>
                    </tr>
                </thead>
                <tbody>
                    
                    {products.length===0?(<tr><td>No Products available ...</td></tr>):
                    products.map(product=>(
                        <tr key={product.id} className="hover:bg-gray-50 cursor-pointer">
                            <td className="p-4 border-b border-gray-50">{product.sku}</td>
                            <td className="p-4 border-b border-gray-50">{product.product_name}</td>
                            
                            <td className="p-4 border-b border-gray-50">{product.price}</td>
                            <td className="p-4 border-b border-gray-50">{product.quantity}</td>
                            <td  className="p-4 border-b border-gray-50">
                                <i className="bx bx-pencil cursor-pointer"></i>
                                <i onClick={()=>handleDeactivateProduct(product.id,product.is_active)} className={`bx ${product.is_active ? "bx-trash text-red-500" :"bx-plus text-green-500"} cursor-pointer`}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default ProductsTable