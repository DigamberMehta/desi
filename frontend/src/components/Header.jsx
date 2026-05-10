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
      <div className="bg-neutral-900 text-white/90 text-[10px] sm:text-xs py-1">
        <div className="max-w-7xl mx-auto px-4 h-8 sm:h-9 flex items-center justify-between gap-2 sm:gap-5">
          <div className="flex items-center gap-2 sm:gap-5 min-w-0">
            <a
              href="mailto:info@desi.ae"
              className="flex items-center gap-1 sm:gap-2 hover:text-[#E60012] transition-colors truncate"
            >
              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">info@desi.ae</span>
              <span className="sm:hidden">info@desi.ae</span>
            </a>
            <a
              href="tel:+97142000000"
              className="hidden sm:flex items-center gap-2 hover:text-[#E60012] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> +971 4 200 0000
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link
              to="/contact"
              className="hidden sm:inline hover:text-[#E60012] transition-colors whitespace-nowrap"
            >
              {t({ en: "Contact", ar: "اتصل بنا" })}
            </Link>
            <Link
              to="/faq"
              className="hidden sm:inline hover:text-[#E60012] transition-colors whitespace-nowrap"
            >
              {t({ en: "F.A.Q.", ar: "الأسئلة الشائعة" })}
            </Link>
            <Link
              to="/about"
              className="hidden md:inline hover:text-[#E60012] transition-colors whitespace-nowrap"
            >
              {t({ en: "About Us", ar: "من نحن" })}
            </Link>
            <Link
              to="/support"
              className="hidden md:inline hover:text-[#E60012] transition-colors whitespace-nowrap"
            >
              {t({ en: "Support", ar: "الدعم" })}
            </Link>
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1 hover:text-[#E60012] transition-colors font-medium whitespace-nowrap"
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">
                {lang === "en" ? "العربية" : "EN"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          <Link to="/" className="flex items-center gap-1 flex-shrink-0">
            <span
              className="text-[#E60012] font-black text-2xl sm:text-3xl tracking-tight"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              DESi
            </span>
            <span className="text-neutral-400 text-[8px] sm:text-[10px] font-semibold tracking-widest uppercase ms-1 hidden sm:inline">
              UAE
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wide transition-colors ${isActive ? "text-[#E60012]" : "text-neutral-800 hover:text-[#E60012]"}`
                }
              >
                {t(n.label)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
            </button>
            <button
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-neutral-100 hidden sm:flex items-center justify-center transition-colors"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
            </button>
            <button
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-neutral-100 hidden sm:flex items-center justify-center transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
            </button>
            <Link
              to="/cart"
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E60012] text-white text-[8px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-neutral-200 bg-white">
            <form
              onSubmit={onSubmitSearch}
              className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-4 flex gap-2 sm:gap-3"
            >
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t({
                  en: "Search smart locks, accessories...",
                  ar: "ابحث عن الأقفال الذكية والملحقات...",
                })}
                className="flex-1 h-9 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm border border-neutral-300 rounded-md focus:outline-none focus:border-[#E60012]"
              />
              <Button
                type="submit"
                className="bg-[#E60012] hover:bg-[#b8000e] text-white px-3 sm:px-4 h-9 sm:h-11 text-xs sm:text-sm"
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
          <div className="absolute top-0 end-0 h-full w-full sm:w-80 sm:max-w-[85%] bg-white shadow-xl flex flex-col">
            <div className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-5 border-b border-neutral-200">
              <span className="text-[#E60012] font-black text-xl sm:text-2xl">
                DESi UAE
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2 sm:py-4">
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
                    `block px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase ${isActive ? "text-[#E60012] bg-red-50" : "text-neutral-800"} hover:bg-neutral-50 transition-colors`
                  }
                >
                  {t(n.label)}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-neutral-200 p-3 sm:p-5">
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="w-full h-9 sm:h-10 rounded-md bg-neutral-100 hover:bg-neutral-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
