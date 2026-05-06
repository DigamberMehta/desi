import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { apiUrl } from "../../lib/api";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "smart-locks", label: "Smart Locks" },
  { key: "accessories", label: "Accessories" },
];

const AdminDashboard = ({ token }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(apiUrl("/api/products"))
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const res = await fetch(apiUrl(`/api/products/${id}`), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setProducts((prev) => prev.filter((p) => p._id !== id));
    else alert(data.message);
  };

  const counts = useMemo(
    () => ({
      all: products.length,
      "smart-locks": products.filter((p) => p.category === "smart-locks")
        .length,
      "alarm-security": products.filter((p) => p.category === "alarm-security")
        .length,
      accessories: products.filter((p) => p.category === "accessories").length,
    }),
    [products],
  );

  const filtered = useMemo(() => {
    let list =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name?.en?.toLowerCase().includes(q) || p.slug?.includes(q),
      );
    }
    return list;
  }, [products, activeCategory, search]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-neutral-900">Products</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            {products.length} products in the database
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/products/new")}
          className="bg-[#E60012] hover:bg-[#c4000f] text-white h-9 px-4 flex items-center gap-2 text-sm font-bold rounded-lg"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Smart Locks",
            count: counts["smart-locks"],
            icon: "🔐",
            color: "bg-blue-50 border-blue-100",
          },
          {
            label: "Accessories",
            count: counts.accessories,
            icon: "🔩",
            color: "bg-purple-50 border-purple-100",
          },
          {
            label: "Low Stock (≤5)",
            count: products.filter((p) => p.stock <= 5).length,
            icon: "⚠️",
            color: "bg-red-50 border-red-100",
          },
        ].map((s) => (
          <div key={s.label} className={`border rounded-xl p-4 ${s.color}`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-3xl font-black text-neutral-900 leading-none">
              {s.count}
            </div>
            <div className="text-xs text-neutral-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter + Search Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex bg-neutral-100 rounded-lg p-1 gap-0.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeCategory === c.key
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {c.label}
              <span
                className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeCategory === c.key
                    ? "bg-neutral-100 text-neutral-600"
                    : "bg-neutral-200 text-neutral-400"
                }`}
              >
                {counts[c.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or slug…"
            className="pl-9 pr-4 py-2 text-sm border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#E60012]/20 focus:border-[#E60012] outline-none w-60 bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50/80">
              <th className="px-4 py-3 text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
                Product
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
                Category
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
                Price
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
                Stock
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
                Status
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold text-neutral-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-12 text-center text-neutral-400 text-sm"
                >
                  Loading products…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-12 text-center text-neutral-400 text-sm"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-neutral-50/60 transition-colors group"
                >
                  {/* Product */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border border-neutral-100 bg-neutral-50 overflow-hidden shrink-0">
                        <img
                          src={p.image}
                          alt={p.name?.en}
                          className="w-full h-full object-contain"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-neutral-900 leading-tight flex items-center gap-1.5 flex-wrap">
                          {p.name?.en}
                          {p.isNew && (
                            <span className="text-[9px] font-black uppercase tracking-wide bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded-full shrink-0">
                              NEW
                            </span>
                          )}
                          {p.badge && p.badge !== "NEW" && (
                            <span className="text-[9px] font-black uppercase bg-amber-50 text-amber-600 border border-amber-100 px-1.5 py-0.5 rounded-full shrink-0">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 truncate max-w-55">
                          {p.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-semibold px-2 py-1 rounded-full capitalize ${
                        p.category === "smart-locks"
                          ? "bg-blue-50 text-blue-700"
                          : p.category === "accessories"
                            ? "bg-purple-50 text-purple-700"
                            : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {p.category?.replace(/-/g, " ")}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-sm font-semibold text-neutral-900">
                    AED {p.priceAED?.toLocaleString()}
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
                        p.stock === 0
                          ? "bg-red-50 text-red-600"
                          : p.stock <= 5
                            ? "bg-orange-50 text-orange-600"
                            : "bg-green-50 text-green-700"
                      }`}
                    >
                      {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
                        p.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() =>
                          navigate(`/admin/products/edit/${p._id}`)
                        }
                        className="p-2 rounded-lg text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.name?.en)}
                        className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
