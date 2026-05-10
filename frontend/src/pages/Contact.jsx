import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { apiUrl } from "../lib/api";

const Contact = () => {
  const { t } = useLang();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [whatsappNumber, setWhatsappNumber] = useState("+971 50 000 0000");

  useEffect(() => {
    fetch(apiUrl("/api/settings"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.whatsappNumber) {
          setWhatsappNumber(data.data.whatsappNumber);
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("desi_messages") || "[]");
    stored.push({ ...form, at: Date.now() });
    localStorage.setItem("desi_messages", JSON.stringify(stored));
    toast({
      title: t({ en: "Message sent!", ar: "تم إرسال رسالتك!" }),
      description: t({
        en: "We'll be in touch within 24 hours.",
        ar: "سنتواصل معك خلال 24 ساعة.",
      }),
    });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <SEOHead
        title="Contact DESi Smart Locks UAE | Get Support & Quote"
        description="Contact DESi Smart Locks UAE for pre-sales support, installation help, and warranty claims. Dubai showroom, WhatsApp support, 24-hour response."
        keywords="contact DESi, smart locks support, Dubai showroom, technical support UAE"
        type="website"
      />
      <main>
        <section className="bg-neutral-950 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-widest">
              {t({ en: "Get in touch", ar: "تواصل معنا" })}
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-black">
              {t({ en: "We're here to help", ar: "نحن هنا لمساعدتك" })}
            </h1>
            <p className="mt-3 text-neutral-300 max-w-2xl">
              {t({
                en: "Pre-sales questions, installation help, or warranty claims — our UAE team responds within hours.",
                ar: "أسئلة ما قبل البيع ، مساعدة التركيب ، أو الضمان — فريقنا في الإمارات يرد خلال ساعات.",
              })}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-3 gap-10">
          <div className="space-y-5">
            {[
              {
                icon: Phone,
                t: { en: "Call us", ar: "اتصل بنا" },
                d: { en: "+971 4 200 0000", ar: "+971 4 200 0000" },
              },
              {
                icon: Mail,
                t: { en: "Email us", ar: "البريد الإلكتروني" },
                d: { en: "info@desi.ae", ar: "info@desi.ae" },
              },
              {
                icon: MessageCircle,
                t: { en: "WhatsApp", ar: "واتساب" },
                d: { en: whatsappNumber, ar: whatsappNumber },
              },
            ].map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 border border-neutral-200 rounded-xl hover:border-[#E60012] transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-[#E60012]/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-[#E60012]" />
                </div>
                <div>
                  <p className="font-bold">{t(c.t)}</p>
                  <p className="text-neutral-600 text-sm mt-0.5">{t(c.d)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 p-8 border border-neutral-200 rounded-xl bg-white">
            <h2 className="text-2xl font-black">
              {t({ en: "Send us a message", ar: "أرسل لنا رسالة" })}
            </h2>
            <p className="text-neutral-600 mt-1">
              {t({
                en: "Fill the form below and we'll respond shortly.",
                ar: "املأ النموذج وسنرد عليك خلال وقت قصير.",
              })}
            </p>
            <form
              onSubmit={onSubmit}
              className="mt-6 grid sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="text-sm font-semibold">
                  {t({ en: "Full name", ar: "الاسم الكامل" })}
                </label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 h-11"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">
                  {t({ en: "Email", ar: "البريد" })}
                </label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1.5 h-11"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold">
                  {t({ en: "Phone (optional)", ar: "الهاتف (اختياري)" })}
                </label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1.5 h-11"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold">
                  {t({ en: "Message", ar: "رسالتك" })}
                </label>
                <Textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="mt-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  className="h-12 px-8 bg-[#E60012] hover:bg-[#b8000e] text-white font-bold uppercase tracking-wider"
                >
                  {t({ en: "Send Message", ar: "أرسل الرسالة" })}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
