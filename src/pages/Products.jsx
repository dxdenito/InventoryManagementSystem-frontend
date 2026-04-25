import { useEffect, useState } from "react";
import AddProductForm from "../components/AddProductForm";
import ProductsTable from "../components/ProductsTable";
import api from "../api";

function Products() {
    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [shops, setShops] = useState([]);
    const [shopId, setShopId] = useState("");
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter]= useState("active");

    const handleClick = () => {
        setOpenModal(!openModal);
    };

    const fetchProducts = async () => {
        try {
            if (!shopId) return;

            const response = await api.get("/products/", {
                params: { shop_id: shopId, status: statusFilter }
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
    }, [shopId,statusFilter]);

    return (
        <>
            <div className="flex justify-between">
                <button
                    onClick={handleClick}
                    className="p-4 bg-blue-800 rounded cursor-pointer text-white"
                >
                    {openModal ? 'X' : 'Add Product'}
                </button>
                
                <div>
                    <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter} className="border p-2 mr-4">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="all">All</option>
                    </select>
                <select
                    onChange={(e) => setShopId(e.target.value)}
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

            {error && <p className="text-red-500">{error}</p>}

            <div className={openModal ? 'block' : 'hidden'}>
                <AddProductForm shopId={shopId} refreshProducts={fetchProducts} />
            </div>

            <div>
                <ProductsTable products={products} refreshProducts={fetchProducts}  />
            </div>
        </>
    );
}

export default Products;