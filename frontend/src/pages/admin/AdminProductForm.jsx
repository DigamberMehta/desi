import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

const AdminProductForm = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    slug: "",
    name: { en: "", ar: "" },
    priceAED: "",
    image: "",
    category: "smart-locks",
    stock: 0,
    isNew: false,
    isActive: true,
    featureHighlights: "[]",
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setFormData({
              ...data.data,
              featureHighlights: JSON.stringify(
                data.data.featureHighlights || [],
                null,
                2,
              ),
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const url = isEdit ? `/api/products/${id}` : "/api/products";
    const method = isEdit ? "PUT" : "POST";

    let parsedHighlights = [];
    try {
      parsedHighlights = JSON.parse(formData.featureHighlights || "[]");
    } catch (err) {
      alert("Invalid JSON format in Feature Highlights");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          featureHighlights: parsedHighlights,
        }),
      });

      const data = await res.json();
      if (data.success) {
        navigate("/admin/products");
      } else {
        alert(data.message || "Error saving product");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading product data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="p-2 hover:bg-neutral-200 rounded-full transition-colors text-neutral-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-neutral-800">
          {isEdit ? "Edit Product" : "Create New Product"}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-neutral-200 shadow-sm rounded-xl p-8 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">
              Slug (URL)
            </label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#E60012] focus:border-transparent outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#E60012] focus:border-transparent outline-none"
            >
              <option value="smart-locks">Smart Locks</option>
              <option value="alarm-security">Alarm & Security</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">
              Name (English)
            </label>
            <input
              name="name.en"
              value={formData.name?.en}
              onChange={handleChange}
              required
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#E60012] focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700 text-right block">
              الاسم (عربي)
            </label>
            <input
              name="name.ar"
              value={formData.name?.ar}
              onChange={handleChange}
              required
              dir="rtl"
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#E60012] focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">
              Price (AED)
            </label>
            <input
              type="number"
              name="priceAED"
              value={formData.priceAED}
              onChange={handleChange}
              required
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#E60012] focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">
              Price (AED)
            </label>
            <input
              type="number"
              name="priceAED"
              value={formData.priceAED}
              onChange={handleChange}
              required
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#E60012] focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#E60012] focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700">
            Main Image URL
          </label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#E60012] focus:border-transparent outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700">
            Feature Highlights (JSON Array)
          </label>
          <textarea
            name="featureHighlights"
            rows={6}
            value={formData.featureHighlights}
            onChange={handleChange}
            className="w-full p-3 font-mono text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#E60012] focus:border-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isNew"
              checked={formData.isNew}
              onChange={handleChange}
              className="w-5 h-5 accent-[#E60012]"
            />
            <span className="font-medium text-neutral-700">
              Mark as New Feature
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 accent-[#E60012]"
            />
            <span className="font-medium text-neutral-700">Active</span>
          </label>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#E60012] hover:bg-[#b8000e] text-white px-8 h-12 flex items-center gap-2 font-bold text-base"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
