import React from "react";
import { Link } from "react-router-dom";
import {
  Download,
  PlayCircle,
  FileText,
  Wrench,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useLang } from "../contexts/LangContext";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";

const Support = () => {
  const { t } = useLang();

  const cards = [
    {
      icon: PlayCircle,
      t: { en: "Video tutorials", ar: "دروس فيديو" },
      d: {
        en: "Step-by-step install clips on YouTube.",
        ar: "فيديوهات تركيب خطوة بخطوة.",
      },
      a: "https://www.youtube.com/playlist?list=PLzetQrmBzdo2Ooqat5YV_GjlIhr2QDBuX",
    },
    {
      icon: FileText,
      t: { en: "User manuals", ar: "دليل المستخدم" },
      d: {
        en: "Download PDFs for every Utopic model.",
        ar: "حمّل PDF لكل موديل.",
      },
      a: "/user-manuals",
    },
    {
      icon: Wrench,
      t: { en: "Installation help", ar: "مساعدة التركيب" },
      d: {
        en: "Book a free 15-min video call.",
        ar: "احجز مكالمة فيديو مجانية 15 دقيقة.",
      },
      a: "/contact",
    },
    {
      icon: ShieldCheck,
      t: { en: "Warranty claim", ar: "مطالبة الضمان" },
      d: {
        en: "2-year UAE warranty on all locks.",
        ar: "ضمان سنتين داخل الإمارات.",
      },
      a: "/contact",
    },
    {
      icon: CheckCircle,
      t: { en: "Compatibility Check", ar: "فحص التوافق" },
      d: {
        en: "Check if DESi works with your door.",
        ar: "تحقق مما إذا كان DESi يعمل مع بابك.",
      },
      a: "/contact",
    },
    {
      icon: Download,
      t: { en: "DESi Smart App", ar: "تطبيق DESi" },
      d: { en: "iOS & Android — free download.", ar: "iOS وأندرويد — مجاني." },
      a: "/app-download",
    },
  ];

  return (
    <>
      <SEOHead
        title="DESi Smart Locks Support & Technical Help | UAE"
        description="Get support for DESi Smart Locks. Video tutorials, installation help, warranty claims. Professional technical support available."
        keywords="support, installation help, smart locks support, technical support UAE"
        type="website"
      />
      <main>
        <section className="bg-neutral-950 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-widest">
              {t({ en: "Support Center", ar: "مركز الدعم" })}
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-black">
              {t({ en: "Need a hand?", ar: "تحتاج مساعدة؟" })}
            </h1>
            <p className="mt-3 text-neutral-300 max-w-2xl">
              {t({
                en: "From compatibility checks to firmware updates — everything is here.",
                ar: "من فحص التوافق إلى تحديثات البرنامج — كل شيء هنا.",
              })}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((c, i) => (
              <a
                key={i}
                href={c.a}
                target={c.a.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group p-7 border border-neutral-200 rounded-xl hover:border-[#E60012] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[#E60012]/10 group-hover:bg-[#E60012] flex items-center justify-center transition-colors">
                  <c.icon className="w-6 h-6 text-[#E60012] group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{t(c.t)}</h3>
                <p className="mt-2 text-neutral-600">{t(c.d)}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Support;
