import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ScanFace,
  KeyRound,
  Battery,
  Zap,
  Smartphone,
  Users,
  ShieldCheck,
  Star,
  Sparkles,
  Check,
} from "lucide-react";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import SEOHead from "../components/SEOHead";
import { useLang } from "../contexts/LangContext";
import { Button } from "../components/ui/button";
import { structuredData } from "../lib/seo";
import * as LucideIcons from "lucide-react";
import { apiUrl } from "../lib/api";

const iconMap = {
  Fingerprint: LucideIcons.Fingerprint,
  ScanFace: LucideIcons.ScanFace,
  KeyRound: LucideIcons.KeyRound,
  Wifi: LucideIcons.Wifi,
  Battery: LucideIcons.Battery,
  Volume2: LucideIcons.Volume2,
  Clock: LucideIcons.Clock,
  Smartphone: LucideIcons.Smartphone,
  Lock: LucideIcons.Lock,
  ShieldCheck: LucideIcons.ShieldCheck,
  Users: LucideIcons.Users,
  BellRing: LucideIcons.BellRing,
  Zap: LucideIcons.Zap,
  MoveRight: LucideIcons.MoveRight,
};

const TESTIMONIALS = [
  {
    name: "Ahmed Al Mansouri",
    city: { en: "Dubai Marina", ar: "دبي مارينا" },
    text: {
      en: "Installed in under 5 minutes. Face recognition is shockingly fast even at night.",
      ar: "تم التركيب في أقل من 5 دقائق. التعرّف على الوجه سريع جداً حتى ليلاً.",
    },
    rating: 5,
  },
  {
    name: "Fatima Khan",
    city: { en: "Abu Dhabi", ar: "أبوظبي" },
    text: {
      en: "My kids forget keys daily. Now they just walk up. Best home upgrade we've made.",
      ar: "كان أطفالي ينسون المفاتيح يومياً. الآن يدخلون بسهولة. أفضل ترقية للمنزل.",
    },
    rating: 5,
  },
  {
    name: "James O'Brien",
    city: { en: "Sharjah", ar: "الشارقة" },
    text: {
      en: "Airbnb host here — e-key sharing changed my workflow completely. No more lockboxes.",
      ar: "كمضيف Airbnb — مشاركة المفاتيح الإلكترونية غيّرت عملي تماماً.",
    },
    rating: 5,
  },
  {
    name: "Maryam Saleh",
    city: { en: "Al Ain", ar: "العين" },
    text: {
      en: "No drilling needed. The 3M adhesive option saved my brand new fire door.",
      ar: "لا حاجة للحفر. اللاصق 3M أنقذ باب الحريق الجديد.",
    },
    rating: 5,
  },
];

