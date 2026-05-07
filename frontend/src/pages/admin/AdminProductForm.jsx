import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Save, Plus, Trash2, Eye } from "lucide-react";
import { apiUrl } from "../../lib/api";
import CloudinaryUpload from "../../components/CloudinaryUpload";

// ── Reusable components ───────────────────────────────────────────────────────
const Section = ({ title, subtitle, children }) => (
  <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
    <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/60">
      <h3 className="font-bold text-neutral-800 text-xs uppercase tracking-wider">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>
      )}
    </div>
    <div className="p-6 space-y-5">{children}</div>
  </div>
);

const Field = ({ label, hint, dir, children }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <label
        className={`text-[11px] font-semibold text-neutral-500 uppercase tracking-wider ${dir === "rtl" ? "w-full text-right" : ""}`}
      >
        {label}
      </label>
      {hint && (
        <span className="text-[10px] text-neutral-400 font-mono">{hint}</span>
      )}
    </div>
    {children}
  </div>
);

const inputCls =
  "w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#E60012]/20 focus:border-[#E60012] outline-none transition-colors bg-white";

const SECTION_TYPES = [
  { value: "text-image", label: "Text Left / Image Right" },
  { value: "image-text", label: "Image Left / Text Right" },
  { value: "text-banner", label: "Text + Full-width Banner" },
  { value: "banner", label: "Full-width Banner Only" },
  { value: "dark-banner", label: "Dark Full-width Banner" },
];

const emptyQF = () => ({
  icon: "",
  label: { en: "", ar: "" },
  sub: { en: "", ar: "" },
});
const emptyBoxItem = () => ({ icon: "", name: { en: "", ar: "" } });
const emptySpecGroup = () => ({
  title: { en: "", ar: "" },
  items: [{ en: "", ar: "" }],
});
const emptySection = () => ({
  type: "text-image",
  tag: { en: "", ar: "" },
  heading: { en: "", ar: "" },
  text: { en: "", ar: "" },
  image: "",
  bullets: { en: [], ar: [] },
});

