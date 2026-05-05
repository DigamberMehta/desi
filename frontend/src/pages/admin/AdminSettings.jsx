import React, { useState, useEffect } from "react";
import { Save, Phone } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../hooks/use-toast";

const AdminSettings = ({ token }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    whatsappNumber: "",
    heroSlides: "[]",
    faqs: "[]",
    testimonials: "[]",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFormData({
            whatsappNumber: data.data.whatsappNumber || "",
            heroSlides: JSON.stringify(data.data.heroSlides || [], null, 2),
            faqs: JSON.stringify(data.data.faqs || [], null, 2),
            testimonials: JSON.stringify(data.data.testimonials || [], null, 2),
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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    let parsedHeroSlides = [];
    let parsedFaqs = [];
    let parsedTestimonials = [];

    try {
      parsedHeroSlides = JSON.parse(formData.heroSlides || "[]");
      parsedFaqs = JSON.parse(formData.faqs || "[]");
      parsedTestimonials = JSON.parse(formData.testimonials || "[]");
    } catch (err) {
      toast({
        title: "Invalid JSON format",
        description: err.message,
        variant: "destructive",
      });
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          whatsappNumber: formData.whatsappNumber,
          heroSlides: parsedHeroSlides,
          faqs: parsedFaqs,
          testimonials: parsedTestimonials,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Settings Saved",
          description:
            "Settings and mock data replaced in DB and updated successfully.",
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

          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Hero Slides (JSON)
            </Label>
            <textarea
              name="heroSlides"
              rows={8}
              className="w-full p-3 font-mono text-sm border rounded"
              value={formData.heroSlides}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">FAQs (JSON)</Label>
            <textarea
              name="faqs"
              rows={8}
              className="w-full p-3 font-mono text-sm border rounded"
              value={formData.faqs}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Testimonials (JSON)
            </Label>
            <textarea
              name="testimonials"
              rows={8}
              className="w-full p-3 font-mono text-sm border rounded"
              value={formData.testimonials}
              onChange={handleChange}
            />
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
