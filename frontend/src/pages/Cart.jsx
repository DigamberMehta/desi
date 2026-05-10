import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  X,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useLang } from "../contexts/LangContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../hooks/use-toast";
import { apiUrl } from "../lib/api";

const Cart = () => {
  const { t, formatAED } = useLang();
  const { toast } = useToast();
  const {
    items,
    remove,
    updateQty,
    totalAED,
    subtotalAED,
    discountAED,
    coupon,
    applyCoupon,
    removeCoupon,
    clear,
  } = useCart();
  const [whatsappNumber, setWhatsappNumber] = useState("971500000000");
  const [couponCode, setCouponCode] = useState("");
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  useEffect(() => {
    fetch(apiUrl("/api/settings"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.whatsappNumber) {
          // Remove any non-numeric characters for the wa.me link
          const cleanNumber = data.data.whatsappNumber.replace(/\D/g, "");
          setWhatsappNumber(cleanNumber);
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setValidatingCoupon(true);
    try {
      const res = await fetch(apiUrl("/api/coupons/validate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });
      const data = await res.json();

      if (data.success) {
        applyCoupon(data.data);
        toast({
          title: t({ en: "Coupon Applied", ar: "تم تطبيق الكوبون" }),
          description: t({
            en: "Your discount has been successfully applied to your cart.",
            ar: "تم تطبيق الخصم بنجاح على سلتك.",
          }),
        });
        setCouponCode("");
      } else {
        toast({
          title: t({ en: "Invalid Coupon", ar: "كوبون غير صالح" }),
          description: data.message || "Could not apply coupon",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setValidatingCoupon(false);
    }
  };

  const onBuyNow = () => {
    const shipping = (totalAED || 0) > 500 ? 0 : 32;
    const finalTotal = (totalAED || 0) + shipping;

    const orderDetails = items
      .map(
        (item) =>
          `${t(item.name)} - Quantity: ${item.qty} - AED ${(item.priceAED || 0) * item.qty}`,
      )
      .join("\n");

    const discountText = coupon
      ? `\nCoupon Applied (${coupon.code}): -AED ${discountAED.toFixed(2)}`
      : "";

    const shippingText =
      shipping > 0 ? `\nShipping: AED ${shipping}` : `\nShipping: Free`;

    const message = encodeURIComponent(
      `Hi! I'd like to purchase the following items:\n\n${orderDetails}${discountText}${shippingText}\n\nTotal: AED ${finalTotal.toFixed(2)}\n\nPlease help me complete this order.`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-neutral-100 flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-neutral-400" />
        </div>
        <h1 className="mt-6 text-3xl font-black">
          {t({ en: "Your cart is empty", ar: "سلتك فارغة" })}
        </h1>
        <p className="mt-2 text-neutral-600">
          {t({
            en: "Discover our smart locks built for UAE homes.",
            ar: "اكتشف أقفالنا الذكية لمنازل الإمارات.",
          })}
        </p>
        <Link to="/smart-locks">
          <Button className="mt-7 h-12 px-7 bg-[#E60012] hover:bg-[#b8000e] text-white font-bold uppercase tracking-wider">
            {t({ en: "Shop Now", ar: "تسوّق الآن" })}
          </Button>
        </Link>
      </main>
    );
  }

  const shipping = totalAED > 500 ? 0 : 32;
  const finalTotal = totalAED + shipping;

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-12">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-black">
        {t({ en: "Shopping Cart", ar: "سلة التسوّق" })}
      </h1>
      <p className="text-neutral-600 mt-1 text-sm md:text-base">
        {items.length} {t({ en: "item(s)", ar: "عنصر" })}
      </p>
      <div className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-white"
            >
              <div className="w-24 h-24 bg-neutral-50 rounded-lg p-2 flex-shrink-0">
                <img
                  src={item.image}
                  alt={t(item.name)}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.slug}`}
                  className="font-bold hover:text-[#E60012] transition-colors line-clamp-2"
                >
                  {t(item.name)}
                </Link>
                <p className="mt-1 text-sm text-neutral-500">
                  {formatAED(item.priceAED)} {t({ en: "each", ar: "للواحد" })}
                </p>
              </div>
              <div className="flex items-center border border-neutral-300 rounded-md h-10">
                <button
                  onClick={() => updateQty(item.slug, item.qty - 1)}
                  className="w-9 h-full hover:bg-neutral-100"
                >
                  <Minus className="w-3.5 h-3.5 mx-auto" />
                </button>
                <span className="w-9 text-center font-bold text-sm">
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.slug, item.qty + 1)}
                  className="w-9 h-full hover:bg-neutral-100"
                >
                  <Plus className="w-3.5 h-3.5 mx-auto" />
                </button>
              </div>
              <p className="font-black w-24 text-end">
                {formatAED(item.priceAED * item.qty)}
              </p>
              <button
                onClick={() => remove(item.slug)}
                className="w-9 h-9 rounded-full hover:bg-red-50 text-red-600 flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={clear}
            className="text-sm text-neutral-500 hover:text-red-600 underline"
          >
            {t({ en: "Clear cart", ar: "أفرغ السلة" })}
          </button>
        </div>

        <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 h-fit sticky top-28 space-y-6">
          <div>
            <h2 className="text-xl font-black">
              {t({ en: "Order Summary", ar: "ملخّص الطلب" })}
            </h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>{t({ en: "Subtotal", ar: "الإجمالي الفرعي" })}</span>
                <span className="font-semibold">{formatAED(subtotalAED)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>{t({ en: "Shipping", ar: "الشحن" })}</span>
                <span className="font-semibold">
                  {shipping === 0
                    ? t({ en: "Free", ar: "مجاني" })
                    : formatAED(shipping)}
                </span>
              </div>
              {coupon && (
                <div className="flex justify-between text-green-600 font-semibold bg-green-50 p-2 rounded">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Coupon ({coupon.code})
                  </span>
                  <span>-{formatAED(discountAED)}</span>
                </div>
              )}
              <div className="border-t border-neutral-200 pt-3 flex justify-between text-lg font-black">
                <span>{t({ en: "Total", ar: "الإجمالي" })}</span>
                <span>{formatAED(finalTotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500">
                <span>
                  {t({ en: "VAT (5%) included", ar: "شامل الضريبة" })}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-5">
            {!coupon ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <Input
                  placeholder={t({ en: "Promo Code", ar: "رمز الكوبون" })}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="bg-white uppercase font-mono"
                  required
                />
                <Button
                  type="submit"
                  disabled={validatingCoupon}
                  variant="outline"
                  className="font-bold"
                >
                  {t({ en: "Apply", ar: "تطبيق" })}
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-between bg-green-50 text-green-700 p-3 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 font-mono font-bold text-sm">
                  <Tag className="w-4 h-4" />
                  {coupon.code}
                </div>
                <button
                  onClick={removeCoupon}
                  className="hover:bg-green-200 p-1 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <Button
            onClick={onBuyNow}
            className="mt-6 w-full h-12 bg-[#E60012] hover:bg-[#b8000e] text-white font-bold uppercase tracking-wider"
          >
            {t({ en: "Buy Now", ar: "اشترِ الآن" })}{" "}
            <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
          </Button>
          <Link
            to="/smart-locks"
            className="mt-3 block text-center text-sm text-neutral-600 hover:text-[#E60012]"
          >
            {t({ en: "Continue shopping", ar: "واصل التسوّق" })}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
