import React, { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import SEOHead from "../components/SEOHead";
import { useLang } from "../contexts/LangContext";
import { apiUrl } from "../lib/api";

const SearchResults = () => {
  const { t, lang } = useLang();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();
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

  const filtered = useMemo(() => {
    if (!q) return [];
    return products.filter(
      (p) =>
        (t(p.name) || "").toLowerCase().includes(q) ||
        (t(p.description) || "").toLowerCase().includes(q),
    );
  }, [q, lang, t, products]);

  return (
    <>
      <SEOHead
        title={`Search Results for "${q}" | DESi Smart Locks UAE`}
        description={`Search results for ${q} in DESi Smart Locks, Alarms, Security Systems and Accessories`}
        keywords={`${q}, smart locks, security, search`}
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
              {t({ en: "Search Results", ar: "نتائج البحث" })}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <p className="text-lg text-neutral-600">
              {t({ en: "Search results for:", ar: "نتائج البحث عن:" })}{" "}
              <span className="font-bold text-neutral-900">"{q}"</span>
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              {filtered.length} {t({ en: "products found", ar: "منتجات وجدت" })}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg mb-4">
                {t({
                  en: "No products found matching your search.",
                  ar: "لم يتم العثور على منتجات تطابق بحثك.",
                })}
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#E60012] font-bold hover:underline"
              >
                {t({ en: "Back to Home", ar: "العودة للرئيسية" })}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SearchResults;
