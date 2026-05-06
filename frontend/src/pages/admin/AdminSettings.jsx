import React, { useState, useEffect } from "react";
import { Save, Phone, Plus, Trash2 } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../hooks/use-toast";
import { apiUrl } from "../../lib/api";

const AdminSettings = ({ token }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    whatsappNumber: "",
    bannerUrls: [""],
  });

  useEffect(() => {
    fetch(apiUrl("/api/settings"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          // Check for heroSlides first, fallback to bannerUrls, or default to empty
          let defaultBanners = [""];
          if (data.data.heroSlides && data.data.heroSlides.length > 0) {
            defaultBanners = data.data.heroSlides.map((s) => s.image || s);
          } else if (data.data.bannerUrls && data.data.bannerUrls.length > 0) {
            defaultBanners = data.data.bannerUrls;
          }

          setFormData({
            whatsappNumber: data.data.whatsappNumber || "",
            bannerUrls: defaultBanners,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching settings:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBannerUrlChange = (index, value) => {
    const newUrls = [...formData.bannerUrls];
    newUrls[index] = value;
    setFormData({ ...formData, bannerUrls: newUrls });
  };

  const addBannerUrl = () => {
    setFormData({ ...formData, bannerUrls: [...formData.bannerUrls, ""] });
  };

  const removeBannerUrl = (index) => {
    const newUrls = formData.bannerUrls.filter((_, i) => i !== index);
    setFormData({ ...formData, bannerUrls: newUrls.length ? newUrls : [""] });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(apiUrl("/api/settings"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          whatsappNumber: formData.whatsappNumber,
          bannerUrls: formData.bannerUrls.filter((url) => url.trim() !== ""),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Settings Saved",
          description: "Settings updated successfully.",
        });
      } else {
        throw new Error(data.message || "Failed to save settings");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-black text-neutral-900 mb-8">
        Store Settings & UI Data
      </h2>
      <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="whatsapp" className="text-base font-semibold">
              WhatsApp Number (For Orders)
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Phone className="w-5 h-5 text-neutral-400" />
              </div>
              <Input
                id="whatsapp"
                name="whatsappNumber"
                type="text"
                placeholder="+971500000000"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className="ps-10 font-mono text-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Banner URLs</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addBannerUrl}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Banner
              </Button>
            </div>
            {formData.bannerUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={url}
                  onChange={(e) => handleBannerUrlChange(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeBannerUrl(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="bg-[#E60012] hover:bg-[#b8000e] text-white gap-2 font-bold px-6"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
