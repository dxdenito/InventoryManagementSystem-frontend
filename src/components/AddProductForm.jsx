import { useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";

function AddProductForm({ shopId, refreshProducts, closeModal }) {
  const { user } = useAuth();

  const [product_name, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    // 🛑 Basic validation
    if (!product_name || !sku || !price) {
      setError("All fields are required");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        product_name,
        sku,
        shop_id: shopId, 
        price: Number(price),
      };

      // 🔥 Only owner/admin can choose shop
      if (["owner", "admin"].includes(user.role)) {
        payload.shop_id = shopId;
      }

      await api.post("/products/", payload);

      // ✅ Reset form
      setProductName("");
      setSku("");
      setPrice("");

      // ✅ Refresh list
      if (refreshProducts) refreshProducts();

      // ✅ Close modal (optional)
      if (closeModal) closeModal();

    } catch (err) {
      console.log(err);
      setError("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          placeholder="Product Name"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;