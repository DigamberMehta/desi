import React from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Globe2,
  Users,
  ShieldCheck,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { useLang } from "../contexts/LangContext";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";

const About = () => {
  const { t } = useLang();
  const stats = [
    { v: "40+", l: { en: "Countries", ar: "دولة" } },
    { v: "500K+", l: { en: "Doors secured", ar: "باب مؤمّن" } },
    { v: "15+", l: { en: "Years of R&D", ar: "سنة بحث وتطوير" } },
    { v: "4.8/5", l: { en: "Customer rating", ar: "تقييم العملاء" } },
  ];
  const values = [
    {
      icon: Lightbulb,
      t: { en: "Innovation first", ar: "الابتكار أولاً" },
      d: {
        en: "World-patented designs that put users first.",
        ar: "تصاميم حاصلة على براءة اختراع عالمية.",
      },
    },
    {
      icon: ShieldCheck,
      t: { en: "Security by default", ar: "أمان بالأصل" },
      d: {
        en: "AES-256 GCM encryption on every transaction.",
        ar: "تشفير AES-256 GCM في كل عملية.",
      },
    },
    {
      icon: Wrench,
      t: { en: "DIY simplicity", ar: "بساطة التركيب الذاتي" },
      d: {
        en: "Install in minutes — no specialist needed.",
        ar: "تركيب خلال دقائق دون اختصاصي.",
      },
    },
    {
      icon: Users,
      t: { en: "Customer obsession", ar: "شغف بالعميل" },
      d: {
        en: "Local UAE support 7 days a week.",
        ar: "دعم محلي 7 أيام في الأسبوع.",
      },
    },
  ];

  return (
    <>
      <SEOHead
        title="About DESi Smart Locks | Leaders in Biometric Security UAE"
        description="DESi Smart Locks - 15+ years of innovation. Face recognition technology, AES-256 encryption, 40+ countries served. Official UAE partner for smart security solutions."
        keywords="about DESi, smart locks company, biometric security, face recognition technology, UAE security"
        type="website"
      />
      <main>
        <section className="bg-neutral-950 text-white">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-widest">
              {t({ en: "About DESi", ar: "عن ديسي" })}
            </p>
            <h1 className="mt-2 text-4xl md:text-6xl font-black leading-tight max-w-4xl">
              {t({
                en: "Smart access, engineered for everyone.",
                ar: "دخول ذكي ، مصمّم للجميع.",
              })}
            </h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-3xl leading-relaxed">
              {t({
                en: "DESi has been redefining smart locks since 2008. From our R&D labs in Turkey to homes across 40+ countries, we engineer access solutions that install in minutes — no drilling, no compromises. Now officially serving the UAE.",
                ar: "ديسي تعيد تعريف الأقفال الذكية منذ 2008. من مختبراتنا في تركيا إلى منازل في أكثر من 40 دولة، نصمّم حلولاً تُركَّب خلال دقائق. والآن رسمياً في الإمارات.",
              })}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center p-8 border border-neutral-200 rounded-xl"
            >
              <p className="text-4xl md:text-5xl font-black text-[#E60012]">
                {s.v}
              </p>
              <p className="mt-2 text-neutral-600 font-semibold uppercase text-xs tracking-wider">
                {t(s.l)}
              </p>
            </div>
          ))}
        </section>

        <section className="bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="max-w-2xl mb-12">
              <p className="text-[#E60012] text-xs font-bold uppercase tracking-widest">
                {t({ en: "Our Values", ar: "قيمنا" })}
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-black">
                {t({ en: "What we stand for", ar: "ما ندافع عنه" })}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="p-7 bg-white rounded-xl border border-neutral-200"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#E60012]/10 flex items-center justify-center">
                    <v.icon className="w-6 h-6 text-[#E60012]" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{t(v.t)}</h3>
                  <p className="mt-2 text-neutral-600">{t(v.d)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="https://endesi.tsoftstatic.com/Data/EditorFiles/rxbanner2.png"
            alt="R&D"
            className="rounded-xl shadow-lg w-full"
          />
          <div>
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-widest">
              {t({ en: "Our Mission", ar: "رسالتنا" })}
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-black">
              {t({
                en: "Make every door a smart door.",
                ar: "لنجعل كل باب باباً ذكياً.",
              })}
            </h2>
            <p className="mt-5 text-neutral-600 leading-relaxed text-lg">
              {t({
                en: "We believe smart access shouldn't require renovations or specialists. Our patented universal-mount design lets anyone upgrade their door in minutes — keeping the original key as a backup, always.",
                ar: "نعتقد أن الدخول الذكي لا يجب أن يتطلّب ترميمات أو فنيين. صمّمنا تركيباً عالمياً حاصلاً على براءة اختراع يتيح لأي شخص تحديث بابه خلال دقائق.",
              })}
            </p>
            <Link to="/smart-locks">
              <Button className="mt-7 h-12 px-7 bg-[#E60012] hover:bg-[#b8000e] text-white font-bold uppercase tracking-wider">
                {t({ en: "Browse Products", ar: "تصفّح المنتجات" })}
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
