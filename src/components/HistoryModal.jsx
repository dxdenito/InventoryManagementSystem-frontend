import { useEffect, useState } from "react"
import api from "../api"
function HistoryModal({isOpen, onClose, product}){
    const [history, setHistory]= useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(!product || !isOpen) return;
        const fetchHistory = async()=>{
            setLoading(true);
            setError(null);
            try{
                const res = await api.get(`/inventory/history/${product.id}`);
                setHistory(res.data);

            }catch(err){
                setError("Failed to fetch history");
            }finally{
                setLoading(false);
            }
        };
        fetchHistory();
    }, [product, isOpen]);
    if(!isOpen) return null;
    return(
        <>
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-[400px] max-h-[80vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-3">{product.product_name} - history</h2>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <ul>
                        {history.map((item) => (
                            <div key={item.id} className="border-b py-2 flex justify-between text-sm">
                                <span className={item.quantity >0 ? "text-green-600": "text-red-600"}>
                                    {item.quantity > 0 ? `+${item.quantity}` : item.quantity}
                                </span>
                                <span>{item.movement_type}</span>
                                <span className="text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
                               
                            </div>
                        ))}
                    </ul>
                )}
                <button onClick={onClose} className=" mt-4 bg-gray-600 text-white py-1 px-3 rounded">
                    Close
                </button>
            </div>
        </div>
        </>
    )
}
export default HistoryModal