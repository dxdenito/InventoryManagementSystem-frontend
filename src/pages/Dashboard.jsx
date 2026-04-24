import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard/analytics").then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-6">

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Card title="Products" value={data.total_products} />
        <Card title="Shops" value={data.total_shops} />
        <Card title="Total Stock" value={data.total_stock} />
        <Card title="Low Stock" value={data.low_stock} danger />

      </div>

      {/* 🔥 CHART SECTION */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-3">Stock by Shop</h3>

        {data.stock_by_shop.map((s, i) => (
          <div key={i} className="mb-2">
            <p className="text-sm">{s.shop}</p>
            <div className="bg-gray-200 h-3 rounded">
              <div
                className="bg-indigo-600 h-3 rounded"
                style={{ width: `${s.stock}px` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 RECENT ACTIVITY */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-3">Recent Activity</h3>

        {data.recent_activity.map(a => (
          <div key={a.id} className="flex justify-between border-b py-2 text-sm">
            <span className={a.quantity > 0 ? "text-green-600" : "text-red-600"}>
              {a.quantity > 0 ? `+${a.quantity}` : a.quantity}
            </span>
            <span>{a.type}</span>
            <span>{new Date(a.date).toLocaleString()}</span>
          </div>
        ))}
      </div>

    </div>
  );
}


function Card({ title, value, danger }) {
  return (
    <div className={`p-4 rounded-xl shadow ${danger ? "bg-red-100" : "bg-white"}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

export default Dashboard;