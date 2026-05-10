import React, { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import SEOHead from "../components/SEOHead";
import { useLang } from "../contexts/LangContext";
import { apiUrl } from "../lib/api";

const Catalog = ({ category }) => {
  const { t, lang } = useLang();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();
  const [sort, setSort] = useState("default");
  const [onlyNew, setOnlyNew] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(apiUrl("/api/products"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const titles = {
    "smart-locks": { en: "Smart Locks", ar: "الأقفال الذكية" },
    "alarm-security": { en: "Alarm & Security", ar: "إنذار وأمان" },
    accessories: { en: "Accessories", ar: "الملحقات" },
  };

  const seoTitles = {
    "smart-locks": {
      en: "Buy Smart Locks UAE | Face Recognition Biometric Locks",
      ar: "شراء أقفال ذكية الإمارات | أقفال بيومترية",
    },
    "alarm-security": {
      en: "Alarm & Security Systems UAE | Advanced Protection",
      ar: "أنظمة الإنذار والأمان الإمارات",
    },
    accessories: {
      en: "Smart Lock Accessories UAE | Premium Security Accessories",
      ar: "ملحقات الأقفال الذكية الإمارات",
    },
  };

  const seoDescriptions = {
    "smart-locks": {
      en: "Shop smart locks with face recognition technology. AES-256 encryption, 6-month battery. Free delivery across UAE.",
      ar: "تسوق الأقفال الذكية بتقنية تعرف الوجه. تشفير AES-256، بطارية 6 أشهر.",
    },
    "alarm-security": {
      en: "Advanced alarm and security systems for UAE homes. Professional installation and support.",
      ar: "أنظمة إنذار وأمان متقدمة لمنازل الإمارات.",
    },
    accessories: {
      en: "Premium accessories for DESi smart locks. Installation kits, batteries, and more.",
      ar: "ملحقات بريميوم للأقفال الذكية. مجموعات التركيب والبطاريات وأكثر.",
    },
  };

  const filtered = useMemo(() => {
    let list =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);
    if (q)
      list = list.filter((p) => (t(p.name) || "").toLowerCase().includes(q));
    if (onlyNew) list = list.filter((p) => p.isNew);

    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.priceAED - b.priceAED);
    else if (sort === "price-desc")
      list = [...list].sort((a, b) => b.priceAED - a.priceAED);
    else if (sort === "default" && category === "smart-locks") {
      // Custom order for smart-locks
      const customOrder = [
        "desi-utopic-rx-base",
        "desi-utopic-rx-wifi",
        "desi-utopic-rx-fingerprint-wifi",
        "desi-utopic-rx-face-recognition",
        "desi-quic-v002",
      ];
      list = [...list].sort((a, b) => {
        const indexA = customOrder.indexOf(a.slug);
        const indexB = customOrder.indexOf(b.slug);
        // Products in custom order come first, in specified order
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        // Product in custom order comes before others
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        // Other products maintain original order
        return 0;
      });
    }
    return list;
  }, [category, q, sort, onlyNew, lang, t, products]);

  return (
    <>
      <SEOHead
        title={t(seoTitles[category] || seoTitles["smart-locks"])}
        description={t(
          seoDescriptions[category] || seoDescriptions["smart-locks"],
        )}
        keywords={`${category} UAE, smart security, biometric access, DESi locks`}
        type="website"
      />
      <main>
        <div className="bg-neutral-100 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-xs text-neutral-600">
            <Link to="/" className="hover:text-[#E60012]">
              {t({ en: "Home", ar: "الرئيسية" })}
            </Link>
            <ChevronRight className="w-3 h-3 rtl:rotate-180" />
            <span className="text-neutral-900 font-semibold">
              {t(titles[category] || { en: "Catalog", ar: "المتجر" })}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">
                {t(titles[category] || { en: "Catalog", ar: "المتجر" })}
              </h1>
              <p className="mt-1.5 text-neutral-600">
                {filtered.length}{" "}
                {t({ en: "products available", ar: "منتجات متوفرة" })}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyNew}
                  onChange={(e) => setOnlyNew(e.target.checked)}
                  className="w-4 h-4 accent-[#E60012]"
                />
                {t({ en: "New only", ar: "الجديد فقط" })}
              </label>
              <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-md h-10 px-3">
                <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent text-sm focus:outline-none"
                >
                  <option value="default">
                    {t({ en: "Sort: Default", ar: "ترتيب: افتراضي" })}
                  </option>
                  <option value="price-asc">
                    {t({ en: "Price: Low to High", ar: "السعر: الأقل للأعلى" })}
                  </option>
                  <option value="price-desc">
                    {t({ en: "Price: High to Low", ar: "السعر: الأعلى للأقل" })}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-lg text-neutral-600">
                {t({
                  en: "No products match your filters.",
                  ar: "لا توجد منتجات تطابق التصفية.",
                })}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Catalog;
