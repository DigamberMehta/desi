import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";

const AdminDashboard = ({ token }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error deleting product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-neutral-800">
          Products ({products.length})
        </h2>
        <Button
          onClick={() => navigate("/admin/products/new")}
          className="bg-[#E60012] hover:bg-[#b8000e] text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="p-4 font-semibold text-neutral-600">Product</th>
              <th className="p-4 font-semibold text-neutral-600">Category</th>
              <th className="p-4 font-semibold text-neutral-600">
                Price (AED)
              </th>
              <th className="p-4 font-semibold text-neutral-600">Stock</th>
              <th className="p-4 font-semibold text-neutral-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-neutral-500">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-neutral-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-neutral-50/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name?.en}
                        className="w-10 h-10 rounded-md object-contain bg-white border border-neutral-100"
                      />
                      <div>
                        <div className="font-semibold text-neutral-900">
                          {p.name?.en}
                        </div>
                        <div className="text-xs text-neutral-500">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-600 capitalize">
                    {p.category?.replace("-", " ")}
                  </td>
                  <td className="p-4 text-neutral-600">
                    AED {p.priceAED}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${p.stock > 10 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                    >
                      {p.stock} in stock
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                      className="p-2 text-neutral-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="p-2 text-neutral-400 hover:text-[#E60012] transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