const Home = () => {
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const testimonials = TESTIMONIALS;

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

  const smartLocks = products
    .filter((p) => p.category === "smart-locks")
    .slice(0, 4);
  const accessories = products
    .filter(
      (p) => p.category === "accessories" || p.category === "alarm-security",
    )
    .slice(0, 4);

  const featureHighlights =
    smartLocks.length > 0 && smartLocks[0].featureHighlights
      ? smartLocks[0].featureHighlights
      : [];

  return (
    <>
      <SEOHead
        title="DESi Smart Locks UAE | Advanced Biometric Security Solutions"
        description="Advanced smart locks and security solutions in UAE. Face recognition, AES-256 encryption, 6-month battery life. Buy DESi smart locks online."
        keywords="smart locks UAE, face recognition locks, security locks Dubai, biometric locks, smart door locks"
        type="website"
        structuredDataContent={structuredData.organization}
      />
      <main>
        <HeroBanner />

        {/* Value props strip */}
        <section className="bg-neutral-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/40 via-neutral-950/0 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                t: { en: "3-Min Install", ar: "تركيب في 3 دقائق" },
                s: { en: "No drilling required", ar: "بدون حفر" },
              },
              {
                icon: ScanFace,
                t: { en: "Face Recognition", ar: "تعرّف وجه" },
                s: { en: "Hands-free entry", ar: "دخول بدون لمس" },
              },
              {
                icon: ShieldCheck,
                t: { en: "AES-256 Secure", ar: "أمان AES-256" },
                s: { en: "Bank-grade encryption", ar: "تشفير بنكي" },
              },
              {
                icon: Battery,
                t: { en: "6-Month Battery", ar: "WPبطارية 6 أشهر" },
                s: { en: "Type-C rechargeable", ar: "شحن Type-C" },
              },
            ].map((v, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E60012]/30 to-[#E60012]/5 flex items-center justify-center flex-shrink-0 border border-[#E60012]/20 transition-transform group-hover:scale-110 group-hover:-rotate-3 duration-300">
                  <v.icon className="w-6 h-6 text-[#E60012]" />
                </div>
                <div>
                  <p className="font-bold text-[15px] tracking-wide">
                    {t(v.t)}
                  </p>
                  <p className="text-[13px] text-neutral-400 font-medium mt-0.5">
                    {t(v.s)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured products - Smart Locks */}
        <section className="bg-neutral-50/50">
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
                  {t({ en: "Elite Hardware", ar: "عتاد متميّز" })}
                </p>
                <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
                  {t({ en: "Smart Locks", ar: "الأقفال الذكية" })}
                </h2>
                <p className="mt-4 text-neutral-500 text-lg leading-relaxed">
                  {t({
                    en: "The world's smallest smart lock series — universal mounting, AI-powered, made for UAE homes.",
                    ar: "أصغر سلسلة أقفال ذكية — تركيب شامل ، مدعومة بالذكاء الاصطناعي، لمنازل الإمارات.",
                  })}
                </p>
              </div>
              <Link
                to="/smart-locks"
                className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 border-b-2 border-neutral-900 pb-1 hover:text-[#E60012] hover:border-[#E60012] transition-colors uppercase tracking-[0.1em] self-start md:self-auto"
              >
                {t({ en: "Explore All", ar: "استكشف الكل" })}{" "}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
            {smartLocks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {smartLocks.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-neutral-500">
                {t({
                  en: "No products found.",
                  ar: "لم يتم العثور على منتجات.",
                })}
              </p>
            )}
          </div>
        </section>

        {/* Featured products - Accessories */}
        {accessories.length > 0 && (
          <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 pb-24 pt-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                  <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
                    {t({ en: "Expand & Enhance", ar: "توسيع وتحسين" })}
                  </p>
                  <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
                    {t({ en: "Accessories", ar: "الملحقات" })}
                  </h2>
                  <p className="mt-4 text-neutral-500 text-lg leading-relaxed">
                    {t({
                      en: "Take your smart lock experience to the next level with our premium accessories.",
                      ar: "ارتقِ بتجربة القفل الذكي الخاص بك إلى المستوى التالي مع ملحقاتنا المتميزة.",
                    })}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {accessories.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Big feature — face recognition */}
        <section className="bg-neutral-950 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E60012]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#E60012]" />
                <p className="text-white/80 text-[11px] font-bold uppercase tracking-[0.2em]">
                  {t({ en: "Hands-Free Entry", ar: "دخول بدون لمس" })}
                </p>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                {t({ en: "Just push the door.", ar: "فقط ادفع الباب." })}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E60012] to-[#ff4d5a]">
                  {t({ en: "Your face is your key.", ar: "وجهك هو مفتاحك." })}
                </span>
              </h2>
              <p className="mt-8 text-neutral-400 leading-relaxed text-lg max-w-lg">
                {t({
                  en: "AI-powered face recognition unlocks your door before you even reach it. Works in low light, secured by AES-256 GCM encryption.",
                  ar: "التعرّف على الوجه المدعوم بالذكاء الاصطناعي يفتح بابك قبل أن تصل إليه. يعمل في الإضاءة الخافتة ومحمي بتشفير AES-256 GCM.",
                })}
              </p>
              <ul className="mt-10 space-y-5">
                {[
                  {
                    en: "Recognizes up to 37 faces with millisecond accuracy",
                    ar: "يتعرّف على 37 وجهاً بدقة في الملي ثانية",
                  },
                  {
                    en: "Anti-spoofing — photos and videos won't fool it",
                    ar: "حماية من الخداع — لا تخدعه الصور أو الفيديو",
                  },
                  {
                    en: "Falls back to PIN, fingerprint, app or physical key",
                    ar: "خيارات بديلة: PIN ، بصمة ، تطبيق أو مفتاح",
                  },
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E60012]/20 text-[#E60012] mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-neutral-300 font-medium text-base">
                      {t(f)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/product/desi-utopic-rx-face-recognition">
                <Button className="mt-12 h-14 px-8 bg-[#E60012] hover:bg-[#c4000f] text-white font-bold uppercase tracking-wider text-sm rounded-full shadow-lg shadow-red-900/20 transition-transform hover:-translate-y-1">
                  {t({ en: "Shop Utopic RX", ar: "تسوّق يوتوبيك RX" })}{" "}
                  <ArrowRight className="w-5 h-5 ms-2 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10"></div>
              <img
                src="https://endesi.tsoftstatic.com/Data/EditorFiles/rxgifmontajna.gif"
                alt="Face recognition"
                className="w-full rounded-2xl shadow-2xl relative z-0 transform transition-transform duration-700 group-hover:scale-105 border border-white/10"
              />
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
              {t({ en: "Why DESi", ar: "لماذا ديسي" })}
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
              {t({
                en: "Everything your door has been missing",
                ar: "كل ما ينقص بابك",
              })}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureHighlights.map((f, i) => {
              const Icon = iconMap[f.icon];
              return (
                <div
                  key={i}
                  className="group p-8 bg-white border border-neutral-100 rounded-2xl hover:border-[#E60012]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-red-50 group-hover:bg-gradient-to-br group-hover:from-[#E60012] group-hover:to-[#ff4d5a] flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-6 h-6 text-[#E60012] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight">
                    {t(f.title)}
                  </h3>
                  <p className="mt-3 text-neutral-500 leading-relaxed font-medium">
                    {t(f.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live in action */}
        <section className="bg-neutral-50/50 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
                  {t({ en: "Live in Action", ar: "لحظات حقيقية" })}
                </p>
                <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
                  {t({ en: "Smart moments", ar: "لحظات ذكية" })}
                </h2>
                <p className="mt-4 text-neutral-500 text-lg">
                  {t({
                    en: "Real installations and quick guides in short clips.",
                    ar: "تركيبات حقيقية وأدلة سريعة في مقاطع قصيرة.",
                  })}
                </p>
              </div>
              <a
                href="https://www.youtube.com/playlist?list=PLzetQrmBzdo2Ooqat5YV_GjlIhr2QDBuX"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 border-b-2 border-neutral-900 pb-1 hover:text-[#E60012] hover:border-[#E60012] transition-colors uppercase tracking-[0.1em]"
              >
                {t({ en: "YouTube Channel", ar: "قناة يوتيوب" })}{" "}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["rxgifmontajna.gif", "rxgif1.gif", "gif-2-en.gif"].map(
                (g, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg group relative"
                  >
                    <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0 z-10"></div>
                    <img
                      src={`https://shop.desi.com.tr/Data/EditorFiles/${g}`}
                      alt="clip"
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://endesi.tsoftstatic.com/Data/EditorFiles/" +
                          g;
                      }}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
              {t({ en: "UAE Customers", ar: "عملاء في الإمارات" })}
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
              {t({
                en: "Trusted across the Emirates",
                ar: "موثوق في كل الإمارات",
              })}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((tm, i) => (
              <div
                key={i}
                className="p-8 bg-white border border-neutral-100 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: tm.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-neutral-600 leading-relaxed font-medium">
                  “{t(tm.text)}”
                </p>
                <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-400 text-sm">
                    {tm.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-neutral-900">
                      {tm.name}
                    </p>
                    <p className="text-xs text-neutral-500 font-medium">
                      {t(tm.city)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#E60012] text-white">
          <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-black">
                {t({
                  en: "Ready to upgrade your door?",
                  ar: "مستعد لتحديث بابك؟",
                })}
              </h2>
              <p className="mt-2 text-white/90">
                {t({
                  en: "Free delivery across UAE • 2-year warranty • 7-day returns.",
                  ar: "توصيل مجاني داخل الإمارات • ضمان سنتين • إرجاع خلال 7 أيام.",
                })}
              </p>
            </div>
            <Link to="/smart-locks">
              <Button className="h-12 px-8 bg-white text-[#E60012] hover:bg-neutral-100 font-bold uppercase tracking-wider w-full md:w-auto">
                {t({ en: "Shop Now", ar: "تسوّق الآن" })}
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
