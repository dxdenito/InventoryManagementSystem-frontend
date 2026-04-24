
import { useState } from "react";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "shop", label: "Shop" },
    { id: "preferences", label: "Preferences" },
  ];

  return (
    <div className="block md:flex md:gap-6">

      {/* Sidebar */}
      <div className="md:w-1/4 bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>

        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex md:block p-2 rounded cursor-pointer mb-2 ${
              activeTab === tab.id
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-6">

        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">Profile</h3>

            <input className="input" placeholder="Username" />
            <input className="input mt-3" placeholder="Email" />

            <button className="btn-primary mt-4">Save Changes</button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">Change Password</h3>

            <input type="password" className="input" placeholder="New Password" />
            <button className="btn-primary mt-4">Update Password</button>
          </div>
        )}

        {activeTab === "shop" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">Shop Settings</h3>

            <input className="input" placeholder="Shop Name" />
            <input className="input mt-3" placeholder="Location" />

            <button className="btn-primary mt-4">Save</button>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">Preferences</h3>

            <label className="flex items-center justify-between">
              <span>Low Stock Threshold</span>
              <input type="number" className="input w-20" />
            </label>
          </div>
        )}

      </div>
    </div>
  );
}

export default Settings;
