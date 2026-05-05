import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "./ui/button";

const Header = () => {
  const { lang, setLang, t } = useLang();
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const nav = [
    { to: "/smart-locks", label: { en: "Smart Locks", ar: "الأقفال الذكية" } },
    {
      to: "/alarm-security",
      label: { en: "Alarm & Security", ar: "إنذار وأمان" },
    },
    { to: "/accessories", label: { en: "Accessories", ar: "الملحقات" } },
  ];

  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/50 transition-all duration-300">
      {/* Top utility bar */}
      <div className="bg-neutral-900 text-white/90 text-xs py-1">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="mailto:info@desi.ae"
              className="flex items-center gap-2 hover:text-[#E60012] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> info@desi.ae
            </a>
            <a
              href="tel:+97142000000"
              className="hidden sm:flex items-center gap-2 hover:text-[#E60012] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> +971 4 200 0000
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden sm:inline hover:text-[#E60012] transition-colors"
            >
              {t({ en: "Contact", ar: "اتصل بنا" })}
            </Link>
            <Link
              to="/faq"
              className="hidden sm:inline hover:text-[#E60012] transition-colors"
            >
              {t({ en: "F.A.Q.", ar: "الأسئلة الشائعة" })}
            </Link>
            <Link
              to="/about"
              className="hidden md:inline hover:text-[#E60012] transition-colors"
            >
              {t({ en: "About Us", ar: "من نحن" })}
            </Link>
            <Link
              to="/support"
              className="hidden md:inline hover:text-[#E60012] transition-colors"
            >
              {t({ en: "Support", ar: "الدعم" })}
            </Link>
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1.5 hover:text-[#E60012] transition-colors font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "en" ? "العربية" : "EN"}
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-1">
            <span
              className="text-[#E60012] font-black text-3xl tracking-tight"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              DESi
            </span>
            <span className="text-neutral-400 text-[10px] font-semibold tracking-widest uppercase ms-1 hidden sm:inline">
              UAE
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-sm font-bold uppercase tracking-wide transition-colors ${isActive ? "text-[#E60012]" : "text-neutral-800 hover:text-[#E60012]"}`
                }
              >
                {t(n.label)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-neutral-700" />
            </button>
            <button
              className="w-10 h-10 rounded-full hover:bg-neutral-100 hidden sm:flex items-center justify-center transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-neutral-700" />
            </button>
            <button
              className="w-10 h-10 rounded-full hover:bg-neutral-100 hidden sm:flex items-center justify-center transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-neutral-700" />
            </button>
            <Link
              to="/cart"
              className="relative w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-neutral-700" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E60012] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-neutral-200 bg-white">
            <form
              onSubmit={onSubmitSearch}
              className="max-w-7xl mx-auto px-4 py-4 flex gap-3"
            >
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t({
                  en: "Search smart locks, accessories...",
                  ar: "ابحث عن الأقفال الذكية والملحقات...",
                })}
                className="flex-1 h-11 px-4 border border-neutral-300 rounded-md focus:outline-none focus:border-[#E60012]"
              />
              <Button
                type="submit"
                className="bg-[#E60012] hover:bg-[#b8000e] text-white"
              >
                {t({ en: "Search", ar: "بحث" })}
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 end-0 h-full w-80 max-w-[85%] bg-white shadow-xl flex flex-col">
            <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-200">
              <span className="text-[#E60012] font-black text-2xl">
                DESi UAE
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              {[
                ...nav,
                { to: "/about", label: { en: "About Us", ar: "من نحن" } },
                { to: "/support", label: { en: "Support", ar: "الدعم" } },
                { to: "/faq", label: { en: "F.A.Q.", ar: "الأسئلة الشائعة" } },
                { to: "/contact", label: { en: "Contact", ar: "اتصل بنا" } },
              ].map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-5 py-3 text-sm font-bold uppercase ${isActive ? "text-[#E60012] bg-red-50" : "text-neutral-800"} hover:bg-neutral-50`
                  }
                >
                  {t(n.label)}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-neutral-200 p-5">
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="w-full h-10 rounded-md bg-neutral-100 hover:bg-neutral-200 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />{" "}
                {lang === "en" ? "العربية" : "English"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
