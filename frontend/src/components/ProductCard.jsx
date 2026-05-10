import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "./ui/button";

const ProductCard = ({ product }) => {
  const { t, formatAED } = useLang();
  const { add } = useCart();

  return (
    <div className="group relative bg-white border border-neutral-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#E60012]/30 hover:shadow-2xl hover:-translate-y-1">
      {product.badge && (
        <span className="absolute top-2 start-2 md:top-4 md:start-4 z-10 bg-emerald-500/90 backdrop-blur text-white text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-sm">
          {product.badge}
        </span>
      )}
      <Link
        to={`/product/${product.slug}`}
        className="block p-3 md:p-4 lg:p-6 bg-gradient-to-b from-neutral-50 to-white"
      >
        <div className="aspect-square overflow-hidden flex items-center justify-center">
          <img
            src={product.image}
            alt={t(product.name)}
            loading="lazy"
            className="w-full h-full object-contain transform group-hover:scale-[1.08] transition-transform duration-700 ease-out drop-shadow-sm"
          />
        </div>
      </Link>
      <div className="p-3 md:p-4 lg:p-6">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-xs sm:text-[1.05rem] font-bold text-neutral-900 leading-snug min-h-[2rem] md:min-h-[3rem] group-hover:text-[#E60012] transition-colors">
            {t(product.name)}
          </h3>
        </Link>
        <ul className="mt-2 md:mt-4 space-y-1.5 md:space-y-2">
          {t(product.bullets)
            .slice(0, 3)
            .map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[10px] sm:text-xs text-neutral-600 font-medium"
              >
                <Check className="w-4 h-4 text-[#E60012] mt-0.5 flex-shrink-0" />{" "}
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
        </ul>
        <div className="mt-4 md:mt-6 flex items-end justify-between gap-2 pt-2 md:pt-4 border-t border-neutral-100">
          <div>
            <p className="text-[8px] md:text-[10px] uppercase text-neutral-400 font-bold tracking-widest mb-0.5">
              {t({ en: "From", ar: "يبدأ من" })}
            </p>
            <p className="text-lg md:text-2xl font-black text-neutral-900 tracking-tight">
              {formatAED(product.priceAED)}
            </p>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              add(product);
            }}
            size="sm"
            className="h-8 md:h-10 px-3 md:px-5 rounded-full bg-neutral-950 hover:bg-[#E60012] text-white font-bold tracking-wide text-xs md:text-sm transition-all shadow-md hover:shadow-xl hover:shadow-red-600/20"
          >
            {t({ en: "Add", ar: "أضف" })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