const AdminProductForm = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    slug: "",
    name: { en: "", ar: "" },
    description: { en: "", ar: "" },
    priceAED: "",
    badge: "",
    image: "",
    gallery: [],
    bullets: { en: [], ar: [] },
    category: "smart-locks",
    stock: 0,
    isNew: false,
    isActive: true,
    announcementBar: { en: "", ar: "" },
    quickFeatures: [],
    contentSections: [],
    specGroups: [],
    boxContents: [],
  });

  // ── Load existing product ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    fetch(apiUrl(`/api/products/${id}`))
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const p = data.data;
          setForm({
            slug: p.slug || "",
            name: p.name || { en: "", ar: "" },
            description: p.description || { en: "", ar: "" },
            priceAED: p.priceAED ?? "",
            badge: p.badge || "",
            image: p.image || "",
            gallery: p.gallery || [],
            bullets: { en: p.bullets?.en || [], ar: p.bullets?.ar || [] },
            category: p.category || "smart-locks",
            stock: p.stock ?? 0,
            isNew: p.isNew || false,
            isActive: p.isActive !== false,
            announcementBar: p.announcementBar || { en: "", ar: "" },
            quickFeatures: p.quickFeatures || [],
            contentSections: p.contentSections || [],
            specGroups: p.specGroups || [],
            boxContents: p.boxContents || [],
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, isEdit]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const setNested = (parent, child, value) =>
    setForm((f) => ({ ...f, [parent]: { ...f[parent], [child]: value } }));

  // Gallery
  const addGallery = () => set("gallery", [...form.gallery, ""]);
  const updateGallery = (i, v) =>
    set(
      "gallery",
      form.gallery.map((g, idx) => (idx === i ? v : g)),
    );
  const removeGallery = (i) =>
    set(
      "gallery",
      form.gallery.filter((_, idx) => idx !== i),
    );

  // Bullets
  const addBullet = () =>
    set("bullets", {
      en: [...form.bullets.en, ""],
      ar: [...form.bullets.ar, ""],
    });
  const updateBullet = (lang, i, v) =>
    set("bullets", {
      ...form.bullets,
      [lang]: form.bullets[lang].map((b, idx) => (idx === i ? v : b)),
    });
  const removeBullet = (i) =>
    set("bullets", {
      en: form.bullets.en.filter((_, idx) => idx !== i),
      ar: form.bullets.ar.filter((_, idx) => idx !== i),
    });

  // Quick Features
  const addQF = () => set("quickFeatures", [...form.quickFeatures, emptyQF()]);
  const removeQF = (i) =>
    set(
      "quickFeatures",
      form.quickFeatures.filter((_, idx) => idx !== i),
    );
  const updateQF = (i, path, val) =>
    set(
      "quickFeatures",
      form.quickFeatures.map((qf, idx) => {
        if (idx !== i) return qf;
        if (path.length === 1) return { ...qf, [path[0]]: val };
        return { ...qf, [path[0]]: { ...qf[path[0]], [path[1]]: val } };
      }),
    );

  // Box Contents
  const addBox = () =>
    set("boxContents", [...form.boxContents, emptyBoxItem()]);
  const removeBox = (i) =>
    set(
      "boxContents",
      form.boxContents.filter((_, idx) => idx !== i),
    );
  const updateBox = (i, path, val) =>
    set(
      "boxContents",
      form.boxContents.map((b, idx) => {
        if (idx !== i) return b;
        if (path.length === 1) return { ...b, [path[0]]: val };
        return { ...b, [path[0]]: { ...b[path[0]], [path[1]]: val } };
      }),
    );

  // Spec Groups
  const addSG = () => set("specGroups", [...form.specGroups, emptySpecGroup()]);
  const removeSG = (i) =>
    set(
      "specGroups",
      form.specGroups.filter((_, idx) => idx !== i),
    );
  const updateSG = (i, path, val) =>
    set(
      "specGroups",
      form.specGroups.map((sg, idx) => {
        if (idx !== i) return sg;
        if (path[0] === "title")
          return { ...sg, title: { ...sg.title, [path[1]]: val } };
        return { ...sg, [path[0]]: val };
      }),
    );
  const addSGItem = (gi) =>
    set(
      "specGroups",
      form.specGroups.map((sg, idx) =>
        idx !== gi ? sg : { ...sg, items: [...sg.items, { en: "", ar: "" }] },
      ),
    );
  const updateSGItem = (gi, ii, lang, val) =>
    set(
      "specGroups",
      form.specGroups.map((sg, idx) => {
        if (idx !== gi) return sg;
        return {
          ...sg,
          items: sg.items.map((it, jdx) =>
            jdx !== ii ? it : { ...it, [lang]: val },
          ),
        };
      }),
    );
  const removeSGItem = (gi, ii) =>
    set(
      "specGroups",
      form.specGroups.map((sg, idx) =>
        idx !== gi
          ? sg
          : { ...sg, items: sg.items.filter((_, jdx) => jdx !== ii) },
      ),
    );

  // Content Sections
  const addCS = () =>
    set("contentSections", [...form.contentSections, emptySection()]);
  const removeCS = (i) =>
    set(
      "contentSections",
      form.contentSections.filter((_, idx) => idx !== i),
    );
  const updateCS = (i, path, val) =>
    set(
      "contentSections",
      form.contentSections.map((cs, idx) => {
        if (idx !== i) return cs;
        if (path.length === 1) return { ...cs, [path[0]]: val };
        return { ...cs, [path[0]]: { ...cs[path[0]], [path[1]]: val } };
      }),
    );
  const addCSBullet = (i) =>
    set(
      "contentSections",
      form.contentSections.map((cs, idx) =>
        idx !== i
          ? cs
          : {
              ...cs,
              bullets: {
                en: [...(cs.bullets?.en || []), ""],
                ar: [...(cs.bullets?.ar || []), ""],
              },
            },
      ),
    );
  const updateCSBullet = (i, lang, bi, val) =>
    set(
      "contentSections",
      form.contentSections.map((cs, idx) => {
        if (idx !== i) return cs;
        return {
          ...cs,
          bullets: {
            ...cs.bullets,
            [lang]: (cs.bullets?.[lang] || []).map((b, jdx) =>
              jdx !== bi ? b : val,
            ),
          },
        };
      }),
    );
  const removeCSBullet = (i, bi) =>
    set(
      "contentSections",
      form.contentSections.map((cs, idx) =>
        idx !== i
          ? cs
          : {
              ...cs,
              bullets: {
                en: (cs.bullets?.en || []).filter((_, jdx) => jdx !== bi),
                ar: (cs.bullets?.ar || []).filter((_, jdx) => jdx !== bi),
              },
            },
      ),
    );

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      gallery: form.gallery.filter(Boolean),
    };

    try {
      const res = await fetch(
        isEdit ? apiUrl(`/api/products/${id}`) : apiUrl("/api/products"),
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (data.success) navigate("/admin/products");
      else alert(data.message || "Error saving product");
    } catch {
      alert("Network error — please check your connection.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-sm text-neutral-400 animate-pulse">
        Loading product data…
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      {/* ── Top bar ── */}
      <div className="flex items-center gap-3 mb-7">
        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors text-neutral-500"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-black text-neutral-900">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-xs text-neutral-400">
            {isEdit ? `slug: ${form.slug}` : "Fill in the details below"}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {isEdit && (
            <a
              href={`/product/${form.slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-500 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </a>
          )}
          <Button
            type="submit"
            form="product-form"
            disabled={saving}
            className="bg-[#E60012] hover:bg-[#c4000f] text-white px-5 h-9 flex items-center gap-2 font-bold text-sm rounded-lg"
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? "Saving…" : "Save Product"}
          </Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
        {/* ── 1. Identity ── */}
        <Section
          title="Identity"
          subtitle="URL slug, category, badge and visibility"
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug (URL)" hint="lowercase, hyphens only">
              <input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                required
                placeholder="desi-utopic-rx-face-recognition"
                className={inputCls}
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                <option value="smart-locks">Smart Locks</option>

                <option value="accessories">Accessories</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4 items-end">
            <Field label="Badge">
              <select
                value={form.badge || ""}
                onChange={(e) => set("badge", e.target.value || null)}
                className={inputCls}
              >
                <option value="">— None —</option>
                <option value="NEW">NEW</option>
                <option value="SALE">SALE</option>
                <option value="BESTSELLER">BESTSELLER</option>
              </select>
            </Field>
            <Field label="Flags">
              <div className="flex gap-5 py-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => set("isActive", e.target.checked)}
                    className="w-4 h-4 accent-[#E60012]"
                  />
                  <span className="text-sm text-neutral-700 font-medium">
                    Active
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isNew}
                    onChange={(e) => set("isNew", e.target.checked)}
                    className="w-4 h-4 accent-[#E60012]"
                  />
                  <span className="text-sm text-neutral-700 font-medium">
                    Mark as New
                  </span>
                </label>
              </div>
            </Field>
          </div>
        </Section>

        {/* ── 2. Name & Description ── */}
        <Section
          title="Name & Description"
          subtitle="Bilingual product title and short description"
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name — English">
              <input
                value={form.name.en}
                onChange={(e) => setNested("name", "en", e.target.value)}
                required
                placeholder="DESi Utopic RX…"
                className={inputCls}
              />
            </Field>
            <Field label="الاسم — عربي" dir="rtl">
              <input
                value={form.name.ar}
                onChange={(e) => setNested("name", "ar", e.target.value)}
                dir="rtl"
                placeholder="DESi Utopic RX…"
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Description — English">
              <textarea
                rows={3}
                value={form.description.en}
                onChange={(e) => setNested("description", "en", e.target.value)}
                placeholder="Short product description…"
                className={inputCls + " resize-none"}
              />
            </Field>
            <Field label="الوصف — عربي" dir="rtl">
              <textarea
                rows={3}
                value={form.description.ar}
                onChange={(e) => setNested("description", "ar", e.target.value)}
                dir="rtl"
                placeholder="وصف مختصر للمنتج…"
                className={inputCls + " resize-none"}
              />
            </Field>
          </div>
        </Section>

        {/* ── 3. Pricing & Stock ── */}
        <Section title="Pricing & Stock">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (AED)">
              <input
                type="number"
                min="0"
                value={form.priceAED}
                onChange={(e) => set("priceAED", e.target.value)}
                required
                placeholder="0"
                className={inputCls}
              />
            </Field>
            <Field label="Stock Quantity">
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => set("stock", e.target.value)}
                placeholder="0"
                className={inputCls}
              />
            </Field>
          </div>
        </Section>

        {/* ── 4. Images ── */}
        <Section
          title="Images"
          subtitle="Main product image and up to 5 gallery images"
        >
          <Field label="Main Image">
            <CloudinaryUpload
              onUpload={(url) => set("image", url)}
              onError={(err) => alert("Upload failed: " + err)}
              currentImageUrl={form.image}
              token={token}
            />
          </Field>

          <Field label="Gallery Images" hint="up to 5">
            <div className="space-y-2">
              {form.gallery.length === 0 && (
                <p className="text-xs text-neutral-400 italic">
                  No gallery images yet.
                </p>
              )}
              {form.gallery.map((url, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <span className="text-xs text-neutral-400 w-5 shrink-0 text-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 flex gap-2 items-center">
                    <img
                      src={url}
                      alt=""
                      className="w-9 h-9 rounded object-contain border border-neutral-200 bg-neutral-50 shrink-0"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <span className="text-xs text-neutral-600 truncate">
                      {url.substring(0, 50)}...
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGallery(i)}
                    className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {form.gallery.length < 5 && (
                <div className="mt-1">
                  <CloudinaryUpload
                    onUpload={(url) =>
                      setForm((f) => ({ ...f, gallery: [...f.gallery, url] }))
                    }
                    onError={(err) => alert("Upload failed: " + err)}
                    token={token}
                  />
                </div>
              )}
            </div>
          </Field>
        </Section>

        {/* ── 5. Feature Bullets ── */}
        <Section
          title="Feature Bullets"
          subtitle="Key selling points — shown on product cards and detail page"
        >
          <div className="space-y-2">
            {form.bullets.en.length === 0 && (
              <p className="text-xs text-neutral-400 italic">No bullets yet.</p>
            )}
            {/* Column headers */}
            {form.bullets.en.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pb-1">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  English
                </span>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider text-right">
                  عربي
                </span>
              </div>
            )}
            {form.bullets.en.map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 items-start group">
                <input
                  value={form.bullets.en[i]}
                  onChange={(e) => updateBullet("en", i, e.target.value)}
                  placeholder={`Feature ${i + 1}`}
                  className={inputCls}
                />
                <div className="flex gap-2">
                  <input
                    value={form.bullets.ar[i] || ""}
                    onChange={(e) => updateBullet("ar", i, e.target.value)}
                    dir="rtl"
                    placeholder={`الميزة ${i + 1}`}
                    className={inputCls + " flex-1"}
                  />
                  <button
                    type="button"
                    onClick={() => removeBullet(i)}
                    className="p-2 text-neutral-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addBullet}
              className="flex items-center gap-1.5 text-xs text-[#E60012] hover:text-[#c4000f] font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Bullet
            </button>
          </div>
        </Section>

        {/* ── 6. Announcement Bar ── */}
        <Section
          title="Announcement Bar"
          subtitle="Red banner shown below the purchase UI on the product page"
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="English">
              <input
                value={form.announcementBar.en}
                onChange={(e) =>
                  setNested("announcementBar", "en", e.target.value)
                }
                placeholder="⚠️ Compatible with Utopic RX…"
                className={inputCls}
              />
            </Field>
            <Field label="عربي" dir="rtl">
              <input
                value={form.announcementBar.ar}
                onChange={(e) =>
                  setNested("announcementBar", "ar", e.target.value)
                }
                dir="rtl"
                placeholder="⚠️ متوافق مع…"
                className={inputCls}
              />
            </Field>
          </div>
        </Section>

        {/* ── 7. Quick Features Bar ── */}
        <Section
          title="Quick Features Bar"
          subtitle="Icon feature pills shown below the product images (e.g. Fingerprint, WiFi, Auto-Lock)"
        >
          <div className="space-y-3">
            {form.quickFeatures.length === 0 && (
              <p className="text-xs text-neutral-400 italic">
                No quick features yet.
              </p>
            )}
            {form.quickFeatures.map((qf, i) => (
              <div
                key={i}
                className="border border-neutral-200 rounded-lg p-4 space-y-3 bg-neutral-50/40"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Feature {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeQF(i)}
                    className="p-1 text-neutral-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-[72px_1fr_1fr] gap-3">
                  <Field label="Icon">
                    <input
                      value={qf.icon || ""}
                      onChange={(e) => updateQF(i, ["icon"], e.target.value)}
                      placeholder="🔒"
                      className={inputCls + " text-center text-lg"}
                    />
                  </Field>
                  <Field label="Label — English">
                    <input
                      value={qf.label?.en || ""}
                      onChange={(e) =>
                        updateQF(i, ["label", "en"], e.target.value)
                      }
                      placeholder="Fingerprint"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="التسمية — عربي" dir="rtl">
                    <input
                      value={qf.label?.ar || ""}
                      onChange={(e) =>
                        updateQF(i, ["label", "ar"], e.target.value)
                      }
                      dir="rtl"
                      placeholder="بصمة الإصبع"
                      className={inputCls}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Subtitle — English">
                    <input
                      value={qf.sub?.en || ""}
                      onChange={(e) =>
                        updateQF(i, ["sub", "en"], e.target.value)
                      }
                      placeholder="Up to 100 users"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="العنوان الفرعي — عربي" dir="rtl">
                    <input
                      value={qf.sub?.ar || ""}
                      onChange={(e) =>
                        updateQF(i, ["sub", "ar"], e.target.value)
                      }
                      dir="rtl"
                      placeholder="حتى 100 مستخدم"
                      className={inputCls}
                    />
                  </Field>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addQF}
              className="flex items-center gap-1.5 text-xs text-[#E60012] hover:text-[#c4000f] font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Quick Feature
            </button>
          </div>
        </Section>

        {/* ── 8. Box Contents ── */}
        <Section
          title="Box Contents"
          subtitle="Items included in the product packaging"
        >
          <div className="space-y-2">
            {form.boxContents.length === 0 && (
              <p className="text-xs text-neutral-400 italic">
                No box items yet.
              </p>
            )}
            {form.boxContents.map((item, i) => (
              <div key={i} className="flex gap-3 items-end">
                <div className="w-20 shrink-0">
                  <Field label="Icon">
                    <input
                      value={item.icon || ""}
                      onChange={(e) => updateBox(i, ["icon"], e.target.value)}
                      placeholder="📦"
                      className={inputCls + " text-center text-lg"}
                    />
                  </Field>
                </div>
                <div className="flex-1">
                  <Field label="Name — English">
                    <input
                      value={item.name?.en || ""}
                      onChange={(e) =>
                        updateBox(i, ["name", "en"], e.target.value)
                      }
                      placeholder="Smart Lock Unit"
                      className={inputCls}
                    />
                  </Field>
                </div>
                <div className="flex-1">
                  <Field label="الاسم — عربي" dir="rtl">
                    <input
                      value={item.name?.ar || ""}
                      onChange={(e) =>
                        updateBox(i, ["name", "ar"], e.target.value)
                      }
                      dir="rtl"
                      placeholder="وحدة القفل الذكي"
                      className={inputCls}
                    />
                  </Field>
                </div>
                <button
                  type="button"
                  onClick={() => removeBox(i)}
                  className="mb-0.5 p-2 text-neutral-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBox}
              className="flex items-center gap-1.5 text-xs text-[#E60012] hover:text-[#c4000f] font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Box Item
            </button>
          </div>
        </Section>

        {/* ── 9. Spec Groups ── */}
        <Section
          title="Specifications"
          subtitle="Technical spec tables — grouped by category (e.g. Connectivity, Physical, Power)"
        >
          <div className="space-y-4">
            {form.specGroups.length === 0 && (
              <p className="text-xs text-neutral-400 italic">
                No spec groups yet.
              </p>
            )}
            {form.specGroups.map((sg, gi) => (
              <div
                key={gi}
                className="border border-neutral-200 rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider shrink-0">
                    Group {gi + 1}
                  </span>
                  <input
                    value={sg.title?.en || ""}
                    onChange={(e) =>
                      updateSG(gi, ["title", "en"], e.target.value)
                    }
                    placeholder="Group title (English)"
                    className={inputCls + " flex-1"}
                  />
                  <input
                    value={sg.title?.ar || ""}
                    onChange={(e) =>
                      updateSG(gi, ["title", "ar"], e.target.value)
                    }
                    dir="rtl"
                    placeholder="عنوان المجموعة (عربي)"
                    className={inputCls + " flex-1"}
                  />
                  <button
                    type="button"
                    onClick={() => removeSG(gi)}
                    className="p-1 text-neutral-300 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  {sg.items.map((it, ii) => (
                    <div key={ii} className="flex gap-2 items-center">
                      <span className="text-xs text-neutral-400 w-5 text-center shrink-0">
                        {ii + 1}
                      </span>
                      <input
                        value={it.en || ""}
                        onChange={(e) =>
                          updateSGItem(gi, ii, "en", e.target.value)
                        }
                        placeholder="Spec detail (English)"
                        className={inputCls + " flex-1"}
                      />
                      <input
                        value={it.ar || ""}
                        onChange={(e) =>
                          updateSGItem(gi, ii, "ar", e.target.value)
                        }
                        dir="rtl"
                        placeholder="تفاصيل المواصفات (عربي)"
                        className={inputCls + " flex-1"}
                      />
                      <button
                        type="button"
                        onClick={() => removeSGItem(gi, ii)}
                        className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSGItem(gi)}
                    className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#E60012] font-semibold transition-colors mt-1"
                  >
                    <Plus className="w-3 h-3" /> Add Spec Row
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSG}
              className="flex items-center gap-1.5 text-xs text-[#E60012] hover:text-[#c4000f] font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Spec Group
            </button>
          </div>
        </Section>

        {/* ── 10. Content Sections ── */}
        <Section
          title="Content Sections"
          subtitle="Rich content blocks shown on the product detail page (text + image panels)"
        >
          <div className="space-y-4">
            {form.contentSections.length === 0 && (
              <p className="text-xs text-neutral-400 italic">
                No content sections yet.
              </p>
            )}
            {form.contentSections.map((cs, i) => (
              <div
                key={i}
                className="border border-neutral-200 rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider shrink-0">
                    Section {i + 1}
                  </span>
                  <select
                    value={cs.type || "text-image"}
                    onChange={(e) => updateCS(i, ["type"], e.target.value)}
                    className="px-2 py-1.5 text-xs border border-neutral-200 rounded-lg bg-white outline-none focus:border-[#E60012] flex-1 max-w-56"
                  >
                    {SECTION_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeCS(i)}
                    className="ml-auto p-1 text-neutral-300 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {/* Tag */}
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Tag / Label — English">
                      <input
                        value={cs.tag?.en || ""}
                        onChange={(e) =>
                          updateCS(i, ["tag", "en"], e.target.value)
                        }
                        placeholder="Smart Access"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="التاج — عربي" dir="rtl">
                      <input
                        value={cs.tag?.ar || ""}
                        onChange={(e) =>
                          updateCS(i, ["tag", "ar"], e.target.value)
                        }
                        dir="rtl"
                        placeholder="وصول ذكي"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  {/* Heading */}
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Heading — English">
                      <input
                        value={cs.heading?.en || ""}
                        onChange={(e) =>
                          updateCS(i, ["heading", "en"], e.target.value)
                        }
                        placeholder="Section heading…"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="العنوان — عربي" dir="rtl">
                      <input
                        value={cs.heading?.ar || ""}
                        onChange={(e) =>
                          updateCS(i, ["heading", "ar"], e.target.value)
                        }
                        dir="rtl"
                        placeholder="عنوان القسم…"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  {/* Body text (not for banner-only types) */}
                  {!["banner", "dark-banner"].includes(cs.type) && (
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Body Text — English">
                        <textarea
                          rows={3}
                          value={cs.text?.en || ""}
                          onChange={(e) =>
                            updateCS(i, ["text", "en"], e.target.value)
                          }
                          placeholder="Section body text…"
                          className={inputCls + " resize-none"}
                        />
                      </Field>
                      <Field label="النص — عربي" dir="rtl">
                        <textarea
                          rows={3}
                          value={cs.text?.ar || ""}
                          onChange={(e) =>
                            updateCS(i, ["text", "ar"], e.target.value)
                          }
                          dir="rtl"
                          placeholder="نص القسم…"
                          className={inputCls + " resize-none"}
                        />
                      </Field>
                    </div>
                  )}
                  {/* Image */}
                  <Field label="Image">
                    <CloudinaryUpload
                      onUpload={(url) => updateCS(i, ["image"], url)}
                      onError={(err) => alert("Upload failed: " + err)}
                      currentImageUrl={cs.image}
                      token={token}
                    />
                  </Field>
                  {/* Bullets (not for banner-only types) */}
                  {!["banner", "dark-banner"].includes(cs.type) && (
                    <div>
                      <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                        Bullets{" "}
                        <span className="normal-case font-normal text-neutral-400">
                          (optional)
                        </span>
                      </p>
                      <div className="space-y-2">
                        {(cs.bullets?.en || []).map((_, bi) => (
                          <div key={bi} className="flex gap-2 items-center">
                            <input
                              value={cs.bullets?.en?.[bi] || ""}
                              onChange={(e) =>
                                updateCSBullet(i, "en", bi, e.target.value)
                              }
                              placeholder={`Bullet ${bi + 1} (EN)`}
                              className={inputCls + " flex-1"}
                            />
                            <input
                              value={cs.bullets?.ar?.[bi] || ""}
                              onChange={(e) =>
                                updateCSBullet(i, "ar", bi, e.target.value)
                              }
                              dir="rtl"
                              placeholder={`نقطة ${bi + 1}`}
                              className={inputCls + " flex-1"}
                            />
                            <button
                              type="button"
                              onClick={() => removeCSBullet(i, bi)}
                              className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addCSBullet(i)}
                          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#E60012] font-semibold transition-colors"
                        >
                          <Plus className="w-3 h-3" /> Add Bullet
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addCS}
              className="flex items-center gap-1.5 text-xs text-[#E60012] hover:text-[#c4000f] font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Content Section
            </button>
          </div>
        </Section>

        {/* ── Bottom save ── */}
        <div className="flex justify-end pb-8">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#E60012] hover:bg-[#c4000f] text-white px-8 h-10 flex items-center gap-2 font-bold text-sm rounded-lg"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
