import { useEffect, useState } from "react";
import api from "../api";

function Reports() {
  const [activeTab, setActiveTab] = useState("stock");
  const [data, setData] = useState([]);
  const [shopId, setShopId] = useState("");

  const fetchData = async () => {
    let endpoint = `/reports/${activeTab}`;

    const res = await api.get(endpoint, {
      params: shopId? { shop_id: shopId }:{}
    });

    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, shopId]);

  return (
    <div className="space-y-6">

      {/* Tabs */}
      <div className="flex gap-3">
        {["stock", "low-stock", "movements"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="text-gray-500 border-b">
            <tr>
              {activeTab !== "movements" && <th className="p-2">Product</th>}
              <th className="p-2">Quantity</th>

              {activeTab === "movements" && (
                <>
                  <th className="p-2">Type</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Shop</th>
                  <th className="p-2">Date</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">

                {row.product && <td className="p-2">{row.product}</td>}

                <td className={`p-2 ${
                  row.quantity <= 5 ? "text-red-600 font-bold" : ""
                }`}>
                  {row.quantity}
                </td>

                {activeTab === "movements" && (
                  <>
                    <td className="p-2">{row.type}</td>
                    <td className="p-2">{row.user}</td>
                    <td className="p-2">{row.shop}</td>
                    <td className="p-2">
                      {new Date(row.date).toLocaleString()}
                    </td>
                  </>
                )}

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Reports;