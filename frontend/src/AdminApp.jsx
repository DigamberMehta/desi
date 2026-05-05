import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  LogOut,
  Settings,
  TicketPercent,
} from "lucide-react";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminCoupons from "./pages/admin/AdminCoupons";

const AdminApp = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<AdminLogin setToken={setToken} />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex bg-neutral-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 text-white flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-2xl font-black text-white">
            DESi<span className="text-[#E60012]">Admin</span>
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-300 hover:text-white"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-semibold">Dashboard</span>
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-300 hover:text-white"
          >
            <Package className="w-5 h-5" />
            <span className="font-semibold">Products</span>
          </Link>
          <Link
            to="/admin/coupons"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-300 hover:text-white"
          >
            <TicketPercent className="w-5 h-5" />
            <span className="font-semibold">Coupons</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-300 hover:text-white"
          >
            <Settings className="w-5 h-5" />
            <span className="font-semibold">Settings</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              setToken(null);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-[#E60012] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center px-8 shadow-sm">
          <h1 className="text-xl font-bold text-neutral-800">Control Panel</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<AdminDashboard token={token} />} />
            <Route
              path="/products"
              element={<AdminDashboard token={token} />}
            />
            <Route
              path="/products/new"
              element={<AdminProductForm token={token} />}
            />
            <Route
              path="/products/edit/:id"
              element={<AdminProductForm token={token} />}
            />
            <Route path="/coupons" element={<AdminCoupons token={token} />} />
            <Route path="/settings" element={<AdminSettings token={token} />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminApp;
