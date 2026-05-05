import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
} from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "../components/ui/button";
import SEOHead from "../components/SEOHead";
import { structuredData } from "../lib/seo";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useToast } from "../hooks/use-toast";

const ProductDetail = () => {
  const { slug } = useParams();
  const { t, formatAED } = useLang();
  const { add } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [color, setColor] = useState("Black");
  const [qty, setQty] = useState(1);
  const [whatsappNumber, setWhatsappNumber] = useState("971500000000");
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch(`/api/products/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          if (data.data.whatsappNumber) {
            const cleanNumber = data.data.whatsappNumber.replace(/\D/g, "");
            setWhatsappNumber(cleanNumber);
          }
          if (data.data.faqs) {
            setFaqs(data.data.faqs);
          }
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, [slug]);

  const gallery = useMemo(
    () =>
      product?.gallery && product.gallery.length
        ? product.gallery
        : [product?.image],
    [product],
  );

  if (loading) return <div className="py-24 text-center">Loading...</div>;
  if (!product) return <Navigate to="/smart-locks" replace />;

  const onAdd = () => {
    for (let i = 0; i < qty; i++) add(product);
    toast({
      title: t({ en: "Added to cart", ar: "تمت الإضافة" }),
      description: t(product.name),
    });
  };

  const onBuyNow = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in buying:\n\n${t(product.name)}\nQuantity: ${qty}\nPrice: AED ${product.priceAED}\n\nPlease help me complete this purchase.`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const features = [
    { en: "AI face recognition (anti-spoofing)", ar: "تعرّف الوجه الذكي" },
    {
      en: "iOS / Android app + Siri shortcuts",
      ar: "تطبيق iOS/أندرويد + اختصارات Siri",
    },
    {
      en: "Universal mounting — fits euro-profile",
      ar: "تركيب شامل — يلائم الأسطوانة الأوروبية",
    },
    {
      en: "No drilling, no cylinder change",
      ar: "بدون حفر، بدون تغيير الأسطوانة",
    },
    { en: "37 users with time-based access", ar: "37 مستخدماً بتحكم زمني" },
    {
      en: "Type-C rechargeable, 6-month battery",
      ar: "بطارية تدوم 6 أشهر (Type-C)",
    },
    {
      en: "Auto-lock 15–360s & silent mode",
      ar: "قفل تلقائي 15–360 ثانية ووضع صامت",
    },
    { en: "Activity logs with timestamp", ar: "سجلّ النشاط مع التوقيت" },
  ];

  return (
    <>
      {product && (
        <SEOHead
          title={`${t(product.name)} | DESi Smart Locks UAE`}
          description={
            t(product.description) ||
            `Buy ${t(product.name)} from DESi Smart Locks UAE. AES-256 encryption, face recognition technology.`
          }
          keywords={`${t(product.name)}, smart lock, biometric, security, UAE`}
          image={product.images?.[0] || "/product-default.jpg"}
          type="product"
          structuredDataContent={structuredData.product({
            name: t(product.name),
            description: t(product.description),
            image: product.images?.[0],
            slug: product.slug,
            sku: product.sku,
            price: product.priceAED,
            inStock: product.stock > 0,
            rating: product.rating,
            reviews: product.reviews,
          })}
        />
      )}
      <main className="bg-neutral-50/30 selection:bg-[#E60012] selection:text-white">
        {/* Breadcrumbs */}
        <div className="bg-white/80 backdrop-blur-md border-b border-neutral-200/60 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-xs font-medium text-neutral-500">
            <Link to="/" className="hover:text-[#E60012] transition-colors">
              {t({ en: "Home", ar: "الرئيسية" })}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 opacity-50" />
            <Link
              to="/smart-locks"
              className="hover:text-[#E60012] transition-colors"
            >
              {t({ en: "Smart Locks", ar: "الأقفال" })}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 opacity-50" />
            <span className="text-neutral-900 font-bold truncate">
              {t(product.name)}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square bg-gradient-to-b from-white to-neutral-50 rounded-3xl flex items-center justify-center p-12 border border-neutral-200/60 shadow-sm overflow-hidden group">
                <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-200 via-transparent to-transparent pointer-events-none"></div>
                <img
                  src={gallery[active]}
                  alt={t(product.name)}
                  className="relative z-10 w-full h-full object-contain drop-shadow-md transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {gallery.slice(0, 5).map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`aspect-square rounded-2xl border-2 p-3 transition-all duration-300 bg-white ${i === active ? "border-[#E60012] shadow-md scale-[1.02]" : "border-transparent shadow-sm hover:border-neutral-200 hover:shadow-md"}`}
                    >
                      <img
                        src={g}
                        alt={`view ${i + 1}`}
                        className="w-full h-full object-contain drop-shadow-sm"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {product.isNew && (
                <span className="inline-block self-start bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 shadow-sm">
                  NEW / جديد
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-neutral-900">
                {t(product.name)}
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-xs font-bold text-amber-700 ml-1">
                    5.0
                  </span>
                </div>
                <span className="text-sm font-medium text-neutral-500 underline decoration-neutral-300 underline-offset-4 cursor-pointer hover:text-neutral-900 transition-colors">
                  248 {t({ en: "reviews", ar: "مراجعة" })}
                </span>
              </div>

              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-5xl font-black text-neutral-900 tracking-tighter">
                  {formatAED(product.priceAED)}
                </span>
                <span className="text-xl text-neutral-400 line-through font-medium">
                  {formatAED(Math.round(product.priceAED * 1.18))}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {t({ en: "Save 15%", ar: "وفّر 15%" })}
                </span>
              </div>
              <p className="mt-3 text-xs font-medium text-neutral-500 bg-neutral-100/80 inline-flex px-3 py-1.5 rounded-lg w-fit">
                {t({
                  en: "Inclusive of VAT • Free UAE delivery over AED 500",
                  ar: "شامل ضريبة القيمة المضافة • توصيل مجاني داخل الإمارات للطلبيات 500 د.إ+",
                })}
              </p>

              <ul className="mt-8 space-y-3">
                {t(product.bullets).map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-neutral-600 font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E60012]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#E60012]" />
                    </div>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="w-full h-[1px] bg-neutral-200/60 my-8"></div>

              {/* Color */}
              <div>
                <p className="text-sm font-bold uppercase tracking-wider mb-3 text-neutral-900">
                  {t({ en: "Color", ar: "اللون" })}:{" "}
                  <span className="text-neutral-500 font-medium normal-case ml-1">
                    {color}
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { name: "Black", hex: "#171717" },
                    { name: "Nickel", hex: "#A8A8AC" },
                  ].map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 relative ${color === c.name ? "border-[#E60012] shadow-md scale-110" : "border-transparent shadow-sm hover:scale-105"}`}
                      aria-label={c.name}
                    >
                      <span
                        className="absolute inset-1 rounded-full"
                        style={{ backgroundColor: c.hex }}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-10 flex items-center gap-4 bg-white p-3 rounded-2xl border border-neutral-200/60 shadow-sm">
                <div className="flex items-center bg-neutral-50 rounded-xl h-14 border border-neutral-200/80">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-12 h-full hover:bg-neutral-100 rounded-l-xl transition-colors"
                  >
                    <Minus className="w-4 h-4 mx-auto text-neutral-600" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-12 h-full hover:bg-neutral-100 rounded-r-xl transition-colors"
                  >
                    <Plus className="w-4 h-4 mx-auto text-neutral-600" />
                  </button>
                </div>
                <Button
                  onClick={onAdd}
                  className="flex-1 h-14 bg-[#E60012] hover:bg-[#c4000f] text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5"
                >
                  <ShoppingCart className="w-5 h-5 me-2.5" />{" "}
                  {t({ en: "Add to Cart", ar: "أضف إلى السلة" })}
                </Button>
                <Button
                  onClick={onBuyNow}
                  variant="outline"
                  className="flex-1 h-14 border-[#E60012] text-[#E60012] hover:bg-[#E60012] hover:text-white font-bold uppercase tracking-widest text-sm rounded-xl transition-all hover:-translate-y-0.5"
                >
                  {t({ en: "Buy Now", ar: "اشترِ الآن" })}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-xl border-neutral-200/80 hover:border-[#E60012] hover:text-[#E60012] hover:bg-red-50 transition-colors shadow-sm"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-xs font-medium text-neutral-600">
                <div className="p-4 bg-white border border-neutral-200/60 rounded-2xl flex flex-col items-center text-center gap-2.5 shadow-sm hover:border-[#E60012]/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#E60012]" />
                  </div>
                  {t({ en: "Free Delivery", ar: "توصيل مجاني" })}
                </div>
                <div className="p-4 bg-white border border-neutral-200/60 rounded-2xl flex flex-col items-center text-center gap-2.5 shadow-sm hover:border-[#E60012]/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#E60012]" />
                  </div>
                  {t({ en: "2-Year Warranty", ar: "ضمان سنتين" })}
                </div>
                <div className="p-4 bg-white border border-neutral-200/60 rounded-2xl flex flex-col items-center text-center gap-2.5 shadow-sm hover:border-[#E60012]/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-[#E60012]" />
                  </div>
                  {t({ en: "7-Day Returns", ar: "WPإرجاع خلال 7 أيام" })}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-20 bg-white rounded-3xl border border-neutral-200/60 shadow-sm p-4 md:p-8">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="bg-neutral-100/80 p-1.5 rounded-2xl w-full md:w-auto inline-flex overflow-x-auto overflow-y-hidden">
                <TabsTrigger
                  value="features"
                  className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-[#E60012] data-[state=active]:shadow-sm transition-all"
                >
                  {t({ en: "Features", ar: "المميزات" })}
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-[#E60012] data-[state=active]:shadow-sm transition-all"
                >
                  {t({ en: "Specifications", ar: "المواصفات" })}
                </TabsTrigger>
                <TabsTrigger
                  value="box"
                  className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-[#E60012] data-[state=active]:shadow-sm transition-all"
                >
                  {t({ en: "In the box", ar: "محتويات العلبة" })}
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-[#E60012] data-[state=active]:shadow-sm transition-all"
                >
                  FAQ
                </TabsTrigger>
              </TabsList>

              <div className="mt-8 px-2">
                <TabsContent
                  value="features"
                  className="py-2 focus-visible:outline-none"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-5 bg-neutral-50/80 rounded-2xl border border-neutral-100 hover:border-[#E60012]/20 hover:bg-red-50/30 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-neutral-200/50">
                          <Check className="w-4 h-4 text-[#E60012]" />
                        </div>
                        <span className="font-medium text-neutral-700 leading-relaxed">
                          {t(f)}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent
                  value="specs"
                  className="py-2 focus-visible:outline-none"
                >
                  <div className="overflow-hidden rounded-2xl border border-neutral-200/60">
                    <table className="w-full text-sm">
                      <tbody>
                        {[
                          {
                            key: "compatibility",
                            label: { en: "Compatibility", ar: "التوافق" },
                          },
                          {
                            key: "cylinderType",
                            label: { en: "Cylinder type", ar: "نوع الأسطوانة" },
                          },
                          {
                            key: "battery",
                            label: { en: "Battery", ar: "البطارية" },
                          },
                          {
                            key: "batteryLife",
                            label: { en: "Battery life", ar: "عمر البطارية" },
                          },
                          {
                            key: "connectivity",
                            label: { en: "Connectivity", ar: "الاتصال" },
                          },
                          {
                            key: "encryption",
                            label: { en: "Encryption", ar: "التشفير" },
                          },
                          {
                            key: "voiceControl",
                            label: { en: "Voice control", ar: "التحكم الصوتي" },
                          },
                          {
                            key: "operatingTemperature",
                            label: {
                              en: "Operating temperature",
                              ar: "درجة حرارة التشغيل",
                            },
                          },
                        ]
                          .filter((item) => product.specifications?.[item.key])
                          .map((item, i) => (
                            <tr
                              key={i}
                              className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors"
                            >
                              <td className="py-4 px-6 font-bold text-neutral-900 w-1/3 bg-neutral-50/30">
                                {t(item.label)}
                              </td>
                              <td className="py-4 px-6 text-neutral-600 font-medium">
                                {product.specifications[item.key]}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent
                  value="box"
                  className="py-2 focus-visible:outline-none"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {(product.inTheBox && product.inTheBox.length > 0
                      ? product.inTheBox.map((item) => ({ en: item, ar: item }))
                      : [
                          { en: "Utopic RX Smart Lock", ar: "القفل الذكي" },
                          { en: "Type-C USB Cable", ar: "كابل USB Type-C" },
                          { en: "2 × Allen Wrenches", ar: "WP2 مفتاح ألن" },
                          { en: "Door Surface Adhesive", ar: "لاصق سطح الباب" },
                          {
                            en: "Plastic Adapter for Key",
                            ar: "محوّل بلاستيكي للمفتاح",
                          },
                          {
                            en: "Plastic Adapter for Thumbturn",
                            ar: "محوّل للمقبض",
                          },
                        ]
                    ).map((item, i) => (
                      <div
                        key={i}
                        className="p-6 bg-neutral-50/80 rounded-2xl border border-neutral-100 text-center hover:shadow-md transition-shadow"
                      >
                        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-red-50 to-[#E60012]/10 flex items-center justify-center mb-4 border border-[#E60012]/10">
                          <Check className="w-6 h-6 text-[#E60012]" />
                        </div>
                        <p className="text-[15px] font-bold text-neutral-800 leading-snug">
                          {t(item)}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent
                  value="faq"
                  className="py-2 focus-visible:outline-none"
                >
                  <div className="bg-neutral-50/50 rounded-2xl border border-neutral-200/60 p-2 md:p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((f, i) => (
                        <AccordionItem
                          key={i}
                          value={`q${i}`}
                          className="border-neutral-200/60 px-4 md:px-0"
                        >
                          <AccordionTrigger className="text-start font-bold text-base py-5 hover:text-[#E60012] transition-colors">
                            {t(f.q)}
                          </AccordionTrigger>
                          <AccordionContent className="text-neutral-600 font-medium leading-relaxed pb-6 text-base">
                            {t(f.a)}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
