import React from "react";
import { Link } from "react-router-dom";
import {
  Download,
  PlayCircle,
  FileText,
  Wrench,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { useLang } from "../contexts/LangContext";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { structuredData } from "../lib/seo";

const Support = () => {
  const { t } = useLang();
  const [faqs, setFaqs] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.faqs) {
          setFaqs(data.data.faqs);
        }
      })
      .catch((err) => console.error("Error fetching faqs:", err));
  }, []);

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
      a: "#",
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
      icon: MessageCircle,
      t: { en: "Live chat", ar: "دردشة مباشرة" },
      d: { en: "Sat–Thu, 9 AM–8 PM Gulf Time.", ar: "السبت–الخميس 9ص–8م." },
      a: "#",
    },
    {
      icon: Download,
      t: { en: "DESi Smart App", ar: "تطبيق DESi" },
      d: { en: "iOS & Android — free download.", ar: "iOS وأندرويد — مجاني." },
      a: "#",
    },
  ];

  return (
    <>
      <SEOHead
        title="DESi Smart Locks Support & FAQ | Technical Help UAE"
        description="Get support for DESi Smart Locks. Video tutorials, installation help, FAQs, warranty claims. Professional technical support available 7 days a week."
        keywords="support, FAQ, installation help, smart locks support, technical support UAE"
        type="website"
        structuredDataContent={structuredData.faqPage(faqs)}
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

        <section className="bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-widest text-center">
              {t({ en: "FAQ", ar: "الأسئلة الشائعة" })}
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-center">
              {t({ en: "Quick answers", ar: "إجابات سريعة" })}
            </h2>
            <div className="mt-10">
              <Accordion
                type="single"
                collapsible
                className="w-full bg-white rounded-xl border border-neutral-200 px-6"
              >
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`q${i}`}>
                    <AccordionTrigger className="text-start font-bold">
                      {t(f.q)}
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-600 leading-relaxed">
                      {t(f.a)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="mt-10 text-center">
              <p className="text-neutral-600">
                {t({ en: "Still have questions?", ar: "لديك أسئلة أخرى؟" })}
              </p>
              <Link to="/contact">
                <Button className="mt-4 h-12 px-7 bg-[#E60012] hover:bg-[#b8000e] text-white font-bold uppercase tracking-wider">
                  {t({ en: "Contact Support", ar: "تواصل مع الدعم" })}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Support;
