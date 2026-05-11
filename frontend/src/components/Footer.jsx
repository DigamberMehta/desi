import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Share2, Star, Heart, Zap } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  const { t, lang } = useLang();

  const cols = [
    {
      title: { en: "Shop", ar: "تسوّق" },
      links: [
        {
          to: "/smart-locks",
          label: { en: "Smart Locks", ar: "الأقفال الذكية" },
        },
        { to: "/accessories", label: { en: "Accessories", ar: "الملحقات" } },
      ],
    },
    {
      title: { en: "Support", ar: "الدعم" },
      links: [
        {
          to: "/support",
          label: { en: "Installation Guide", ar: "دليل التركيب" },
        },
        { to: "/faq", label: { en: "FAQ", ar: "الأسئلة الشائعة" } },
        {
          to: "/contact",
          label: { en: "Compatibility Check", ar: "فحص التوافق" },
        },
        { to: "/contact", label: { en: "Warranty", ar: "الضمان" } },
      ],
    },
    {
      title: { en: "Company", ar: "الشركة" },
      links: [
        { to: "/about", label: { en: "About DESi", ar: "عن ديسي" } },
        { to: "/contact", label: { en: "Contact", ar: "اتصل بنا" } },
        { to: "/contact", label: { en: "Become a Reseller", ar: "كن موزعاً" } },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 selection:bg-[#E60012] selection:text-white">
      {/* Newsletter */}
      <div className="border-b border-neutral-900/50 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[#E60012] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block">
              {t({ en: "Newsletter", ar: "النشرة البريدية" })}
            </span>
            <p className="text-neutral-500 font-medium">
              {t({
                en: "Subscribe for UAE-exclusive offers, install tips & new releases.",
                ar: "اشترك لتحصل على عروض حصرية للإمارات ونصائح التركيب.",
              })}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                t({
                  en: "Thanks! Check your inbox.",
                  ar: "شكراً! تحقق من بريدك.",
                }),
              );
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              required
              placeholder={t({
                en: "Your email address",
                ar: "بريدك الإلكتروني",
              })}
              className="flex-1 h-14 bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-[#E60012] rounded-xl"
            />
            <Button
              type="submit"
              className="h-14 px-8 bg-[#E60012] hover:bg-[#c4000f] text-white font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-red-900/20"
            >
              {t({ en: "Subscribe", ar: "اشترك" })}
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12">
        <div className="col-span-2 md:col-span-2">
          <Link
            to="/"
            className="text-[#E60012] font-black text-4xl tracking-tight"
          >
            DESi{" "}
            <span className="text-neutral-600 text-xs font-bold tracking-[0.2em] uppercase align-top ml-1">
              UAE
            </span>
          </Link>
          <p className="mt-6 text-[15px] leading-relaxed text-neutral-500 max-w-sm">
            {t({
              en: "Smart locks engineered in Turkey, trusted in 40+ countries — now officially in the UAE. AI-powered access for modern homes.",
              ar: "أقفال ذكية مصممة في تركيا، موثوقة في أكثر من 40 دولة — والآن في الإمارات رسمياً.",
            })}
          </p>
          <div className="mt-8 space-y-4 text-sm font-medium">
            <div className="flex items-start gap-3 text-neutral-400 hover:text-white transition-colors group cursor-default">
              <MapPin className="w-4 h-4 mt-0.5 text-[#E60012] group-hover:scale-110 transition-transform" />
              <span>
                {t({
                  en: "Sheikh Zayed Road, Dubai, UAE",
                  ar: "شارع الشيخ زايد، دبي، الإمارات",
                })}
              </span>
            </div>
            <a
              href="tel:+97142000000"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[#E60012]" />
              +971 4 200 0000
            </a>
            <a
              href="mailto:info@desilocks.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#E60012]" />
              info@desilocks.com
            </a>
          </div>
          <div className="mt-5 flex items-center gap-3">
            {[Share2, Star, Heart, Zap].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-[#E60012] flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title.en}>
            <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-4">
              {t(c.title)}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label.en}>
                  <Link
                    to={l.to}
                    className="hover:text-white transition-colors"
                  >
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} DESi UAE.{" "}
            {t({ en: "All rights reserved.", ar: "جميع الحقوق محفوظة." })}
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white">
              {t({ en: "Privacy Policy", ar: "سياسة الخصوصية" })}
            </a>
            <a href="#" className="hover:text-white">
              {t({ en: "Terms of Service", ar: "الشروط" })}
            </a>
            <a href="#" className="hover:text-white">
              {t({ en: "Shipping & Returns", ar: "الشحن والإرجاع" })}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
