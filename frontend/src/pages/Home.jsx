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
  },
  {
    name: "Fatima Khan",
    city: { en: "Abu Dhabi", ar: "أبوظبي" },
    text: {
      en: "My kids forget keys daily. Now they just walk up. Best home upgrade we've made.",
      ar: "كان أطفالي ينسون المفاتيح يومياً. الآن يدخلون بسهولة. أفضل ترقية للمنزل.",
    },
  },
  {
    name: "James O'Brien",
    city: { en: "Sharjah", ar: "الشارقة" },
    text: {
      en: "Airbnb host here — e-key sharing changed my workflow completely. No more lockboxes.",
      ar: "كمضيف Airbnb — مشاركة المفاتيح الإلكترونية غيّرت عملي تماماً.",
    },
  },
  {
    name: "Maryam Saleh",
    city: { en: "Al Ain", ar: "العين" },
    text: {
      en: "No drilling needed. The 3M adhesive option saved my brand new fire door.",
      ar: "لا حاجة للحفر. اللاصق 3M أنقذ باب الحريق الجديد.",
    },
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

        <section className="bg-white text-neutral-900 relative overflow-hidden">
          <div className="relative w-full mx-auto px-4 py-6 md:py-8 lg:py-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4 lg:gap-6">
            {[
              {
                icon: Zap,
                t: { en: "3-Min Install", ar: "تركيب في 3 دقائق" },
                s: { en: "No drilling required", ar: "بدون حفر" },
              },
              {
                icon: null,
                emoji: "🇹🇷",
                t: { en: "Made in Turkey", ar: "صناعة تركية" },
                s: { en: "Premium quality", ar: "جودة عالية" },
                isEmoji: true,
              },
              {
                icon: ShieldCheck,
                t: { en: "AES-256 Secure", ar: "أمان AES-256" },
                s: { en: "Bank-grade encryption", ar: "تشفير بنكي" },
              },
              {
                icon: Battery,
                t: { en: "6-Month Battery", ar: "بطارية 6 أشهر" },
                s: { en: "Type-C rechargeable", ar: "شحن Type-C" },
              },
              {
                icon: ScanFace,
                t: { en: "Face Recognition", ar: "تعرّف الوجه" },
                s: { en: "Advanced biometric", ar: "بيومتري متقدم" },
              },
              {
                icon: LucideIcons.Fingerprint,
                t: { en: "Fingerprint", ar: "بصمة الإصبع" },
                s: { en: "Secure access", ar: "وصول آمن" },
              },
              {
                icon: KeyRound,
                t: { en: "PIN Code", ar: "رمز PIN" },
                s: { en: "Multi-method entry", ar: "طرق دخول متعددة" },
              },
              {
                icon: LucideIcons.ShieldCheck,
                t: { en: "2 Year Warranty", ar: "ضمان سنتين" },
                s: { en: "Full coverage", ar: "تغطية كاملة" },
              },
            ].map((v, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 md:gap-3 group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 border-2 border-[#E60012] transition-transform group-hover:scale-110 group-hover:-rotate-3 duration-300">
                  {v.isEmoji ? (
                    <span className="text-lg md:text-xl">{v.emoji}</span>
                  ) : (
                    <v.icon className="w-4 h-4 md:w-5 md:h-5 text-[#E60012]" />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-bold text-xs sm:text-[13px] tracking-wide leading-tight text-[#E60012]">
                    {t(v.t)}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-600 font-medium mt-0.5">
                    {t(v.s)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value props strip */}

        {/* Big feature — face recognition */}
        <section className="bg-neutral-950 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E60012]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-14 lg:py-32 grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 md:mb-6">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#E60012]" />
                <p className="text-white/80 text-[11px] font-bold uppercase tracking-[0.2em]">
                  {t({ en: "Hands-Free Entry", ar: "دخول بدون لمس" })}
                </p>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                {t({ en: "Just push the door.", ar: "فقط ادفع الباب." })}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E60012] to-[#ff4d5a]">
                  {t({ en: "Your face is your key.", ar: "وجهك هو مفتاحك." })}
                </span>
              </h2>
              <p className="mt-8 text-neutral-400 leading-relaxed text-sm sm:text-base md:text-lg max-w-lg">
                {t({
                  en: "Scan Face and Push the door AI face recognition Reader that unlocks your door before you even touch it — fast, secure, and protected with AES-256 GCM.",
                  ar: "امسح وجهك وادفع الباب — قارئ التعرّف على الوجه بالذكاء الاصطناعي يفتح بابك قبل أن تلمسه، بسرعة وأمان، مع حماية بتشفير AES-256 GCM.",
                })}
              </p>
              <ul className="mt-6 md:mt-10 space-y-3 md:space-y-5">
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
                  <li key={i} className="flex items-start gap-3 md:gap-4">
                    <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#E60012]/20 text-[#E60012] mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </span>
                    <span className="text-neutral-300 font-medium text-sm sm:text-base">
                      {t(f)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/product/desi-utopic-rx-face-recognition">
                <Button className="mt-8 md:mt-12 h-12 md:h-14 px-7 md:px-8 bg-[#E60012] hover:bg-[#c4000f] text-white font-bold uppercase tracking-wider text-sm rounded-full shadow-lg shadow-red-900/20 transition-transform hover:-translate-y-1">
                  {t({ en: "Shop Utopic RX", ar: "تسوّق يوتوبيك RX" })}
                  <ArrowRight className="w-5 h-5 ms-2 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
            <div className="relative group block">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10"></div>
              <img
                src="/VideoProject-ezgif.com-crop.gif"
                alt="Face recognition"
                className="w-[80%] h-[250px] sm:h-[350px] md:h-[500px] rounded-2xl shadow-2xl relative z-0 transform transition-transform duration-700 group-hover:scale-105 border border-white/10"
              />
            </div>
          </div>
        </section>

        {/* Featured products - Smart Locks */}
        <section className="bg-neutral-50/50">
          <div className="max-w-7xl mx-auto px-4 py-14 md:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
              <div className="max-w-2xl">
                <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
                  {t({ en: "Utopic RX Series", ar: "سلسلة Utopic RX" })}
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                  {t({ en: "Smart Locks", ar: "الأقفال الذكية" })}
                </h2>
                <p className="mt-4 text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed">
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
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
            <div className="max-w-7xl mx-auto px-4 pb-14 pt-8 md:pb-24 md:pt-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
                <div className="max-w-2xl">
                  <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
                    {t({ en: "Expand & Enhance", ar: "توسيع وتحسين" })}
                  </p>
                  <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                    {t({ en: "Accessories", ar: "الملحقات" })}
                  </h2>
                  <p className="mt-4 text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed">
                    {t({
                      en: "Take your smart lock experience to the next level with our premium accessories.",
                      ar: "ارتقِ بتجربة القفل الذكي الخاص بك إلى المستوى التالي مع ملحقاتنا المتميزة.",
                    })}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {accessories.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto px-4 py-8 md:py-14 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10 lg:mb-16">
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
              {t({ en: "Why DESi", ar: "لماذا ديسي" })}
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
              {t({
                en: "Everything your door has been missing",
                ar: "كل ما ينقص بابك",
              })}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
            {featureHighlights.map((f, i) => {
              const Icon = iconMap[f.icon];
              return (
                <div
                  key={i}
                  className="group p-4 md:p-6 lg:p-8 bg-white border border-neutral-100 rounded-2xl hover:border-[#E60012]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-red-50 group-hover:bg-gradient-to-br group-hover:from-[#E60012] group-hover:to-[#ff4d5a] flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#E60012] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="mt-4 md:mt-6 text-sm sm:text-base md:text-xl font-bold tracking-tight">
                    {t(f.title)}
                  </h3>
                  <p className="mt-2 md:mt-3 text-neutral-500 leading-relaxed font-medium text-xs sm:text-sm md:text-base">
                    {t(f.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live in action */}
        <section className="bg-neutral-100 py-8 md:py-14 lg:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 items-start">
              {/* Left sidebar */}
              <div className="lg:w-56 flex-shrink-0 flex flex-col gap-3 md:gap-4 lg:gap-6">
                <div>
                  <p className="text-[#E60012] text-xs font-bold uppercase tracking-[0.2em]">
                    {t({ en: "Live in Action", ar: "لحظات حقيقية" })}
                  </p>
                  <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    {t({ en: "Smart Moments", ar: "لحظات ذكية" })}
                  </h2>
                  <p className="mt-4 text-neutral-500 text-xs sm:text-sm leading-relaxed">
                    {t({
                      en: "Real installations and quick guides in short clips.",
                      ar: "تركيبات حقيقية وأدلة سريعة في مقاطع قصيرة.",
                    })}
                  </p>
                </div>
                {/* YouTube channel card */}
                <a
                  href="https://www.youtube.com/playlist?list=PLzetQrmBzdo2Ooqat5YV_GjlIhr2QDBuX"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900 leading-tight">
                      {t({ en: "Official Channel", ar: "القناة الرسمية" })}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {t({
                        en: "Watch more on YouTube",
                        ar: "شاهد المزيد على يوتيوب",
                      })}
                    </p>
                  </div>
                </a>
              </div>

              {/* Featured large video */}
              <a
                href="https://www.youtube.com/shorts/YQHzRB7QaMQ"
                target="_blank"
                rel="noreferrer"
                className="lg:flex-1 rounded-3xl overflow-hidden bg-black shadow-xl group relative block aspect-[3/4] lg:aspect-auto lg:min-h-[500px]"
                style={{ border: "3px solid #00d4ff" }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#00d4ff] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <svg
                      className="w-8 h-8 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="5 3 19 12 5 21" />
                    </svg>
                  </div>
                </div>
                <img
                  src="https://img.youtube.com/vi/YQHzRB7QaMQ/maxresdefault.jpg"
                  alt="Featured video"
                  className="w-full h-full object-cover"
                />
              </a>

              {/* 2x2 grid of smaller videos */}
              <div className="lg:w-72 grid grid-cols-2 gap-3">
                {[
                  { id: "xLdQ4QNAkYY" },
                  { id: "h-IgvXpOTYQ" },
                  { id: "ODF_nTb3kXI" },
                  { id: "TrsAPDOvvDQ" },
                ].map((v, i) => (
                  <a
                    key={i}
                    href={`https://www.youtube.com/shorts/${v.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl overflow-hidden bg-black shadow-md group relative block aspect-[9/16]"
                    style={{ border: "2px solid transparent" }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-4 h-4 text-neutral-900"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="5 3 19 12 5 21" />
                        </svg>
                      </div>
                    </div>
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                      alt="YouTube Short"
                      className="w-full h-full object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#E60012] text-white">
          <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 lg:py-14 grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black">
                {t({
                  en: "Ready to upgrade your door?",
                  ar: "مستعد لتحديث بابك؟",
                })}
              </h2>
              <p className="mt-2 text-white/90 text-sm sm:text-base">
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
