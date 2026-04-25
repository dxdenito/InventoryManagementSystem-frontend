import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import api from "../api";
import HistoryModal from "../components/HistoryModal";

function Inventory(){
    const {user} = useAuth();
    const [error, setError] = useState("");
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState([]);
    const [shopId, setShopId] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState("add");

    const openModal = (product, actionType) => {
        setSelectedProduct(product);
        setType(actionType);
        setModalOpen(true);
    }
    const openHistory = (product) => {
        setSelectedProduct(product);
        setHistoryOpen(true);
    }

    const fetchProducts = async () => {
        try {
            if (!shopId) return;

            const response = await api.get("/products/", {
                params: { shop_id: shopId }
            });

            setProducts(response.data);
        } catch (error) {
            console.log("failed to fetch products", error);
        }
    };

    const fetchShops = async () => {
        try {
            const response = await api.get("/shops/");
            setShops(response.data);

            // 🔥 set default shop
            if (response.data.length > 0) {
                setShopId(response.data[0].id);
            }

        } catch (error) {
            setError("Failed to fetch shops");
        }
    };


    // 🔥 load shops once
    useEffect(() => {
        fetchShops();
    }, []);

    // 🔥 fetch products when shop changes
    useEffect(() => {
        fetchProducts();
    }, [shopId]);

    const addStock = async(id)=>{
        const quantity = prompt("enter Quantity to add:");
        setError("");
        if (!quantity) return;
        try {
            await api.post("/inventory/add_inventory/", {product_id: id, quantity: parseInt(quantity)});
            fetchProducts();
        }
        catch(error){
            setError(error+"failed to add stock");
        }
    }
    const removeStock = async(id)=>{
        const quantity = prompt("enter Quantity to remove:");
        setError("");
        if (!quantity) return;
        try {
            await api.post("/inventory/remove_inventory/", {product_id: id, quantity: parseInt(quantity)});
            fetchProducts();
        }
        catch(error){
            setError(error+"failed to remove stock");
        }
    }

    return(
        <>
            <div className="flex">
                
                <div>
                    
                    <select
                        onChange={(e) => setShopId(Number(e.target.value))}
                        value={shopId}
                        className="border p-2"
                    >
                        {shops.map((shop) => (
                            <option key={shop.id} value={shop.id}>
                                {shop.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-4">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="text-left p-4 border-b border-gray-100 bg-blue-50">Product</th>
                            <th className="text-left p-4 border-b border-gray-100 bg-blue-50">Quantity</th>
                            
                            <th className="text-left p-4 border-b border-gray-100 bg-blue-50">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="p-4 border-b border-gray-100">{product.product_name}</td>
                                <td className="p-4 border-b border-gray-100">{product.quantity}</td>
                                
                                <td className="p-4 border-b border-gray-100">
                                    <button className="text-white bg-green-800 p-2 mr-2 rounded" onClick={() => addStock(product.id)}>
                                        Add
                                    </button>
                                    <button className="text-white bg-red-800 p-2 rounded" onClick={() => removeStock(product.id)}>
                                        Remove
                                    </button>
                                    <button className="text-white bg-blue-800 p-2 rounded" onClick={() => openHistory(product)}>
                                        History
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <HistoryModal isOpen={historyOpen} onClose={() => setHistoryOpen(false)} product={selectedProduct} />
            </div>
        </>
    )
}
export default Inventory;